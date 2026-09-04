import React, { useState } from "react";
import {
  FiLock,
  FiEye,
  FiEyeOff,
  FiSave,
  FiShield,
} from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Alert from "../../../components/ui/Alert/Alert";

// ==========================================
// Initial Form
// ==========================================

const INITIAL_FORM = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

// ==========================================
// Change Password Page
// ==========================================

const ChangePasswordPage = () => {
  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // Change
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    // ========================================
    // Basic Frontend Validation
    // ========================================

    if (!formData.currentPassword) {
      setError(
        "Please enter your current password."
      );
      return;
    }

    if (formData.newPassword.length < 8) {
      setError(
        "New password must be at least 8 characters."
      );
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    // ========================================
    // Demo Only
    // ========================================

    console.log(
      "Password change form:",
      formData
    );

    setSuccess(
      "Password form submitted successfully. API integration will be added later."
    );

    setFormData(INITIAL_FORM);
  };

  // ==========================================
  // Password Strength
  // ==========================================

  const passwordLength =
    formData.newPassword.length;

  const passwordStrength =
    passwordLength === 0
      ? "Enter a new password"
      : passwordLength < 8
      ? "Weak password"
      : passwordLength < 12
      ? "Good password"
      : "Strong password";

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <FiLock className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Change Password
          </h1>

          <p className="mt-0.5 text-sm text-slate-500">
            Keep your account secure with a strong password.
          </p>
        </div>

      </div>

      {/* Alerts */}

      {error && (
        <Alert
          variant="error"
          title="Something went wrong"
          dismissible={false}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          variant="success"
          title="Success"
          dismissible={false}
        >
          {success}
        </Alert>
      )}

      {/* Security Card */}

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

        <div className="flex items-start gap-3">

          <FiShield className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div>
            <h2 className="text-sm font-semibold text-blue-900">
              Password Security
            </h2>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Use at least 8 characters. A combination
              of uppercase letters, lowercase letters,
              numbers and symbols is recommended.
            </p>
          </div>

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >

        {/* Form Header */}

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <h2 className="font-semibold text-slate-900">
            Update Password
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter your current password and choose a new one.
          </p>

        </div>

        {/* Body */}

        <div className="space-y-5 p-5 sm:p-6">

          {/* Current Password */}

          <div className="relative">

            <Input
              label="Current Password"
              name="currentPassword"
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              value={
                formData.currentPassword
              }
              onChange={handleChange}
              autoComplete="current-password"
              leftIcon={<FiLock />}
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  (previous) => !previous
                )
              }
              className="absolute right-3 top-[38px] text-slate-400 transition hover:text-slate-700"
              aria-label={
                showCurrent
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showCurrent ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>

          {/* New Password */}

          <div className="relative">

            <Input
              label="New Password"
              name="newPassword"
              type={
                showNew
                  ? "text"
                  : "password"
              }
              value={
                formData.newPassword
              }
              onChange={handleChange}
              autoComplete="new-password"
              leftIcon={<FiLock />}
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(
                  (previous) => !previous
                )
              }
              className="absolute right-3 top-[38px] text-slate-400 transition hover:text-slate-700"
              aria-label={
                showNew
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showNew ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>

          {/* Password Strength */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <span className="text-xs font-medium text-slate-500">
                Password strength
              </span>

              <span className="text-xs font-semibold text-slate-600">
                {passwordStrength}
              </span>

            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  ${
                    passwordLength === 0
                      ? "w-0"
                      : passwordLength < 8
                      ? "w-1/3 bg-red-500"
                      : passwordLength < 12
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-500"
                  }
                `}
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div className="relative">

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              autoComplete="new-password"
              leftIcon={<FiLock />}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  (previous) => !previous
                )
              }
              className="absolute right-3 top-[38px] text-slate-400 transition hover:text-slate-700"
              aria-label={
                showConfirm
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirm ? (
                <FiEyeOff />
              ) : (
                <FiEye />
              )}
            </button>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">

          <Button
            type="submit"
            variant="primary"
            leftIcon={<FiSave />}
          >
            Change Password
          </Button>

        </div>

      </form>

    </div>
  );
};

export default ChangePasswordPage;