export type ValField = string | null | undefined;

export type ValForm<T> = {
  [K in keyof T]?: ValField;
};

export type ValFormAsync<T> = {
  [K in keyof T]?: PromiseLike<ValField>;
};
