import { Route, Routes } from "react-router-dom";
import LoginLayOut from "./components/Layout/LoginLayOut";
import ProtectedLayOut from "./components/Layout/ProtectedLayOut";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Routes>
      <Route element={<LoginLayOut />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedLayOut />}>
        <Route path="*" element={<MainPage />} />
      </Route>
    </Routes>
  );
};

export default App;
