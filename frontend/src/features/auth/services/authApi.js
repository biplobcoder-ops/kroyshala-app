// import api from "../../../services/api";

// // ==========================================
// // Login User (Cookie-based)
// // ==========================================

// export const loginUser = async (credentials) => {
//   const response = await api.post("/auth/login", credentials);
//   // Cookie automatically set হবে
//   return response.data;
// };

// // ==========================================
// // Logout User
// // ==========================================

// export const logoutUser = async () => {
//   const response = await api.post("/auth/logout");
//   return response.data;
// };

// // ==========================================
// // Refresh Access Token
// // ==========================================

// export const refreshAccessToken = async () => {
//   const response = await api.post("/auth/refresh-token");
//   return response.data;
// };

// // ==========================================
// // Get Current User
// // ==========================================

// export const getCurrentUser = async () => {
//   const response = await api.get("/user/me");
//   return response.data;
// };