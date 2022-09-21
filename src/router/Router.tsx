import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/login";
import Admin from "../pages/admin";
import PageNotFound from "../pages/error/PageNotFound";
import AuthRoute from "./AuthRoute";

const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  ADMIN: "/admin",
};

const Router = () => {
  const nonAuthRedirectPath = PATH.LOGIN;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATH.ROOT}
          element={<Navigate to={PATH.ADMIN} replace />}
        />

        <Route path={PATH.LOGIN} element={<LoginPage />} />

        <Route
          element={<AuthRoute nonAuthRedirectPath={nonAuthRedirectPath} />}
        >
          <Route path={PATH.ADMIN} element={<Admin />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
