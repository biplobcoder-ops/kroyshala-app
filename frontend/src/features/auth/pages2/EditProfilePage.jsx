import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiCamera,
  FiX,
  FiSave,
} from "react-icons/fi";

import {
  useDispatch,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import Avatar from "../../../components/ui/Avatar/Avatar";
import Alert from "../../../components/ui/Alert/Alert";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";

import {
  getCurrentUser,
  updateProfile,
} from "../services/authApi2";

import {
  updateUser,
} from "../store/authSlice2";

// ==========================================
// Initial Form Data
// ==========================================

const INITIAL_FORM_DATA = {
  name: "",
  phone: "",

  address: {
    street: "",
    city: "",
    postalCode: "",
    country: "",
  },
};

// ==========================================
// Convert User → Form Data
// ==========================================

const getFormDataFromUser = (user) => ({
  name: user?.name || "",

  phone: user?.phone || "",

  address: {
    street:
      user?.address?.street || "",

    city:
      user?.address?.city || "",

    postalCode:
      user?.address?.postalCode || "",

    country:
      user?.address?.country || "",
  },
});

// ==========================================
// Edit Profile Page
// ==========================================

const EditProfilePage = () => {
  // ==========================================
  // Redux
  // ==========================================

  const dispatch = useDispatch();

  // ==========================================
  // Navigation
  // ==========================================

  const navigate = useNavigate();

  // ==========================================
  // User State
  // ==========================================

  const [user, setUser] = useState(null);

  // ==========================================
  // Form State
  // ==========================================

  const [formData, setFormData] = useState(
    INITIAL_FORM_DATA
  );

  // ==========================================
  // Image State
  // ==========================================

  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const fileInputRef = useRef(null);

  // ==========================================
  // UI State
  // ==========================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  // ==========================================
  // Fetch Current User
  // ==========================================

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getCurrentUser();

        const currentUser =
          response.payload.user;

        // Local user
        setUser(currentUser);

        // Redux
        dispatch(
          updateUser(currentUser)
        );

        // Form
        setFormData(
          getFormDataFromUser(
            currentUser
          )
        );

        // Existing image
        setImagePreview(
          currentUser.image?.url || ""
        );
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load your profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  // ==========================================
  // Cleanup Image Preview
  // ==========================================

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          imagePreview
        );
      }
    };
  }, [imagePreview]);

  // ==========================================
  // Handle Input Change
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    const addressFields = [
      "street",
      "city",
      "postalCode",
      "country",
    ];

    // Address
    if (
      addressFields.includes(name)
    ) {
      setFormData((previous) => ({
        ...previous,

        address: {
          ...previous.address,
          [name]: value,
        },
      }));

      return;
    }

    // Normal field
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // Image Change
  // ==========================================

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // Image type
    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image file."
      );

      return;
    }

    // Image size
    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5MB."
      );

      return;
    }

    setError("");
    setSuccess("");

    setImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // ==========================================
  // Choose Image
  // ==========================================

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  // ==========================================
  // Cancel
  // ==========================================

  const handleCancel = () => {
    navigate("/account/profile");
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      // ========================================
      // FormData
      // ========================================

      const data = new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "phone",
        formData.phone
      );

      // Address
      data.append(
        "address[street]",
        formData.address.street
      );

      data.append(
        "address[city]",
        formData.address.city
      );

      data.append(
        "address[postalCode]",
        formData.address.postalCode
      );

      data.append(
        "address[country]",
        formData.address.country
      );

      // Image
      if (image) {
        data.append(
          "image",
          image
        );
      }

      // ========================================
      // API
      // ========================================

      const response =
        await updateProfile(data);

      const updatedUser =
        response.payload.user;

      // ========================================
      // Local State
      // ========================================

      setUser(updatedUser);

      // ========================================
      // Redux
      // ========================================

      dispatch(
        updateUser(updatedUser)
      );

      // ========================================
      // Form
      // ========================================

      setFormData(
        getFormDataFromUser(
          updatedUser
        )
      );

      // ========================================
      // Image
      // ========================================

      setImage(null);

      setImagePreview(
        updatedUser.image?.url || ""
      );

      // ========================================
      // Success
      // ========================================

      setSuccess(
        response.message ||
          "Profile updated successfully."
      );

      // ========================================
      // Go Back Profile
      // ========================================

      navigate(
        "/account/profile",
        {
          replace: true,
          state: {
            success:
              response.message ||
              "Profile updated successfully.",
          },
        }
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex animate-pulse items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-slate-200" />

          <div className="space-y-2">
            <div className="h-5 w-40 rounded bg-slate-200" />

            <div className="h-4 w-56 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // User Not Found
  // ==========================================

  if (!user) {
    return (
      <Alert
        variant="error"
        title="Unable to load profile"
        dismissible={false}
      >
        {error ||
          "User profile not found."}
      </Alert>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
      "
    >
      {/* ======================================
          Header
      ====================================== */}

      <div
        className="
          border-b
          border-slate-200
          px-6
          py-6
          sm:px-8
        "
      >
        <h1 className="text-xl font-bold text-slate-900">
          Edit Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Update your personal information.
        </p>
      </div>

      {/* ======================================
          Alerts
      ====================================== */}

      {error && (
        <div className="px-6 pt-6 sm:px-8">
          <Alert
            variant="error"
            title="Something went wrong"
            dismissible={false}
          >
            {error}
          </Alert>
        </div>
      )}

      {success && (
        <div className="px-6 pt-6 sm:px-8">
          <Alert
            variant="success"
            title="Success"
            dismissible={false}
          >
            {success}
          </Alert>
        </div>
      )}

      {/* ======================================
          Form Body
      ====================================== */}

      <div className="space-y-6 px-6 py-6 sm:px-8">

        {/* Profile Image */}

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Profile Image
          </label>

          <div className="flex items-center gap-5">
            <Avatar
              src={imagePreview}
              name={formData.name}
              size="xl"
              rounded="full"
              border
              shadow
            />

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<FiCamera />}
                onClick={
                  handleChooseImage
                }
                disabled={saving}
              >
                Choose Image
              </Button>

              <p className="mt-2 text-xs text-slate-500">
                JPG, PNG or WEBP. Maximum
                5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Name */}

        <Input
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          disabled={saving}
          autoComplete="name"
          leftIcon={<FiUser />}
        />

        {/* Email */}

        <Input
          label="Email"
          type="email"
          value={user.email}
          disabled
          autoComplete="email"
          leftIcon={<FiMail />}
          helperText="Email address cannot be changed here."
        />

        {/* Phone */}

        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={saving}
          autoComplete="tel"
          leftIcon={<FiPhone />}
        />

        {/* Address */}

        <div>
          <div className="mb-4">
            <h2 className="text-base font-semibold text-slate-900">
              Address
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your delivery address.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            {/* Street */}

            <div className="sm:col-span-2">
              <Input
                label="Street"
                name="street"
                type="text"
                value={
                  formData.address
                    .street
                }
                onChange={handleChange}
                disabled={saving}
                autoComplete="street-address"
                leftIcon={<FiMapPin />}
              />
            </div>

            {/* City */}

            <Input
              label="City"
              name="city"
              type="text"
              value={
                formData.address.city
              }
              onChange={handleChange}
              disabled={saving}
              autoComplete="address-level2"
            />

            {/* Postal Code */}

            <Input
              label="Postal Code"
              name="postalCode"
              type="text"
              value={
                formData.address
                  .postalCode
              }
              onChange={handleChange}
              disabled={saving}
              autoComplete="postal-code"
            />

            {/* Country */}

            <div className="sm:col-span-2">
              <Input
                label="Country"
                name="country"
                type="text"
                value={
                  formData.address.country
                }
                onChange={handleChange}
                disabled={saving}
                autoComplete="country-name"
              />
            </div>

          </div>
        </div>

      </div>

      {/* ======================================
          Footer
      ====================================== */}

      <div
        className="
          flex
          flex-col-reverse
          gap-3
          border-t
          border-slate-200
          bg-slate-50
          px-6
          py-4
          sm:flex-row
          sm:justify-end
          sm:px-8
        "
      >
        {/* Cancel */}

        <Button
          type="button"
          variant="outline"
          size="md"
          leftIcon={<FiX />}
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </Button>

        {/* Save */}

        <Button
          type="submit"
          variant="primary"
          size="md"
          leftIcon={
            saving ? null : <FiSave />
          }
          loading={saving}
          disabled={saving}
        >
          {saving
            ? "Updating..."
            : "Update Profile"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfilePage;