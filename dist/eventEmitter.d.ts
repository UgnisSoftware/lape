export interface Data {
  props: string[];
  receiver: object;
  previous: object;
  next: object;
}
export declare type BatchCallback = (data: Map<object, Data>) => void;
export declare type Callback = (target: object, prop?: string) => void;
export declare type SetCallback = (target: object, prop: string, receiver: any, previous: object, next: object) => void;
declare class Emitter {
  listenersGet: Callback[];
  listenersSet: BatchCallback[];
  addGet: (callback: Callback) => void;
  removeGet: (callback: Callback) => void;
  triggerGet: Callback;
  addSet: (callback: BatchCallback) => void;
  removeSet: (callback: BatchCallback) => void;
  timeout: any;
  dataChanged: Map<object, Data>;
  triggerSet: SetCallback;
}
declare const _default: Emitter;
export default _default;
