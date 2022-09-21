import axios from "axios";
import { tokenStorage, storageKey } from "../../storage";
import { LoginProps } from "../model/auth";

const instance = axios.create();

instance.interceptors.response.use(
  res => {
    const { accessToken } = res.data;
    tokenStorage.set(storageKey.ACCESS_TOKEN, accessToken);
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

const fetchLogin = async (props: LoginProps) => {
  const res = await instance.post("login", props);
  return res.data;
};

export { fetchLogin };
