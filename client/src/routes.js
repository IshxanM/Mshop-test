import CreateBrand from "./pages/admin/CreateBrand";
import CreateType from "./pages/admin/CreateType";
import CreateDevice from "./pages/admin/CreateDevice";
import Device from "./pages/admin/Device";
import AdminOrder from "./pages/admin/AdminOrder";

import Basket from "./pages/Basket";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import DevicePage from "./pages/device/DevicePage";
import {
  CREATETYPE_ROUTE,
  CREATEBRAND_ROUTE,
  HOME_ROUTE,
  REGISTRATION_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  CREATEDEVICE_ROUTE,
  DEVICE_ROUTE,
  ORDER_ROUTE,
  MYPROFILE_ROUTE,
  MYORDERS_ROUTE,
  ADMINDEVICE_ROUTE,
  ADMINORDER_ROUTE,
  RESETPASSWORD_ROUTE,
} from "./utils/consts";
import Order from "./pages/Order";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";

export const authRoutes = [
  {
    path: MYPROFILE_ROUTE,
    Component: MyProfile,
  },
  {
    path: MYORDERS_ROUTE,
    Component: MyOrders,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
];
export const adminRoutes = [
  {
    path: CREATETYPE_ROUTE,
    Component: CreateType,
  },
  {
    path: CREATEBRAND_ROUTE,
    Component: CreateBrand,
  },
  {
    path: CREATEDEVICE_ROUTE,
    Component: CreateDevice,
  },

  {
    path: ADMINDEVICE_ROUTE,
    Component: Device,
  },
  {
    path: ADMINORDER_ROUTE,
    Component: AdminOrder,
  },
];
export const publicRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Register,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
  {
    path: RESETPASSWORD_ROUTE + "/:link",
    Component: ResetPassword,
  },
];
