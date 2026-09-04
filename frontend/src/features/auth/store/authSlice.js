// import { createSlice } from "@reduxjs/toolkit";

// // ==========================================
// // Initial State
// // ==========================================

// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

// // ==========================================
// // Auth Slice
// // ==========================================

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     // ==========================================
//     // Set User
//     // ==========================================

//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isAuthenticated = Boolean(action.payload);
//     },

//     // ==========================================
//     // Update User
//     // ==========================================

//     updateUser: (state, action) => {
//       if (!action.payload) {
//         return;
//       }

//       // ----------------------------------------
//       // Replace user with latest backend data
//       // ----------------------------------------

//       state.user = {
//         ...state.user,
//         ...action.payload,
//       };

//       state.isAuthenticated = true;
//     },

//     // ==========================================
//     // Clear User
//     // ==========================================

//     clearUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// // ==========================================
// // Actions
// // ==========================================

// export const {
//   setUser,
//   updateUser,
//   clearUser,
// } = authSlice.actions;

// // ==========================================
// // Reducer
// // ==========================================

// export default authSlice.reducer;