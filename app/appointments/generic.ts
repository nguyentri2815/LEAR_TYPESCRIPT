export const firstItem = <T>(items: T[]): T | null => {
  return items[0] ?? null;
};

export const findItemById = <T extends { id: string }>(
  items: T[],
  id: string,
): T | null => {
  const foundItem = items.find((item) => item.id === id);
  return foundItem ?? null;
};

export type Column<T> = Readonly<{
  label: string;
  key: string;
  dataKey?: keyof T;
  render?: (item: T) => React.ReactNode;
}>;
export const getValueByKey = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

export const mapToOptions = <T>(
  arr: T[],
  getLabel: (item: T) => string,
  getValue: (item: T) => string,
): { value: string; label: string }[] =>
  arr.map((item) => ({ value: getValue(item), label: getLabel(item) }));

export const groupBy = <T, K extends string>(
  arr: T[],
  getKey: (item: T) => K,
): Record<K, T[]> => {
  return arr.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>,
  );
};

export const toRecord = <K extends PropertyKey, T extends { id: K }>(
  arr: T[],
): Record<K, T> => {
  return arr.reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<K, T>,
  );
};

export const toRecordById = toRecord;
