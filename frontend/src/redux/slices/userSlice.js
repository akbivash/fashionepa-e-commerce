import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    errorMsg: ''
  },
  reducers: {
    isLoading: (state) => {
      state.loading = true
    },
    isError: (state, action) => {
      state.loading = false
      state.error = true
    },
    registerSuccess: ((state, action) => {
      state.currentUser = action.payload.data
      state.loading = false
    }),
    loginSuccess: ((state, action) => {
      state.currentUser = action.payload.data
      state.loading = false
    }),

    logoutSuccess: ((state) => {
      state.currentUser = null
      state.loading = false
    }),
    setErrorMsg: ((state, action) => {
      state.errorMsg = action.payload
      state.loading = false
    })


  }
});

export const { loginSuccess, logoutSuccess, registerSuccess, logoutStart, setErrorMsg ,isError,isLoading} = userSlice.actions;
export default userSlice.reducer;
