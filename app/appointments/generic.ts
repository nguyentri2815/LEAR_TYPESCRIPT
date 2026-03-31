
export const firstItem = <T>(items: T[]): T | null => {
    return items[0] ?? null;
}

export const findItemById = <T extends { id: string }>(items: T[], id: string): T | null => {
    const foundItem = items.find((item) => item.id === id);
    return foundItem ?? null;
}

export type Column<T> = Readonly<{
    label: string;
    key: string;
    dataKey?: keyof T;
    render?: (item: T) => React.ReactNode;
}>;
export const getValueByKey = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
}