import { Emitter, resetUndoStack } from "../index";
import ConnectManager from "../connect/ConnectManager";

let tracked = new Map();

const cb = (target: object) => {
  if (!tracked.has(target)) {
    if (Array.isArray(target)) {
      tracked.set(target, [...target]);
    } else {
      tracked.set(target, { ...target });
    }
  }
};

export const lapeTrackAllChanges = () => {
  Emitter.listenPreSetEvents(cb);
};

export const lapeResetAllChanges = () => {
  Emitter.reset();
  ConnectManager.reset();
  resetUndoStack();
  tracked.forEach((target, modified) => {
    if (Array.isArray(key)) {
      modified.length = target.length;
      modified.splice(0, modified.length, ...target);
    } else {
      Object.assign(modified, target);
      for (var key in modified) {
        if (!(key in target)) {
          delete modified[key];
        }
      }
    }
  });

  tracked = new Map();
};
