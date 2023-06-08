import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart (state) {
      state.isLoading = true;
      state.error = null;
    },
    authSuccess (state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    authFail (state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    authLogout (state) {
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    }
  }
})

export const { authStart, authSuccess, authFail, authLogout } = authSlice.actions;
export default authSlice.reducer;
