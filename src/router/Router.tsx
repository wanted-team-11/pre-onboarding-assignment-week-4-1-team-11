import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth";
import PageNotFound from "../pages/error/PageNotFound";
import AuthRoute from "./AuthRoute";
import UserList from "../pages/admin/components/UserList";
import AccountList from "../pages/admin/components/AccountList";
import AdminPageLayout from "../pages/admin/components/AdminPageLayout";
import UserDetail from "../pages/admin/components/UserDetail";

const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  ADMIN: "/admin",
  USER_LIST: "/admin/user-list",
  ACCOUNT_LIST: "/admin/account-list",
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
          <Route
            path={PATH.ADMIN}
            element={<Navigate to={PATH.USER_LIST} replace />}
          />
          <Route element={<AdminPageLayout />}>
            <Route path={PATH.USER_LIST} element={<UserList />} />
            <Route path={PATH.USER_LIST + "/:id"} element={<UserDetail />} />
            <Route path={PATH.ACCOUNT_LIST} element={<AccountList />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
