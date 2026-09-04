import api from "../../../services/api";

export const googleLoginUser = async (idToken) => {
  const response = await api.post("/auth/google", { idToken });
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  const accessToken =
    response.data?.payload?.accessToken || response.data?.accessToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await api.post("/auth/refresh-token");

  const accessToken =
    response.data?.payload?.accessToken || response.data?.accessToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.post("/user/verify-email", { token });
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await api.put("/user/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put("/user/change-password", passwordData);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/user/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/user/reset-password", data);
  return response.data;
};