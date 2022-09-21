export const tokenStorage = {
  get: () => {
    return localStorage.getItem("token");
  },
  set: (value: string) => {
    localStorage.setItem("token", value);
  },
  remove: () => {
    localStorage.removeItem("token");
  },
};
