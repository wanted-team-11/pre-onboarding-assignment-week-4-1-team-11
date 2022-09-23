import { InputProps } from "../model/auth";
import { authInstance } from "./instance";

const fetchLogin = async (props: InputProps) => {
  return authInstance.post("login", props);
};

export { fetchLogin };
