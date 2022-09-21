export enum storageKey {
  ACCESS_TOKEN = "ACCESS_TOKEN"
}

export const tokenStorage = {
  get: (key: storageKey) => localStorage.getItem(key),
  set: (key: storageKey, value: string) => localStorage.setItem(key, value),
  remove: (key: storageKey) => localStorage.removeItem(key)
};
