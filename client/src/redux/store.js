import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import typeSlice, { setTypes } from "./features/type/typeSlice";
import brandSlice from "./features/brand/brandSlice";
import deviceSlice from "./features/device/deviceSlice";
import cartSlice, { getTotals } from "./features/cart/cartSlice";
import { useDispatch } from "react-redux";
import orderSlice, { setOrderAdmin } from "./features/order/orderSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    type: typeSlice,
    brand: brandSlice,
    device: deviceSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
store.dispatch(getTotals);
store.dispatch(setTypes);
