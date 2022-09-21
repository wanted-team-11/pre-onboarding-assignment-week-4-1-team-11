import axios from "axios";
import storage from "../../utils/storage";
import { User } from "../model/auth";

const instance = axios.create();

instance.interceptors.response.use(
  (res) => {
    const { accessToken, user } = res.data;
    const { email } = user;
    storage.set({ key: "TOKEN", value: accessToken });
    storage.set({ key: "EMAIL", value: email });
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fetchLogin = async (props: User) => {
  return instance.post("login", props);
};

export { fetchLogin };
