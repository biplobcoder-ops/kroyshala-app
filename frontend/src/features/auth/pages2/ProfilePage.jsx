import React from "react";

import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiUser,
  FiEdit3,
} from "react-icons/fi";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "../../../components/ui/Avatar/Avatar";
import Button from "../../../components/ui/Button/Button";

// ==========================================
// Profile Info
// ==========================================

const ProfileInfo = ({
  icon,
  label,
  value,
  secondary = "",
  truncate = false,
}) => {
  return (
    <div className="flex items-start gap-3">
      {/* Icon */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-slate-100
          text-slate-600
        "
      >
        {React.cloneElement(icon, {
          className: "h-5 w-5",
        })}
      </div>

      {/* Content */}

      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">
          {label}
        </p>

        <p
          className={`
            mt-1
            text-sm
            font-semibold
            text-slate-800
            ${truncate ? "truncate" : ""}
          `}
        >
          {value}
        </p>

        {secondary && (
          <p className="mt-0.5 text-xs text-slate-500">
            {secondary}
          </p>
        )}
      </div>
    </div>
  );
};

// ==========================================
// Profile Page
// ==========================================

const ProfilePage = () => {
  const user = useSelector(
    (state) => state.auth.user
  );

  const navigate = useNavigate();

  // ==========================================
  // No User
  // ==========================================

  if (!user) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          User profile not found.
        </p>
      </div>
    );
  }

  // ==========================================
  // Render
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      {/* ======================================
          Profile Header
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
        <div
          className="
            flex
            flex-col
            gap-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* User */}

          <div
            className="
              flex
              flex-col
              items-center
              gap-4
              sm:flex-row
            "
          >
            <Avatar
              src={user.image?.url || ""}
              name={user.name}
              size="xl"
              rounded="full"
              border
              shadow
            />

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {user.email}
              </p>

              {user.role && (
                <span
                  className="
                    mt-3
                    inline-flex
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    capitalize
                    text-blue-700
                  "
                >
                  {user.role}
                </span>
              )}
            </div>
          </div>

          {/* Edit Button */}

          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={<FiEdit3 />}
            onClick={() =>
              navigate("/account/profile/edit")
            }
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* ======================================
          Account Information
      ====================================== */}

      <div className="px-6 py-6 sm:px-8">
        <h3
          className="
            mb-5
            text-lg
            font-semibold
            text-slate-900
          "
        >
          Account Information
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Name */}

          <ProfileInfo
            icon={<FiUser />}
            label="Full Name"
            value={user.name || "Not provided"}
          />

          {/* Email */}

          <ProfileInfo
            icon={<FiMail />}
            label="Email"
            value={user.email || "Not provided"}
            truncate
          />

          {/* Phone */}

          <ProfileInfo
            icon={<FiPhone />}
            label="Phone"
            value={
              user.phone || "Not provided"
            }
          />

          {/* Address */}

          <ProfileInfo
            icon={<FiMapPin />}
            label="Address"
            value={
              user.address?.street ||
              user.address?.city ||
              "Not provided"
            }
            secondary={
              user.address?.city
                ? `${user.address.city}${
                    user.address.postalCode
                      ? ` - ${user.address.postalCode}`
                      : ""
                  }`
                : ""
            }
          />

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;