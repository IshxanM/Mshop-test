import React from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import Home from "../pages/Home";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSlice";

export const AppRouter = () => {
  const isAuth = useSelector(checkIsAuth);

  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<Home replace />} />
    </Routes>
  );
};

export default AppRouter;
