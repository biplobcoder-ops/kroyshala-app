// src/features/admin/components/UserDetailsModal.jsx
import React from "react";
import { FiX, FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Avatar from "../../../components/ui/Avatar/Avatar";
import Badge from "../../../components/ui/Badge/Badge";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">User Details</h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="full"
            className="!h-8 !w-8 !p-0"
            onClick={onClose}
          >
            <FiX className="h-4 w-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Profile Header */}
          <div className="flex items-center gap-4">
            <Avatar
              src={user.image?.url || ""}
              name={user.name}
              size="lg"
              rounded="full"
              border
              shadow
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
              <p className="text-sm text-slate-500">{user.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={user.role === "admin" ? "danger" : "primary"} size="sm">
                  {user.role}
                </Badge>
                {user.isBanned ? (
                  <Badge variant="danger" size="sm">
                    <FiXCircle className="h-3 w-3" /> Banned
                  </Badge>
                ) : (
                  <Badge variant="success" size="sm">
                    <FiCheckCircle className="h-3 w-3" /> Active
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <FiMail className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-slate-600">Email:</span>
              <span className="text-sm font-medium text-slate-900">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="h-4 w-4 text-green-600" />
              <span className="text-sm text-slate-600">Phone:</span>
              <span className="text-sm font-medium text-slate-900">{user.phone || "N/A"}</span>
            </div>
            <div className="flex items-start gap-3">
              <FiMapPin className="h-4 w-4 mt-0.5 text-red-600" />
              <span className="text-sm text-slate-600">Address:</span>
              <span className="text-sm font-medium text-slate-900">
                {user.address?.street || "N/A"}, {user.address?.city || ""}{" "}
                {user.address?.postalCode || ""} {user.address?.country || ""}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-slate-600">Role:</span>
              <span className="text-sm font-medium text-slate-900 capitalize">{user.role}</span>
            </div>
            <div className="flex items-center gap-3">
              <FiUser className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-slate-600">User ID:</span>
              <span className="text-sm font-mono text-slate-900">{user._id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;