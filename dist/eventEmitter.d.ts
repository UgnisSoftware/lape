export declare type Callback = (target: object, prop?: string) => void;
declare class Emitter {
    listenersGet: Callback[];
    listenersSet: Callback[];
    addGet: (callback: Callback) => void;
    removeGet: (callback: Callback) => void;
    triggerGet: Callback;
    addSet: (callback: Callback) => void;
    removeSet: (callback: Callback) => void;
    triggerSet: Callback;
}
declare const _default: Emitter;
export default _default;
