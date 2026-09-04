import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../services/authApi2";
import { setUser, clearUser } from "../store/authSlice";

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await getCurrentUser();
        const user = response?.payload?.user;

        if (user) {
          dispatch(setUser(user));
        }
      } catch (error) {
        // Silent fail - কোনো console error দেখাবে না
        dispatch(clearUser());
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return children;
};

export default AuthInitializer;