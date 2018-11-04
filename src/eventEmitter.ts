export type Callback = (target: object, prop?: string) => void;

class Emitter {
  // public - so it could check if anyone is listening to get
  // this emitter calls the last listener and not all of them
  public listenersGet: Callback[] = [];
  // this call every listener
  public listenersSet: Callback[] = [];

  addGet = (callback: Callback) => {
    this.listenersGet.push(callback);
  };
  removeGet = (callback: Callback) => {
    this.listenersGet = this.listenersGet.filter(fn => fn !== callback);
    console.log(this.listenersGet)
  };
  triggerGet: Callback = (target, prop) => {
    if (this.listenersGet.length) {
      const currentActiveListener = this.listenersGet[
        this.listenersGet.length - 1
      ];
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
