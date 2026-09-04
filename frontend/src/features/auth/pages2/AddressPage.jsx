import React, { useState } from "react";
import {
  FiMapPin,
  FiEdit3,
  FiSave,
  FiX,
  FiHome,
} from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Alert from "../../../components/ui/Alert/Alert";

// ==========================================
// Initial Address
// ==========================================

const INITIAL_ADDRESS = {
  street: "Mirpur Road",
  city: "Dhaka",
  postalCode: "1216",
  country: "Bangladesh",
};

// ==========================================
// Address Page
// ==========================================

const AddressPage = () => {
  const [address, setAddress] =
    useState(INITIAL_ADDRESS);

  const [formData, setFormData] =
    useState(INITIAL_ADDRESS);

  const [isEditing, setIsEditing] =
    useState(false);

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

    setSuccess("");
  };

  // ==========================================
  // Edit
  // ==========================================

  const handleEdit = () => {
    setFormData(address);
    setSuccess("");
    setIsEditing(true);
  };

  // ==========================================
  // Cancel
  // ==========================================

  const handleCancel = () => {
    setFormData(address);
    setSuccess("");
    setIsEditing(false);
  };

  // ==========================================
  // Save
  // ==========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    setAddress(formData);

    setSuccess(
      "Address updated successfully."
    );

    setIsEditing(false);
  };

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
            <FiMapPin className="h-5 w-5 text-blue-600" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              My Address
            </h1>

            <p className="mt-0.5 text-sm text-slate-500">
              Manage your delivery address.
            </p>
          </div>

        </div>

        {!isEditing && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<FiEdit3 />}
            onClick={handleEdit}
          >
            Edit
          </Button>
        )}

      </div>

      {/* Success */}

      {success && (
        <Alert
          variant="success"
          title="Success"
          dismissible={false}
        >
          {success}
        </Alert>
      )}

      {/* Address Card */}

      {!isEditing ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <FiHome className="h-5 w-5" />
            </div>

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-slate-900">
                  Delivery Address
                </h2>

                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  Default
                </span>
              </div>

              <div className="mt-4 space-y-1 text-sm text-slate-600">

                <p className="font-medium text-slate-800">
                  {address.street}
                </p>

                <p>
                  {address.city},{" "}
                  {address.postalCode}
                </p>

                <p>{address.country}</p>

              </div>

            </div>

          </div>

        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >

          {/* Form Header */}

          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

            <h2 className="font-semibold text-slate-900">
              Edit Delivery Address
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your current delivery information.
            </p>

          </div>

          {/* Form */}

          <div className="space-y-5 p-5 sm:p-6">

            <Input
              label="Street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              autoComplete="street-address"
            />

            <div className="grid gap-5 sm:grid-cols-2">

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />

              <Input
                label="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
              />

            </div>

            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              autoComplete="country-name"
            />

          </div>

          {/* Footer */}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">

            <Button
              type="button"
              variant="outline"
              leftIcon={<FiX />}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              leftIcon={<FiSave />}
            >
              Save Address
            </Button>

          </div>

        </form>
      )}

    </div>
  );
};

export default AddressPage;