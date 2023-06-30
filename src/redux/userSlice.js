import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  isLoading: false,
  error: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetchStart (state) {
      state.firstName = null;
      state.lastName = null;
      state.isLoading = true;
      state.error = null;
    },
    userFetchSuccess (state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isLoading = false;
      state.error = null;
    },
    userFetchFail (state, action) {
      state.firstName = null;
      state.lastName = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    profileUpdateStart (state) {
      state.isLoading = true;
      state.error = null;
    },
    profileUpdateSuccess (state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isLoading = false;
      state.error = null;
    },
    profileUpdateFail (state, action) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
})

export const { userFetchStart, userFetchSuccess, userFetchFail, profileUpdateStart, profileUpdateSuccess, profileUpdateFail, transactionFetchStart, transactionFetchSuccess, transactionFetchFail } = userSlice.actions;
export default userSlice.reducer;
