export declare abstract class BaseHandler<T> {
    abstract value: T;
    getDeepCopy(): T;
}
export declare class ValueHandler<T> extends BaseHandler<T> {
    value: T;
    constructor(initial: T);
    get(): T;
    set(value: T): void;
}
