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
