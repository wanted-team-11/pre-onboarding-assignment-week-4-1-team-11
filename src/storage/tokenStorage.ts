interface Props {
  key: string;
}

export const tokenStorage = {
  get: ({ key }: Props) => localStorage.getItem(key),
  set: ({ key, value }: Props & { value: string }) =>
    localStorage.setItem(key, value),
  remove: ({ key }: Props) => localStorage.removeItem(key)
};
