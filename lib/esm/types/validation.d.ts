export declare type ValField = string | null | undefined;
export declare type ValForm<T> = {
    [K in keyof T]?: ValField;
};
export declare type ValFormAsync<T> = {
    [K in keyof T]?: PromiseLike<ValField>;
};
