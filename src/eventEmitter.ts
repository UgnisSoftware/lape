export type Callback = (target: object, prop: string) => void;

class Emitter {
  // this emitter calls the last listener and not all of them
  listenersGet: Callback[] = [];
  listenersSet: Callback[] = [];
  addGet = (callback: Callback) => {
    this.listenersGet.push(callback);
  };
  removeGet = (callback: Callback) => {
    this.listenersGet = this.listenersGet.filter(fn => fn !== callback);
  };
  triggerGet: Callback = (target, prop) => {
    const currentActiveListener = this.listenersGet[this.listenersGet.length - 1];
    if(currentActiveListener){
      currentActiveListener(target, prop);
    }
  };
  addSet = (callback: Callback) => {
    this.listenersSet.push(callback);
  };
  removeSet = (callback: Callback) => {
    this.listenersSet = this.listenersSet.filter(fn => fn !== callback);
  };
  triggerSet: Callback = (target, prop) => {
    this.listenersSet.forEach(callback => callback(target, prop));
  };
}

export default new Emitter();
