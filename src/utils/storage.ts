export type storageKey = "TOKEN";
const storage = {
  get: (key: storageKey) => localStorage.getItem(key),
  set: ({ key, value }: { key: storageKey; value: string }) =>
    localStorage.setItem(key, value),
};
export default storage;
