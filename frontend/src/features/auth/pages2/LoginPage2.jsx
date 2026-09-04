import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import GoogleAuthButton from "../../../components/common/GoogleAuthButton";

import validateForm from "../../../utils/validateForm";
import { loginSchema2 } from "../schemas2/loginSchema";
import { loginUser } from "../services/authApi2";
import { setUser } from "../store/authSlice2";

const LoginPage2 = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from || "/";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setServerError("");

    const validationResult = validateForm(loginSchema2, formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(validationResult.data);

      const accessToken = response?.payload?.accessToken || response?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      const loggedInUser = response?.payload?.user || response?.user;
      if (loggedInUser) {
        dispatch(setUser(loggedInUser));
      }

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      setServerError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-sm text-slate-700">Login to your Kroyshala account to continue</p>
        </div>

        {serverError && (
          <div className="mb-5">
            <Alert variant="error" title="Login failed" onClose={() => setServerError("")} dismissible>
              {serverError}
            </Alert>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            errorMessage={errors.email}
            required
            disabled={loading}
            autoComplete="email"
            leftIcon={<FiMail />}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            errorMessage={errors.password}
            required
            disabled={loading}
            passwordToggle
            autoComplete="current-password"
            leftIcon={<FiLock />}
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm font-semibold text-blue-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" disabled={loading} loading={loading} fullWidth className="cursor-pointer">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Google Login */}
        <div className="mt-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-500">Or continue with</span>
            </div>
          </div>
          <GoogleAuthButton mode="login" />
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-slate-600">Don't have an account? </span>
          <Link to="/register" className="font-semibold text-blue-700 hover:underline">
            Create an account
          </Link>
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center text-xs text-slate-500">
          <p>Demo Login:</p>
          <p className="font-medium text-slate-700">customer@example.com / Password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage2;