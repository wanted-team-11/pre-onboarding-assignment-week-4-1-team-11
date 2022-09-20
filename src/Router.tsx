import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
