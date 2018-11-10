export interface Data {
  target: object;
  prop: string;
}
export declare type BatchCallback = (data: Data[]) => void;
export declare type Callback = (target: object, prop?: string) => void;
declare class Emitter {
  listenersGet: Callback[];
  listenersSet: BatchCallback[];
  addGet: (callback: Callback) => void;
  removeGet: (callback: Callback) => void;
  triggerGet: Callback;
  addSet: (callback: BatchCallback) => void;
  removeSet: (callback: BatchCallback) => void;
  timeout: any;
  dataChanged: any[];
  triggerSet: Callback;
}
declare const _default: Emitter;
export default _default;
