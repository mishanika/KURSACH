import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { url } from "../../utils/utils";
import { LoginData, Response } from "../../types";

export type Auth = {
  isAdmin: boolean;
  isAuth: boolean;
  isLoadingAuth: boolean;
  isInitial: boolean;
};

const initialState: Auth = {
  isAdmin: false,
  isAuth: false,
  isLoadingAuth: false,
  isInitial: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoadingAuth = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoadingAuth = false;
      state.isAuth = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoadingAuth = false;
      state.isAuth = false;
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.isLoadingAuth = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoadingAuth = false;
      state.isAuth = true;
      if (!state.isInitial) {
        state.isInitial = true;
      }
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isLoadingAuth = false;
      state.isAuth = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoadingAuth = false;
      state.isAuth = false;
    });

    builder.addCase(checkIsAdmin.pending, (state) => {
      state.isLoadingAuth = true;
    });
    builder.addCase(checkIsAdmin.fulfilled, (state, action) => {
      state.isLoadingAuth = false;
      state.isAdmin = true;
    });
    builder.addCase(checkIsAdmin.rejected, (state, action) => {
      state.isLoadingAuth = false;
      state.isAdmin = false;
    });
  },
});

export const loginUser = createAsyncThunk<any, LoginData>(
  "user/login",
  async (dataToPost: LoginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(dataToPost),
      });
      if (response.status === 200) {
        const responseData: Response = await response.json();

        localStorage.setItem("accessToken", responseData.accessToken);
        localStorage.setItem("id", responseData.data.id);
        return true;
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("id");
        return rejectWithValue(false);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(false);
    }
  }
);

export const checkAuth = createAsyncThunk<any>("user/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${url}/user/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ accessToken: accessToken }),
    });

    if (response.status === 200) {
      const responseData: Response = await response.json();

      localStorage.setItem("accessToken", responseData.accessToken);

      return true;
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      return rejectWithValue(false);
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue(false);
  }
});

export const checkIsAdmin = createAsyncThunk<any>("user/checkIsAdmin", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${url}/user/auth/isAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ accessToken: accessToken }),
    });

    if (response.status === 200) {
      const responseData: Response = await response.json();

      localStorage.setItem("accessToken", responseData.accessToken);

      return true;
    } else {
      return rejectWithValue(false);
    }
  } catch (error) {
    console.log(error);
    return rejectWithValue(false);
  }
});

export const logout = createAsyncThunk<any>("user/logout", async (_, { rejectWithValue }) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${url}/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ accessToken: accessToken }),
    });

    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    return rejectWithValue(false);
  } catch (error) {
    console.log(error);
    return rejectWithValue(false);
  }
});

export const {} = authSlice.actions;

export const selectAuth = (state: RootState): Auth => state.auth;

export default authSlice.reducer;
