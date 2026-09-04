import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice2 = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
    },
    updateUser: (state, action) => {
      if (!action.payload) return;
      state.user = {
        ...state.user,
        ...action.payload,
      };
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUser, clearUser } = authSlice2.actions;
export default authSlice2.reducer;