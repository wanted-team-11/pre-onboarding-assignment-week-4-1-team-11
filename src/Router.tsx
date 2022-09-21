import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Content from "./pages/Content";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/content/*" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
