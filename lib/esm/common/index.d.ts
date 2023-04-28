export declare const Sleep: (ms?: number) => Promise<unknown>;
/**Devuelve un objeto eliminando todas las keys seleccionadas */
export declare const omit: <T extends {
    [k: string]: any;
}, K extends keyof T>(obj: T, ...omits: K[]) => Omit<T, K>;
type MapObjectOut<T, TOut> = {
    [K in keyof T]: TOut;
};
export declare function mapObject<T, TOut>(obj: T, map: <K extends keyof T>(value: T[K], key: K) => TOut): MapObjectOut<T, TOut>;
export declare function isPromiseLike(x: any): x is PromiseLike<any>;
export declare const isClientSide: () => boolean;
export declare const isDebug: () => boolean;
export {};
