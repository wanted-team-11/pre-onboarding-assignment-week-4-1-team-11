import { Routes, Route, BrowserRouter } from "react-router-dom";
import AccountDetail from "./pages/AccountDetail";
import AccountList from "./pages/AccountList";
import Login from "./pages/Login";
import UserDetail from "./pages/UserDetail";
import UserList from "./pages/UserList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user_list" element={<UserList />} />
        <Route path="/user_detail" element={<UserDetail />} />
        <Route path="/account_list" element={<AccountList />} />
        <Route path="/account_detail" element={<AccountDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
