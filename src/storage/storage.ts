export type StorageKey = "TOKEN" | "EMAIL";

const storage = {
  get: (key: StorageKey) => localStorage.getItem(key),
  set: ({ key, value }: { key: StorageKey; value: string }) =>
    localStorage.setItem(key, value),
  remove: () => localStorage.clear(),
};

export default storage;
