import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route></Route>
            <Route></Route>
            <Route></Route>
        </Routes>
        </BrowserRouter>
    );
};

export default Router;