import { Outlet, Navigate } from "react-router-dom";
import storage from "../../utils/storage";

const ProtectedLayOut = () => {
  const TOKEN = storage.get("TOKEN");

  if (TOKEN !== null) return <Navigate to="/login" replace />;

  return <Outlet />;
};
export default ProtectedLayOut;
