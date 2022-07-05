import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  authenticated: boolean;
  accessToken: string | null;
  user: null;
  isLoading: boolean;
  error: string;
  username: string;
  password: string;
};

export const initialState: AuthState = {
  authenticated: false,
  accessToken: null,
  user: null,
  isLoading: false,
  error: "",
  username: "",
  password: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    startAuthRequest: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    endAuthRequest: (state) => {
      state.isLoading = false;
    },
    resetUser: (state) => {
      state.authenticated = false;
      state.accessToken = null;
      state.user = null;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    resetLoginDetails: (state) => {
      state.username = "";
      state.password = "";
    },
  },
});
