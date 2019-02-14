export interface Data {
  props: string[];
  receiver: object;
  previous: object;
  next: object;
}

export type BatchCallback = (data: Map<object, Data>) => void;
export type Callback = (target: object, prop?: string) => void;
export type SetCallback = (
  target: object,
  prop: string,
  receiver: any,
  previous: object,
  next: object
) => void;

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
  dataChanged: Map<object, Data> = new Map();
  triggerSet: SetCallback = (target, prop, receiver, previous, next) => {
    if (!this.dataChanged.has(target)) {
      this.dataChanged.set(target, { props: [prop], receiver, previous, next });
    } else {
      const cachedTarget = this.dataChanged.get(target);
      cachedTarget.props.push(prop);
      cachedTarget.next = next;
    }

    if (this.timeout) {
      return;
    }
    // wait until all of the user code runs
    this.timeout = setTimeout(() => {
      this.listenersSet.forEach(callback => callback(this.dataChanged));

      // reset
      this.timeout = null;
      this.dataChanged = new Map();
    }, 0);
  };
}

export default new Emitter();
