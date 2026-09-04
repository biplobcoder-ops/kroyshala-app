import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "../Button/Button";

const ConfirmDialog = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
            isDanger ? "bg-red-50" : "bg-yellow-50"
          }`}
        >
          <FiAlertTriangle
            className={`h-7 w-7 ${isDanger ? "text-red-600" : "text-yellow-600"}`}
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-bold text-slate-900">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-center text-sm leading-relaxed text-slate-500">
          {message}
        </p>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onCancel}
            disabled={loading}
            className="w-full"
          >
            {cancelLabel}
          </Button>

          <Button
            type="button"
            variant={isDanger ? "danger" : "primary"}
            size="md"
            onClick={onConfirm}
            loading={loading}
            disabled={loading}
            className="w-full"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;