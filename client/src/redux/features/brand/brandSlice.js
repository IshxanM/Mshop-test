import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  brands: [],
  isLoading: false,
  status: null,
};
export const createBrand = createAsyncThunk(
  "api/brand/createBrand",
  async ({ name }) => {
    try {
      const { data } = await axios.post("api/brand/createBrand", {
        name,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllBrand = createAsyncThunk(
  "api/brand",
  async (_, { typeId, brandId, page, limit = 3, dispatch }) => {
    try {
      const { data } = await axios.get("api/brand", {
        params: { typeId, brandId, page, limit },
      });
      dispatch(setBrands(data));
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteBrand = createAsyncThunk(
  "api/brand/deleteBrand",
  async ({ id }) => {
    try {
      const { data } = await axios.post("api/brand/deleteBrand", {
        id,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateBrand = createAsyncThunk(
  "api/brand/updateBrand",
  async ({ id, updateName }) => {
    try {
      const { data } = await axios.put("api/brand/updateBrand", {
        id,
        updateName,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
  },
  extraReducers: {
    //Создание бренда
    [createBrand.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [createBrand.fulfilled]: (state, action) => {
      state.loading = false;

      state.status = action.payload.message;
    },
    [createBrand.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    //Получение всех типов
    [getAllBrand.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [getAllBrand.fulfilled]: (state, action) => {
      state.loading = false;
      state.brand = action.payload;
    },
    [getAllBrand.rejected]: (state, action) => {
      state.loading = false;
    },
    //Удаление бренда
    [deleteBrand.pending]: (state) => {
      state.loading = true;
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [deleteBrand.rejected]: (state) => {
      state.loading = false;
    },
    //Редактирование бренда
    [updateBrand.pending]: (state) => {
      state.loading = true;
    },
    [updateBrand.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [updateBrand.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
  },
});

export default brandSlice.reducer;
export const { setBrands } = brandSlice.actions;
