import { Modal } from "antd";
import axios, { AxiosError } from "axios";
import { tokenStorage, storageKey } from "../../storage";
import { LoginProps } from "../model/auth";

const fetchLogin = async (props: LoginProps) => {
  try {
    const {
      data: { accessToken },
    } = await axios.post("login", props);

    if (!accessToken) throw Error("no Token");

    tokenStorage.set(storageKey.ACCESS_TOKEN, accessToken);

    return true;
  } catch (error) {
    Modal.error({
      title: "error",
      content: error instanceof AxiosError ? error.response?.data : error,
    });
  }
};

export { fetchLogin };
