import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/authApi2";
import { setUser, clearUser } from "../store/authSlice2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        dispatch(clearUser());
        setLoading(false);
        return;
      }

      try {
        const response = await getCurrentUser();
        const user = response?.payload?.user;
        if (user) dispatch(setUser(user));
      } catch (error) {
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);