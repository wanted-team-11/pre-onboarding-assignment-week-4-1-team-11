import { Navigate, Outlet } from "react-router-dom";
import { storageKey, tokenStorage } from "../storage";

type Props = {
  nonAuthRedirectPath: string;
};

const AuthRoute = ({ nonAuthRedirectPath }: Props) => {
  const isAutheticated = tokenStorage.get(storageKey.ACCESS_TOKEN)
    ? true
    : false;

  return isAutheticated ? (
    <Outlet />
  ) : (
    <Navigate to={nonAuthRedirectPath} replace />
  );
};

export default AuthRoute;
