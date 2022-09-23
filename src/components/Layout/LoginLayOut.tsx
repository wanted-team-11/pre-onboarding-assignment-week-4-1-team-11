import { Navigate, Outlet } from "react-router-dom";
import storage from "../../utils/storage";

const LoginLayOut = () => {
  const TOKEN = storage.get("TOKEN");

  if (TOKEN !== null) return <Navigate to="/" replace />;

  return <Outlet />;
};
export default LoginLayOut;
