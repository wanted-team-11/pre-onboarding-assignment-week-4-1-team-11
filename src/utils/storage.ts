export type storageKey = "TOKEN" | "USER";
const storage = {
  get: (key: storageKey) => localStorage.getItem(key),
  set: ({ key, value }: { key: storageKey; value: string }) =>
    localStorage.setItem(key, value),
  reset: (key: storageKey) => localStorage.removeItem(key),
};
export default storage;
