export type StorageKey = "TOKEN" | "EMAIL";

const storage = {
  get: (key: StorageKey) => localStorage.getItem(key),
  set: ({ key, value }: { key: StorageKey; value: string }) =>
    localStorage.setItem(key, value),
  remove: (key: StorageKey) => localStorage.removeItem(key),
};

export default storage;
