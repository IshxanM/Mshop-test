import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};
export const registration = createAsyncThunk(
  "api/user/registration",
  async ({ email, password, name, phone }) => {
    try {
      const { data } = await axios.post("api/user/registration", {
        email,
        password,
        name,
        phone,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "api/user/reset-password",
  async ({ email }) => {
    try {
      const { data } = await axios.post("api/user/reset-password", {
        email,
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
//Запрос на получение нового пароля
export const setNewResetPassword = createAsyncThunk(
  "api/user/set-new-reset-password",
  async ({ password, link }) => {
    try {
      const { data } = await axios.patch(
        "api/user/set-new-reset-password/" + link,
        {
          password,
        }
      );

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const login = createAsyncThunk(
  "api/user/login",
  async ({ email, password }) => {
    try {
      const { data } = await axios.post("api/user/login", {
        email,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token);
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const check = createAsyncThunk("api/user/auth", async () => {
  try {
    const { data } = await axios.get("api/user/auth");

    return data;
  } catch (err) {
    console.log(err);
  }
});
export const updateMyinfo = createAsyncThunk(
  "api/user/updateMyInfo",
  async (user) => {
    try {
      console.log(user);
      const { data } = await axios.put(`/api/user/updateMyInfo`, user);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    },
  },
  extraReducers: {
    //RegisterUser
    [registration.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registration.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registration.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //LoginUser
    [login.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //проверка авторизации
    [check.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [check.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = null;
      state.user = action.payload?.user;
      state.token = action.payload?.token;
    },
    [check.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Редактирование пользователя
    [updateMyinfo.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [updateMyinfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [updateMyinfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Сброс пароля
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [resetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    //Запрос на получение нового пароля
    [setNewResetPassword.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [setNewResetPassword.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
    [setNewResetPassword.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = action.payload.message;
    },
  },
});
export const checkIsAuth = (state) => Boolean(state.auth.token);

export const { logout } = authSlice.actions;

export default authSlice.reducer;
