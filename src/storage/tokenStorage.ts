export enum StorageKey {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
}

export const tokenStorage = {
  get: (key: StorageKey) => localStorage.getItem(key),
  set: (key: StorageKey, value: string) => localStorage.setItem(key, value),
  remove: (key: StorageKey) => localStorage.removeItem(key),
};
