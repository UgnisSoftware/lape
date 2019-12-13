import { trackAll } from "./proxify";

class Emitter {
  stateDependencies = new Map();
  recordingQueue = [];
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
  renderComponents = (target: object, prop: string | symbol) => {
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
}

export default new Emitter();
