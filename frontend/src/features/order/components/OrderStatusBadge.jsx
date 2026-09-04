import React from "react";
import Badge from "../../../components/ui/Badge/Badge";

// ==========================================
// Order Status Badge Component
// ==========================================

const OrderStatusBadge = ({ status }) => {
  // Status wise badge config
  const statusConfig = {
    pending: {
      variant: "warning",
      label: "Pending",
    },
    confirmed: {
      variant: "info",
      label: "Confirmed",
    },
    processing: {
      variant: "info",
      label: "Processing",
    },
    shipped: {
      variant: "primary",
      label: "Shipped",
    },
    delivered: {
      variant: "success",
      label: "Delivered",
    },
    cancelled: {
      variant: "danger",
      label: "Cancelled",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} size="sm">
      {config.label}
    </Badge>
  );
};

export default OrderStatusBadge;