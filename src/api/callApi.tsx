import axios from "axios";
import setupInterceptorsTo from "./interception";

const baseApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

const callApi = setupInterceptorsTo(baseApi);

const LoginApi = async (email: string, password: string) => {
  const res = await baseApi.post("/login", {
    email: email,
    password: password,
  });
  return res;
};

export const UsersApi = async () => {
  const res = await callApi.get("/users");
  return res;
};

export const AccountApi = async () => {
  const res = await callApi.get("/accounts");
  return res;
};

export const SignApi = {
  LoginApi: (email: string, password: string) => LoginApi(email, password),
};
