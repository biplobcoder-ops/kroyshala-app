import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiPhone, FiMapPin, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import GoogleAuthButton from "../../../components/common/GoogleAuthButton";

import validateForm from "../../../utils/validateForm";
import { registerSchema2 } from "../schemas2/registerSchema2";
import { registerUser } from "../services/authApi2";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "Bangladesh",
    },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const filterFields = ["street", "city", "postalCode", "country"];

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (filterFields.includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors({});
    setServerError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setServerError("");
    setSuccessMessage("");

    const validationResult = validateForm(registerSchema2, formData);
    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...userData } = formData;
      const response = await registerUser(userData);
      setSuccessMessage(response.message || "Registration successful!");
      navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      setServerError(error.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl bg-white shadow-sm p-5 sm:p-8 lg:p-10">
          <div className="mb-5 text-center">
            <h1 className="text-2xl font-bold mb-2">Create your Account</h1>
            <p className="text-sm text-slate-600">
              Create your Kroyshala account to continue shopping
            </p>
          </div>

          {serverError && (
            <div className="mb-6">
              <Alert variant="error" title="Registration failed" dismissible onClose={() => setServerError("")}>
                {serverError}
              </Alert>
            </div>
          )}

          {successMessage && (
            <div className="mb-6">
              <Alert variant="success" title="Registration successful" dismissible onClose={() => setSuccessMessage("")}>
                {successMessage}
              </Alert>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="space-y-3">
              <h3 className="font-semibold">Personal Information</h3>

              <Input
                type="text"
                label="Name"
                placeholder="Enter Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                errorMessage={errors.name}
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiUser />}
              />

              <Input
                type="email"
                label="Email"
                placeholder="Enter Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                errorMessage={errors.email}
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiMail />}
              />

              <Input
                type="tel"
                label="Phone"
                placeholder="Enter Your Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                errorMessage={errors.phone}
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiPhone />}
              />
            </div>

            {/* Security */}
            <div className="space-y-3">
              <h3 className="font-semibold">Security</h3>

              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                errorMessage={errors.password}
                passwordToggle
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiLock />}
              />

              <Input
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                errorMessage={errors.confirmPassword}
                passwordToggle
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiLock />}
              />
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h3 className="font-semibold">Address</h3>

              <Input
                type="text"
                label="Street"
                name="street"
                placeholder="Street"
                value={formData.address.street}
                onChange={handleChange}
                errorMessage={errors.address?.street}
                required
                fullWidth
                disabled={loading}
                leftIcon={<FiMapPin />}
              />

              <Input
                type="text"
                label="City"
                name="city"
                placeholder="City name"
                value={formData.address.city}
                onChange={handleChange}
                errorMessage={errors.address?.city}
                required
                fullWidth
                disabled={loading}
              />

              <Input
                type="text"
                label="Postal Code"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.address.postalCode}
                onChange={handleChange}
                errorMessage={errors.address?.postalCode}
                required
                disabled={loading}
                fullWidth
              />

              <Input
                type="text"
                label="Country"
                name="country"
                placeholder="Country"
                value={formData.address.country}
                onChange={handleChange}
                errorMessage={errors.address?.country}
                required
                disabled={loading}
                fullWidth
              />
            </div>

            <Button type="submit" disabled={loading} fullWidth>
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Google Sign Up */}
          <div className="mt-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-slate-500">Or sign up with</span>
              </div>
            </div>
            <GoogleAuthButton mode="register" />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-slate-700">
              Already have account?{" "}
              <Link className="text-sm text-blue-600 font-semibold cursor-pointer" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;