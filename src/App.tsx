import { Routes, Route } from "react-router-dom";
import AccountList from "./pages/Account";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="/account" element={<AccountList />} />
    </Routes>
  );
}

export default App;
