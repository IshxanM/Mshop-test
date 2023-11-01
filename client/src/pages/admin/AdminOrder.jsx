import React from "react";
import AdminOrderTable from "./components/order/AdminOrderTable";

const AdminOrder = () => {
  return (
    <div className="page__content">
      <h1 className="page__name">Заказы</h1>
      <hr />

      <div className="getType__body">
        <AdminOrderTable />{" "}
      </div>
    </div>
  );
};

export default AdminOrder;
