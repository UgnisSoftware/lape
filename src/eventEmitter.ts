import { proxify, trackAll } from "./proxify";

class Emitter {
  stateDependencies = new Map();
  recordingQueue = [];
  actionQueue = [];
  timeout = null;
  actionIndex = null;
  mapStateToComponents = (target: object, prop: string | symbol) => {
    if (!this.recordingQueue.length) {
      return;
    }
    const recordingComponent = this.recordingQueue[
      this.recordingQueue.length - 1
    ];

    if (!this.stateDependencies.has(target)) {
      this.stateDependencies.set(
        target,
        new Map().set(prop, new Set().add(recordingComponent))
      );
    } else if (!this.stateDependencies.get(target).has(prop)) {
      this.stateDependencies
        .get(target)
        .set(prop, new Set().add(recordingComponent));
    } else {
      this.stateDependencies
        .get(target)
        .get(prop)
        .add(recordingComponent);
    }
  };
  renderComponents = (
    target: object,
    prop: string | symbol,
    shouldTrackActions: boolean = true
  ) => {
    if (this.stateDependencies.get(target).has(trackAll)) {
      this.stateDependencies
        .get(target)
        .get(trackAll)
        ?.forEach((callback: () => void) => {
          callback();
        });
    }
    this.stateDependencies
      .get(target)
      .get(prop)
      ?.forEach((callback: any) => {
        callback();
      });
    if (shouldTrackActions) {
      this.recordAction(target, prop);
      this.resetActionQueue();
    }
  };
  removeCache = (callback: () => void) => {
    this.stateDependencies.forEach((map: Map<string, Set<() => void>>) =>
      map.forEach(set => {
        set.delete(callback);
      })
    );
  };
  deleteProperty = (target, prop) => {
    if (this.stateDependencies.get(target).has(prop)) {
      const callbacks = this.stateDependencies.get(target).get(prop);
      this.stateDependencies.get(target).delete(prop);
      callbacks.forEach((callback: () => void) => callback());
    }
    this.stateDependencies
      .get(target)
      .get(trackAll)
      ?.forEach((callback: () => void) => {
        callback();
      });
  };
  recordAction = (target, prop) => {
    const action = {
      target,
      undo: Array.isArray(target) ? [...target] : { ...target },
      prop
    };
    if (!this.timeout) {
      this.timeout = setTimeout(() => (this.timeout = null));
      this.actionQueue.push([action]);
    } else {
      const i = this.actionQueue.length - 1;
      this.actionQueue[i].push(action);
    }
  };

  undo = () => {
    if (this.actionIndex === null) {
      this.actionIndex = this.actionQueue.length - 1;
    }
    if (!this.actionQueue[this.actionIndex]) {
      return;
    }
    this.actionQueue[this.actionIndex].forEach(action => {
      const { target, undo, prop } = action;
      action.redo = Array.isArray(target) ? [...target] : { ...target };
      if (
        undo[prop] ||
        typeof undo[prop] === "number" ||
        typeof undo[prop] === "boolean"
      ) {
        target[prop] =
          typeof undo[prop] === "object" ? proxify(undo[prop]) : undo[prop];
      } else {
        delete target[prop];
      }
      this.renderComponents(target, prop, false);
    });
    this.actionIndex -= 1;
  };
  redo = () => {
    if (!this.actionQueue[this.actionIndex + 1]) {
      return;
    }
    this.actionIndex += 1;
    this.actionQueue[this.actionIndex].forEach(action => {
      const { target, redo, prop } = action;
      if (
        redo[prop] ||
        typeof redo[prop] === "number" ||
        typeof redo[prop] === "boolean"
      ) {
        target[prop] =
          typeof redo[prop] === "object" ? proxify(redo[prop]) : redo[prop];
      } else {
        delete target[prop];
      }
      this.renderComponents(target, prop, false);
    });
  };
  resetActionQueue = () => {
    // this.actionQueue.splice(this.actionIndex+1);
    this.actionIndex = null;
  };
}

export default new Emitter();
