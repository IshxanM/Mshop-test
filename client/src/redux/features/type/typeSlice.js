import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  types: [],
  isLoading: false,
  status: null,
};
export const createType = createAsyncThunk(
  "api/type/createType",
  async ({ name }) => {
    try {
      const { data } = await axios.post("api/type/createType", {
        name,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getAllType = createAsyncThunk(
  "api/type",
  async (_, { type, dispatch }) => {
    try {
      const { data } = await axios.get("api/type", type);
      dispatch(setTypes(data));
    } catch (err) {
      console.log(err);
    }
  }
);
export const deleteType = createAsyncThunk(
  "api/type/deleteType",
  async ({ id }) => {
    try {
      const { data } = await axios.post("api/type/deleteType", {
        id,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const updateType = createAsyncThunk(
  "api/type/updateType",
  async ({ id, updateName }) => {
    try {
      const { data } = await axios.put("api/type/updateType", {
        id,
        updateName,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const typeSlice = createSlice({
  name: "type",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
  },
  extraReducers: {
    [createType.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [createType.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [createType.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    //Получение всех типов
    [getAllType.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [getAllType.fulfilled]: (state, action) => {
      state.loading = false;
      state.type = action.payload;
    },
    [getAllType.rejected]: (state, action) => {
      state.loading = false;
    },
    //Удаление типа
    [deleteType.pending]: (state) => {
      state.loading = true;
    },
    [deleteType.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [deleteType.rejected]: (state) => {
      state.loading = false;
    },
    //Редактирование типа
    [updateType.pending]: (state) => {
      state.loading = true;
    },
    [updateType.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [updateType.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
  },
});
export const { setTypes } = typeSlice.actions;

export default typeSlice.reducer;
