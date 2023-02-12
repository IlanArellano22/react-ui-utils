export declare const Sleep: (ms?: number | undefined) => Promise<unknown>;
export declare const omit: <T extends {}>(obj: T, ...omits: (keyof T)[]) => Omit<T, keyof T>;
