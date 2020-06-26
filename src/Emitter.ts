export type GetCallback = (target: object, prop: string | Symbol) => void;
export type SetCallback = (target: object, prop: string | Symbol, value: any) => void;

class Emitter {
  listenersGet: GetCallback[] = [];
  listenersSet: SetCallback[] = [];

  listenGetEvents = (callback: GetCallback) => {
    this.listenersGet.push(callback);
  };
  removeGetListener = (callback: GetCallback) => {
    this.listenersGet = this.listenersGet.filter((fn) => fn !== callback);
  };
  triggerGetListeners: GetCallback = (target, prop) => {
    this.listenersGet.forEach((callback) => callback(target, prop));
  };

  listenSetEvents = (callback: SetCallback) => {
    this.listenersSet.push(callback);
  };
  removeSetListener = (callback: SetCallback) => {
    this.listenersSet = this.listenersSet.filter((fn) => fn !== callback);
  };
  triggerSetListeners: SetCallback = (target, prop, value) => {
    this.listenersSet.forEach((callback) => callback(target, prop, value));
  };

  reset = () => {
    this.listenersGet = [];
    this.listenersSet = [];
  };
}

export default new Emitter();
