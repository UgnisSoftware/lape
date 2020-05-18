declare class Emitter {
    stateDependencies: Map<any, any>;
    recordingQueue: any[];
    actionQueueLimit: number;
    actionQueue: any[];
    timeout: any;
    actionIndex: any;
    mapStateToComponents: (target: object, prop: string | symbol) => void;
    renderComponents: (target: object, prop: string | symbol, shouldTrackActions?: boolean) => void;
    removeCache: (callback: () => void) => void;
    deleteProperty: (target: any, prop: any) => void;
    recordAction: (target: any, prop: any) => void;
    trimActionQueue: () => void;
    undo: () => void;
    redo: () => void;
    resetActionQueue: () => void;
}
declare const _default: Emitter;
export default _default;
