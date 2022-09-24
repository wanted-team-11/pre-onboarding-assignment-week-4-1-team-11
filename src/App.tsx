import { Routes, Route, Navigate } from "react-router-dom";
import GlobalLayout from "./components/GlobalLayout";
import AccountListPage from "./pages/AccountListPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import UserDetailPage from "./pages/UserDetailPage";
import UserListPage from "./pages/UserListPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GlobalLayout />}>
        <Route index element={<Navigate replace to="account-list" />} />
        <Route
          path="account-list"
          element={<Navigate replace to="/account-list/1" />}
        />
        <Route path="account-list/:page" element={<AccountListPage />} />
        <Route
          path="account-detail/:userId/:id"
          element={<AccountDetailPage />}
        />
        <Route
          path="user-list"
          element={<Navigate replace to="/user-list/1" />}
        />
        <Route path="user-list/:page" element={<UserListPage />} />
        <Route path="user-detail/:id" element={<UserDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
