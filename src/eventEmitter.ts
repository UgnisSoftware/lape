import { proxify, trackAll } from "./proxify";

class Emitter {
  stateDependencies = new Map();
  recordingQueue = [];
  actionQueueLimit = 30;
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
      this.resetActionQueue();
      this.recordAction(target, prop);
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
    this.recordAction(target, prop);
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
    this.trimActionQueue();
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
  trimActionQueue = () => {
    if (this.actionQueue.length === this.actionQueueLimit) {
      this.actionQueue.shift();
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
        if (Array.isArray(target) && undo.length !== target.length) {
          target.length = undo.length;
        }
        delete target[prop];
      }
      this.renderComponents(target, prop, false);
    });
    this.actionIndex -= 1;
  };
  redo = () => {
    if (this.actionIndex === null || !this.actionQueue[this.actionIndex + 1]) {
      return;
    }
    console.log('redo', this.actionQueue, this.actionIndex);
    console.log('this.actionQueue[this.actionIndex + 1]', this.actionQueue[this.actionIndex + 1], this.actionIndex + 1);
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
        if (Array.isArray(target) && redo.length !== target.length) {
          target.length = redo.length;
        }
        delete target[prop];
      }
      this.renderComponents(target, prop, false);
    });
  };
  resetActionQueue = () => {
    if (this.actionIndex !== null) {
      this.actionQueue.splice(this.actionIndex + 1);
    }
    this.actionIndex = null;
  };
}

export default new Emitter();
