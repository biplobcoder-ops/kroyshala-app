import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Button from "../ui/Button/Button";
import { googleLoginUser } from "../../features/auth/services/authApi2";
// ✅ authSlice2 থেকে import করতে হবে
import { setUser } from "../../features/auth/store/authSlice2";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.805 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.805 10.0415Z" fill="#FFC107"/>
    <path d="M3.15332 7.3455L6.43882 9.755C7.32782 7.554 9.48082 6 12.0003 6C13.5298 6 14.9213 6.577 15.9808 7.5195L18.8093 4.691C17.0233 3.0265 14.6343 2 12.0003 2C7.97782 2 4.50182 4.1905 3.15332 7.3455Z" fill="#FF3D00"/>
    <path d="M12.0002 22C14.5832 22 16.9302 21.0115 18.7047 19.404L15.6097 16.785C14.5718 17.5742 13.3038 18.001 12.0002 18C9.39916 18 7.19066 16.3415 6.35866 14.027L3.09766 16.5395C4.43166 19.778 7.94816 22 12.0002 22Z" fill="#4CAF50"/>
    <path d="M21.805 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L18.703 19.4045C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.805 10.0415Z" fill="#1976D2"/>
  </svg>
);

const GoogleAuthButton = ({ mode = "login" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const idToken = credentialResponse?.credential;

      if (!idToken) {
        toast.error("Google token not found. Please try again.");
        return;
      }

      const response = await googleLoginUser(idToken);

      const accessToken =
        response?.payload?.accessToken || response?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      const user = response?.payload?.user || response?.user;
      if (user) {
        dispatch(setUser(user));
      }

      toast.success(
        response?.payload?.isNewUser
          ? "Account created successfully!"
          : "Login successful!"
      );

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(
        error?.response?.data?.message || "Google login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => {
        setLoading(false);
        toast.error("Google login failed. Please try again.");
      }}
      render={(renderProps) => (
        <Button
          type="button"
          variant="outline"
          size="md"
          fullWidth
          disabled={renderProps.disabled || loading}
          onClick={renderProps.onClick}
          leftIcon={loading ? <FiLoader className="animate-spin" /> : <GoogleIcon />}
          className="!border-slate-300 !bg-white !text-slate-700 hover:!bg-slate-50"
        >
          {loading ? "Connecting..." : mode === "login" ? "Continue with Google" : "Sign up with Google"}
        </Button>
      )}
    />
  );
};

export default GoogleAuthButton;