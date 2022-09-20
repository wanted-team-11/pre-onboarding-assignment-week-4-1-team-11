import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Content from './pages/Content/Content';

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
