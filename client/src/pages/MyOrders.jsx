import { React, useEffect } from "react";

import Order from "../components/order/Order";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { status } = useSelector((state) => state.order);

  useEffect(() => {
    if (status) {
      toast(status);
    }
  }, [status]);

  return (
    <div>
      <h1 className="name_page">Заказы</h1>
      <Order />
    </div>
  );
};

export default MyOrders;
