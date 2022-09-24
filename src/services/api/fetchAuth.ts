import { Modal } from "antd";
import axios, { AxiosError } from "axios";
import { tokenStorage, StorageKey } from "../../storage";
import { LoginProps, SignupProps } from "../models/auth";

const fetchSignup = async (props: SignupProps) => {
  try {
    const res = await axios.post("signup", props);
    return true;
  } catch (err) {
    Modal.error({
      title: "error",
      content: err instanceof AxiosError ? err.response?.data : err,
    });
  }
};

const fetchLogin = async (props: LoginProps) => {
  try {
    const {
      data: { accessToken },
    } = await axios.post("login", props);
    const { email } = props;

    if (!accessToken) throw Error("no Token");

    tokenStorage.set(StorageKey.ACCESS_TOKEN, accessToken);
    tokenStorage.set(StorageKey.EMAIL, email);

    return true;
  } catch (err) {
    Modal.error({
      title: "error",
      content: err instanceof AxiosError ? err.response?.data : err,
    });
  }
};

export { fetchLogin, fetchSignup };
