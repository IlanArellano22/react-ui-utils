export const Sleep = (ms?: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**Devuelve un objeto eliminando todas las keys seleccionadas */
export const omit = <T extends { [k: string]: any }, K extends keyof T>(
  obj: T,
  ...omits: K[]
): Omit<T, K> =>
  omits.reduce((prev, curr) => {
    const { [curr]: omitted, ...rest } = prev as T;
    return rest;
  }, obj as Omit<T, K>);

type MapObjectOut<T, TOut> = { [K in keyof T]: TOut };

export function mapObject<T, TOut>(
  obj: T,
  map: <K extends keyof T>(value: T[K], key: K) => TOut
): MapObjectOut<T, TOut> {
  const ret = {} as MapObjectOut<T, TOut>;
  for (const key in obj) {
    const value = obj[key];
    ret[key] = map(value, key);
  }
  return ret;
}

export function isPromiseLike(x: any): x is PromiseLike<any> {
  return x && typeof (x as PromiseLike<any>).then === "function";
}
