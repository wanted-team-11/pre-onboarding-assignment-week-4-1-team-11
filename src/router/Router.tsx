import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth";
import PageNotFound from "../pages/error/PageNotFound";
import AuthRoute from "./AuthRoute";
import AdminPageLayout from "../pages/admin/components/AdminPageLayout";
import UserDetail from "../pages/admin/components/UserDetail";
import UserListPage from "../pages/admin/UserListPage";
import SearchUserListPage from "../pages/admin/SearchUserListPage";
import AccountListPage from "../pages/admin/AccountListPage";

export const PATH = {
  ROOT: "/",
  LOGIN: "/login",
  ADMIN: "/admin",
  USER_LIST: (page?: string) => `/admin/user-list/${page || "1"}`,
  USER_DETAIL: (id: string) => `/admin/user-list/detail/${id}`,
  ACCOUNT_LIST: (page?: string) => `/admin/account-list/${page || "1"}`,
  USER_LIST_SEARCH: (page?: string) => `/admin/user-list/search/${page || "1"}`,
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
            element={<Navigate to={PATH.USER_LIST()} replace />}
          />
          <Route element={<AdminPageLayout />}>
            <Route path={PATH.USER_LIST(":page")} element={<UserListPage />} />
            <Route path={PATH.USER_DETAIL(":id")} element={<UserDetail />} />
            <Route
              path={PATH.ACCOUNT_LIST(":page")}
              element={<AccountListPage />}
            />
            <Route
              path={PATH.USER_LIST_SEARCH(":page")}
              element={<SearchUserListPage />}
            />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
