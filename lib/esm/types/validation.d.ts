export type ValField = string | null | undefined;
export type ValForm<T> = {
    [K in keyof T]?: ValField;
};
export type ValFormAsync<T> = {
    [K in keyof T]?: PromiseLike<ValField>;
};
export type ParametersWithoutFistParam<T extends (...args: any[]) => any> = T extends (firstArg: any, ...rest: infer R) => any ? R : never;
export interface ItemManager<IResult, ItemEvents = string> {
    addEventListenner: (events: ItemEvents, callback: (value: IResult) => void) => void;
    removeEventListenner: (events: ItemEvents) => void;
}
