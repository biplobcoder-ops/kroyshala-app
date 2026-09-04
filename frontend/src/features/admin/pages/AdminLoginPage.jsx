import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiShield, FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import { loginUser } from "../../auth/services/authApi2";
import { setUser } from "../../auth/store/authSlice2";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser(formData);

      const user = response?.payload?.user || response?.user;

      // Admin check
      if (user?.role !== "admin") {
        setError("Access denied. Admin only.");
        return;
      }

      const accessToken = response?.payload?.accessToken || response?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      dispatch(setUser(user));
      toast.success("Welcome back, Admin!");

      // Direct dashboard-এ redirect
      navigate("/admin", { replace: true });
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <FiShield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-400">Kroyshala Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          {error && (
            <div className="mb-4">
              <Alert variant="error" title="Login failed" dismissible onClose={() => setError("")}>
                {error}
              </Alert>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              leftIcon={<FiMail />}
              fullWidth
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              passwordToggle
              leftIcon={<FiLock />}
              fullWidth
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Admin"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;