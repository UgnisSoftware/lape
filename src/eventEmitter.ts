export interface Data {
  target: object;
  prop: string;
}

export type BatchCallback = (data: Data[]) => void;
export type Callback = (target: object, prop?: string) => void;

class Emitter {
  // public - so it could check if anyone is listening to get
  // this emitter calls the last listener and not all of them
  public listenersGet: Callback[] = [];
  // this call every listener
  public listenersSet: BatchCallback[] = [];

  addGet = (callback: Callback) => {
    this.listenersGet.push(callback);
  };
  removeGet = (callback: Callback) => {
    this.listenersGet = this.listenersGet.filter(fn => fn !== callback);
  };
  triggerGet: Callback = (target, prop) => {
    if (this.listenersGet.length) {
      const currentActiveListener = this.listenersGet[
        this.listenersGet.length - 1
      ];
      currentActiveListener(target, prop);
    }
  };
  addSet = (callback: BatchCallback) => {
    this.listenersSet.push(callback);
  };
  removeSet = (callback: BatchCallback) => {
    this.listenersSet = this.listenersSet.filter(fn => fn !== callback);
  };

  timeout = null;
  dataChanged = [];
  triggerSet: Callback = (target, prop) => {
    this.dataChanged.push({ target, prop });

    if (this.timeout) {
      return;
    }
    // wait until all of the user code runs
    this.timeout = setTimeout(() => {
      this.listenersSet.forEach(callback => callback(this.dataChanged));

      // reset
      this.timeout = null;
      this.dataChanged = [];
    }, 0);
  };
}

export default new Emitter();
