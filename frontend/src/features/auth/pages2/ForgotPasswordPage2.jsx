import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import validateForm from "../../../utils/validateForm";
import { forgotPasswordSchema2 } from "../schemas2/forgotPasswordSchema2";
import { forgotPassword } from "../services/authApi2"; // ✅ Fixed spelling

const ForgotPasswordPage2 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({});
    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const validationResult = validateForm(forgotPasswordSchema2, formData);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    try {
      setLoading(true);
      const response = await forgotPassword(validationResult.data.email);
      setSuccessMessage(
        response.message || "Password reset link sent to your email."
      );
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Failed to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Forgot Password?
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Enter your email address and we'll send you a password reset link
          </p>
        </div>

        {serverError && (
          <div className="mb-4">
            <Alert
              variant="error"
              title="Send forgot password link failed"
              onClose={() => setServerError("")}
              dismissible
            >
              {serverError}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="mb-4">
            <Alert
              variant="success"
              title="Link sent successfully"
              onClose={() => setSuccessMessage("")}
              dismissible
            >
              {successMessage}
            </Alert>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
            value={formData.email}
            errorMessage={errors.email}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            fullWidth
            className="mt-5"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-sm mt-4 text-center">
            <span className="text-slate-500 font-medium">
              Remember your password?
            </span>{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </div>

          <div className="text-sm mt-3 text-center">
            <span className="text-slate-500 font-medium">
              Don't have an account?{" "}
            </span>
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage2;