import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  devices: [],
  isLoading: false,
  status: null,
};
export const createDevice = createAsyncThunk(
  "api/device/createDevice",
  async (device) => {
    try {
      const { data } = await axios.post("api/device/createDevice", device);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

//Получение одного девайса
export const getOneDevice = async (id) => {
  try {
    const { data } = await axios.get("api/device/" + id);

    return data;
  } catch (err) {
    console.log(err);
  }
};
//Удаление устройства
export const deleteDevice = createAsyncThunk(
  "api/device/deleteDevice",
  async ({ id }) => {
    try {
      const { data } = await axios.post("api/device/deleteDevice", {
        id,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
//Редактирование устройства
export const updateDevice = createAsyncThunk(
  "api/device/updateDevice",
  async (device) => {
    try {
      console.log(device);
      const { data } = await axios.put("api/device/updateDevice", device);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
//Удаление устройства
export const deleteDeviceInfo = createAsyncThunk(
  "api/device/deleteDeviceInfo",
  async ({ id }) => {
    try {
      const { data } = await axios.post("api/device/deleteDeviceInfo", {
        id,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
//Редактирование устройства
export const updateDeviceInfo = createAsyncThunk(
  "api/device/updateDeviceInfo",
  async (device) => {
    try {
      const { data } = await axios.put("api/device/updateDeviceInfo", device);

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {},
  extraReducers: {
    [createDevice.pending]: (state) => {
      state.loading = true;
      state.status = null;
    },
    [createDevice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [createDevice.rejected]: (state, action) => {
      state.loading = false;
      state.status = null;
    },
    //Удаление типа
    [deleteDevice.pending]: (state) => {
      state.loading = true;
    },
    [deleteDevice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [deleteDevice.rejected]: (state) => {
      state.loading = false;
      state.status = null;
    },
    //Редактирование бренда
    [updateDevice.pending]: (state) => {
      state.loading = true;
    },
    [updateDevice.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [updateDevice.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    //Удаление устройства
    [deleteDeviceInfo.pending]: (state) => {
      state.loading = true;
    },
    [deleteDeviceInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [deleteDeviceInfo.rejected]: (state) => {
      state.loading = false;
    },
    //Редактирование устройства
    [updateDeviceInfo.pending]: (state) => {
      state.loading = true;
    },
    [updateDeviceInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
    [updateDeviceInfo.rejected]: (state, action) => {
      state.loading = false;
      state.status = action.payload.message;
    },
  },
});

export default deviceSlice.reducer;
