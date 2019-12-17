import { proxify, trackAll } from "./proxify";

class Emitter {
  stateDependencies = new Map();
  recordingQueue = [];
  actionTriggered = false;
  actionQueue = [];
  actionIndex = undefined;
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
    if (!this.actionTriggered) {
      this.actionTriggered = true;
      this.actionQueue.push({
        target,
        prop,
        undo: Array.isArray(target) ? [...target] : { ...target }
      });
      setTimeout(() => {
        this.actionTriggered = false;
      });
    }
  };

  undo = () => {
    if (!this.actionQueue.length) {
      return;
    }
    const index =
      this.actionIndex || this.actionIndex === 0
        ? this.actionIndex
        : this.actionQueue.length - 1;
    const { target, prop, undo } = this.actionQueue[index];
    this.actionQueue[index].redo = Array.isArray(target)
      ? [...target]
      : { ...target };
    // Proxy is not triggered here
    if (
      undo[prop] ||
      typeof undo[prop] === "number" ||
      typeof undo[prop] === "boolean"
    ) {
      target[prop] =
        typeof undo[prop] === "object" ? proxify(undo[prop]) : undo[prop];
    } else {
      const arrayShortened =
        Array.isArray(target) && target.length !== undo.length;
      if (arrayShortened) {
        target.length = undo.length;
      }
      delete target[prop];
    }
    this.actionIndex = index - 1;
    this.renderComponents(target, prop, false);
  };
  redo = () => {
    if (
      this.actionIndex === undefined ||
      this.actionIndex >= this.actionQueue.length - 1
    ) {
      return;
    }
    const index = this.actionIndex + 1;
    const { target, prop, redo } = this.actionQueue[index];
    if (
      redo[prop] ||
      typeof redo[prop] === "number" ||
      typeof redo[prop] === "boolean"
    ) {
      target[prop] =
        typeof redo[prop] === "object" ? proxify(redo[prop]) : redo[prop];
    } else {
      const arrayShortened =
        Array.isArray(target) && target.length !== redo.length;
      if (arrayShortened) {
        target.length = redo.length;
      }
      delete target[prop];
    }
    this.actionIndex = index - 1;
    this.renderComponents(target, prop, false);

    this.actionIndex = index;
  };
  resetActionQueue = () => {
    if (
      this.actionQueue.length &&
      (this.actionIndex || this.actionIndex === 0)
    ) {
      this.actionQueue.length = this.actionIndex + 1;
    }
    this.actionIndex = undefined;
  };
}

export default new Emitter();
