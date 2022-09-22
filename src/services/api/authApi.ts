import { User } from "../model/auth";
import { authInstance } from "./instance";

const fetchLogin = async (props: User) => {
  return authInstance.post("login", props);
};

export { fetchLogin };
