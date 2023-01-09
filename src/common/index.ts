export const Sleep = (ms?: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const omit = <T extends {}>(
  obj: T,
  ...omits: (keyof T)[]
): Omit<T, keyof T> => {
  const mapObj = new Map(Object.entries(obj));
  for (const key of omits) mapObj.delete(key as string);
  return Object.fromEntries(mapObj) as Omit<T, keyof T>;
};
