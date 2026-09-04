import React from "react";
import { FiX, FiMapPin, FiCreditCard, FiUser, FiPackage } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Badge from "../../../components/ui/Badge/Badge";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Order Details</h2>
            <p className="text-xs text-slate-500">#{order._id?.slice(-8).toUpperCase()}</p>
          </div>
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
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.orderStatus] || "bg-slate-100"}`}>
              {order.orderStatus}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Customer Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FiUser className="h-4 w-4 text-blue-600" /> Customer
            </h3>
            <p className="text-sm font-medium">{order.user?.name || "N/A"}</p>
            <p className="text-xs text-slate-500">{order.user?.email}</p>
            <p className="text-xs text-slate-500">{order.user?.phone}</p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FiPackage className="h-4 w-4 text-blue-600" /> Order Items
            </h3>
            <div className="space-y-2">
              {order.orderItems?.map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity} × ৳{item.price}</p>
                  </div>
                  <p className="text-sm font-semibold">৳{item.quantity * item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FiMapPin className="h-4 w-4 text-blue-600" /> Shipping Address
            </h3>
            <p className="text-sm">{order.shippingAddress?.street}</p>
            <p className="text-sm">{order.shippingAddress?.city} - {order.shippingAddress?.postalCode}</p>
            <p className="text-sm">{order.shippingAddress?.country}</p>
          </div>

          {/* Payment Info */}
          <div className="rounded-xl bg-slate-50 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <FiCreditCard className="h-4 w-4 text-blue-600" /> Payment
            </h3>
            <div className="space-y-1 text-sm">
              <p>Method: <span className="font-semibold uppercase">{order.paymentMethod}</span></p>
              <p>Status: {order.isPaid ? "Paid" : "Unpaid"}</p>
              <p>Items Price: ৳{order.itemsPrice}</p>
              <p>Shipping: ৳{order.shippingPrice}</p>
              <p className="text-base font-bold">Total: ৳{order.totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;