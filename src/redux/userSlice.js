import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  transactions: [],
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetchStart (state) {
      state.firstName = null;
      state.isLoading = true;
      state.error = null;
    },
    userFetchSuccess (state, action) {
      state.firstName = action.payload.firstName;
      state.isLoading = false;
      state.error = null;
    },
    userFetchFail (state, action) {
      state.firstName = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    profileUpdateStart (state) {
      state.isLoading = true;
      state.error = null;
    },
    profileUpdateSuccess (state, action) {
      state.firstName = action.payload.name;
      state.isLoading = false;
      state.error = null;
    },
    profileUpdateFail (state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    transactionFetchStart (state) {
      state.transactions = [];
      state.isLoading = true;
      state.error = null;
    },
    transactionFetchSuccess (state, action) {
      state.transactions = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    transactionFetchFail (state, action) {
      state.transactions = [];
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export const { userFetchStart, userFetchSuccess, userFetchFail, profileUpdateStart, profileUpdateSuccess, profileUpdateFail, transactionFetchStart, transactionFetchSuccess, transactionFetchFail } = userSlice.actions;
export default userSlice.reducer;
