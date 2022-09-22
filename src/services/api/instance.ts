import axios from "axios";
import storage from "../../storage/storage";

const token = storage.get("TOKEN");

export const baseInstance = axios.create({
  headers: { Authorization: `Bearer ${token}` },
});

baseInstance.interceptors.response.use(
  (res) => {
    const token = storage.get("TOKEN");
    if (!token) throw Error("no token");
    return { ...res };
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authInstance = axios.create();

authInstance.interceptors.response.use(
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
