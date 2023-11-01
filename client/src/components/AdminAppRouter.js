import React from "react";
import { Routes, Route } from "react-router-dom";
import { adminRoutes } from "../routes";

import AdminOrder from "../pages/admin/AdminOrder";

export const AdminAppRouter = () => {
  return (
    <Routes>
      {adminRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<AdminOrder replace />} />
    </Routes>
  );
};

export default AdminAppRouter;
