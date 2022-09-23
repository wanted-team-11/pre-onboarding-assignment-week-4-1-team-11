import { InputProps } from "../services/model/auth";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { fetchLogin } from "../services/api/authApi";

const useAuth = (inputProps: InputProps) => {
  const navigate = useNavigate();
  const { email, password } = inputProps;

  const handleLogin = async () => {
    fetchLogin({
      email,
      password,
    })
      .then(() => {
        navigate("/accounts?page=1");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          alert(error.response?.data);
        } else {
          alert(error);
        }
      });
  };

  return {
    handleLogin,
  };
};

export default useAuth;
