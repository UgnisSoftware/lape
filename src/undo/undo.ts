import Emitter from "../Emitter";

type StackIds = "default" | string;

interface RecordingStack {
  target: object;
  prop: string;
  current: any;
  currentLength?: number;
  // created in undo
  next?: any;
  nextLength?: number;
}

interface CurrentStack {
  index: number;
  stack: RecordingStack[][];
}

export const currentStack: { [stackId: string]: CurrentStack } = {};
const recordingStack: { [stackId: string]: RecordingStack[] } = {};

export const recordUndo = (callback: () => void, stackId: StackIds = "default") => {
  if (recordingStack[stackId]) {
    callback();
    return;
  }
  if (!currentStack[stackId]) {
    resetUndoStack(stackId);
  }

  recordingStack[stackId] = [];

  const cb = (target, prop) => {
    recordingStack[stackId].push({
      target,
      prop,
      current: target[prop],
      currentLength: Array.isArray(target) ? target.length : undefined,
    });
  };

  Emitter.listenSetEvents(cb);
  callback();
  Emitter.removeSetListener(cb);

  if (recordingStack[stackId].length) {
    currentStack[stackId].stack = currentStack[stackId].stack
      .slice(0, currentStack[stackId].index)
      .concat([recordingStack[stackId]]);
    currentStack[stackId].index++;
  }
  delete recordingStack[stackId];
};

export const undo = (stackId: StackIds = "default") => {
  if (!canUndo(stackId)) {
    return;
  }
  const stack = currentStack[stackId].stack[currentStack[stackId].index - 1];
  stack
    .concat()
    .reverse()
    .forEach((item) => {
      const { target, prop, current, currentLength } = item;
      item.next = target[prop];
      if (Array.isArray(target)) {
        item.nextLength = target.length;
      }
      target[prop] = current;
      if (Array.isArray(target)) {
        target.length = currentLength;
      }
      Emitter.triggerSetListeners(target, prop, current);
    });
  currentStack[stackId].index--;
};

export const redo = (stackId: StackIds = "default") => {
  if (!canRedo(stackId)) {
    return;
  }
  const stack = currentStack[stackId].stack[currentStack[stackId].index];
  stack.forEach(({ target, prop, next, nextLength }) => {
    target[prop] = next;
    if (Array.isArray(target)) {
      target.length = nextLength;
    }
    Emitter.triggerSetListeners(target, prop, next);
  });
  currentStack[stackId].index++;
};

export const canUndo = (stackId: StackIds = "default") => {
  return currentStack[stackId]?.index > 0;
};

export const canRedo = (stackId: StackIds = "default") => {
  return currentStack[stackId]?.stack.length > currentStack[stackId]?.index;
};

export const resetUndoStack = (stackId: StackIds = "default") => {
  currentStack[stackId] = { index: 0, stack: [] };
};
