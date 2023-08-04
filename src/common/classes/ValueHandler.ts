import { Client } from "../namespaces/client";

export abstract class BaseHandler<T> {
  abstract value: T;

  getDeepCopy() {
    return Client.isClientSide()
      ? window.structuredClone(this.value)
      : (JSON.parse(JSON.stringify(this.value)) as T);
  }
}

export class ValueHandler<T> extends BaseHandler<T> {
  value: T;

  constructor(initial: T) {
    super();
    this.value = initial;
  }

  get() {
    return this.value;
  }

  set(value: T) {
    this.value = value;
  }
}
