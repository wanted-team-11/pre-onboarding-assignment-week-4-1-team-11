export type storageKey = 'accessToken';

const storage = {
  get: (key: storageKey) => localStorage.getItem(key),
  set: (key: storageKey, value: string) => localStorage.setItem(key, value),
  remove: (key: storageKey) => localStorage.removeItem(key),
};

export default storage;
