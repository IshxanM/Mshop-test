import { createContext, useState } from "react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";
export const CustomContext = createContext();

const Context = (props) => {
  const [typeValue, setTypeValue] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [brandValue, setBrandValue] = useState(0);
  const [authUser, setAuthUser] = useState({});
  const [myOrder, setMyOrder] = useState({});
  const [orderAdmin, setOrderAdmin] = useState({});
  const [devices, setDevices] = useState({
    data: [],
    error: "",
    dataLength: 0,
  });
  const [price, setPrice] = useState("");
  const [nameBrand, setNameBrand] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [delivery, setDelivery] = useState("delivery");
  const changeType = (value) => {
    setTypeValue(value);
    setPage(1);
  };
  const changeBrand = (value) => {
    setBrandValue(value);
    setPage(1);
  };
  //Получение всех устройств
  const getAllDevice = createAsyncThunk("api/device", async () => {
    try {
      await axios
        .get(
          `api/device/?brandId=${brandValue !== 0 ? brandValue : ""}&typeId=${
            typeValue !== 0 ? typeValue : ""
          }`
        )
        .then((data) =>
          setDevices({
            data: data,
            dataLength: data.data.rows.length,
            error: "",
          })
        )
        .catch((error) =>
          setDevices({ error: error, dataLength: 0, data: [] })
        );
    } catch (err) {
      console.log(err);
    }
  });
  //Получение авторизованного пользователя
  const getUser = createAsyncThunk("api/user/auth/get", async (user) => {
    try {
      const data = await axios
        .get("api/user/auth/get", user)
        .then((data) => setAuthUser(data.data.user));
    } catch (err) {
      console.log(err);
    }
  });
  //Получение моих заказов
  const getMyOrder = createAsyncThunk("api/order/myOrder", async (id) => {
    try {
      const data = await axios
        .get(`api/order/myOrder/ ` + id)
        .then((data) => setMyOrder(data.data));
    } catch (err) {
      console.log(err);
    }
  });

  //Получение всех заказов в админке
  const getAllOrderAdmin = createAsyncThunk(
    "api/order/getAllOrderAdmin",
    async () => {
      try {
        const data = await axios
          .get(`api/order/getAllOrderAdmin/ `)
          .then((data) => setOrderAdmin(data.data));
      } catch (err) {
        console.log(err);
      }
    }
  );

  const value = {
    devices,
    getUser,
    authUser,
    typeValue,
    brandValue,
    getAllDevice,

    getMyOrder,
    setDevices,
    changeType,
    changeBrand,
    setNameBrand,
    nameBrand,
    searchValue,
    setSearchValue,
    price,
    setPrice,
    limit,
    setLimit,
    page,
    setPage,
    delivery,
    setDelivery,
    inputValue,
    setInputValue,
    myOrder,
    setMyOrder,
    orderAdmin,
    getAllOrderAdmin,
  };

  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};
export default Context;
