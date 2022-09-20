import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sider from "./components/Sider";

import AccountList from "./pages/AccountList";
import Login from "./pages/Login";
import User from "./pages/User";

function App() {
  return (
    <>
      <Header />
      <Sider />
      <Footer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/account" element={<AccountList />} />
      </Routes>
    </>
  );
}

export default App;
