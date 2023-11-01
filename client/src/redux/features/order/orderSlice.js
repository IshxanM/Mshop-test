import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  orders: [],
  isLoading: false,
  status: null,
};
export const addOrder = createAsyncThunk(
  "api/order/addOrder",
  async ({ totalPrice, cartItems, inputValue, delivery, authUser }) => {
    try {
      const { data } = await axios.post("api/order/addOrder", {
        totalPrice,
        cartItems,
        inputValue,
        delivery,
        authUser,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const canelMyOrder = createAsyncThunk(
  "api/order/canelMyOrder",
  async (id) => {
    try {
      const { data } = await axios.put(`/api/order/canelMyOrder/${id}`, id);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const setRatingMyOrder = createAsyncThunk(
  "api/order/setRatingMyOrder",
  async (props, rating) => {
    try {
      const { data } = await axios.post(
        `/api/order/setRatingMyOrder`,
        props,
        rating
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
//Смена статуса заказа
export const changeStatusAdmin = createAsyncThunk(
  "api/order/changeStatusAdmin",
  async ({ id, orderStatus }) => {
    try {
      const { data } = await axios.put(`/api/order/changeStatusAdmin/${id}`, {
        id,
        orderStatus,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const orderSlice = createSlice({
  name: "order",

  initialState,
  reducers: {},
  extraReducers: {
    //Создание заказа
    [addOrder.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [addOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
      state.status = action.payload.message;
    },
    [addOrder.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    //Отмена заказа
    [canelMyOrder.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [canelMyOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [canelMyOrder.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    //Отзыв
    [setRatingMyOrder.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [setRatingMyOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [setRatingMyOrder.rejected]: (state, action) => {
      state.loading = false;
      state.status = null;
    },
    //Смена статуса заказа
    [changeStatusAdmin.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [changeStatusAdmin.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [changeStatusAdmin.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
  },
});

export default orderSlice.reducer;
