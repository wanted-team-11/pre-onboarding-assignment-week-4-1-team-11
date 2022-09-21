import { BrowserRouter, Route, Routes } from "react-router-dom";
import { tokenStorage } from "../storage";
import { Navigate } from "react-router-dom";
import Login from "../pages/login";
import Admin from "../pages/admin";
import PageNotFound from "../pages/error/PageNotFound";

const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  ADMIN: "/admin"
};

const Router = () => {
  const isLoggedin = tokenStorage.get({ key: "token" }) ? true : false;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATH.ROOT}
          element={
            isLoggedin ? (
              <Navigate to={PATH.ADMIN} replace />
            ) : (
              <Navigate to={PATH.LOGIN} replace />
            )
          }
        />

        <Route path={PATH.LOGIN} element={<Login />} />

        <Route
          path={PATH.ADMIN}
          element={
            isLoggedin ? <Admin /> : <Navigate to={PATH.LOGIN} replace />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
