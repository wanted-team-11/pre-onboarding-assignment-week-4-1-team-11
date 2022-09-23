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
        <Route path="account-list" element={<AccountListPage />} />
        <Route path="account-detail/:id" element={<AccountDetailPage />} />
        <Route path="user-list" element={<UserListPage />} />
        <Route path="user-detail/:id" element={<UserDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
