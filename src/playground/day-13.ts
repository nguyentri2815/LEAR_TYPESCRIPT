//genetic:

const firstItem = <T>(items: T[]): T | undefined => {
    return items[0];
}

const findItemById = <T extends { id: string }>(items: T[], id: string): T | null => {
    const foundItem = items.find((item) => item.id === id);
    return foundItem ?? null;
}