import { Navigate, Outlet } from "react-router-dom";
import { StorageKey, tokenStorage } from "../storage";

type Props = {
  nonAuthRedirectPath: string;
};

const AuthRoute = ({ nonAuthRedirectPath }: Props) => {
  const isAutheticated = tokenStorage.get(StorageKey.ACCESS_TOKEN)
    ? true
    : false;

  return isAutheticated ? (
    <Outlet />
  ) : (
    <Navigate to={nonAuthRedirectPath} replace />
  );
};

export default AuthRoute;
