import React from "react";
import { FiArrowRight, FiPackage } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import OrderStatusBadge from "./OrderStatusBadge";

const OrderCard = ({ order, onView }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-md">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs text-slate-500">Order ID</p>
          <p className="font-semibold text-slate-900">
            #{order._id?.slice(-8).toUpperCase()}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Date</p>
          <p className="font-semibold text-slate-900">
            {new Date(order.createdAt).toLocaleDateString("en-BD", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        <OrderStatusBadge status={order.orderStatus} />
      </div>

      {/* Order Items Preview */}
      <div className="mt-4 space-y-2">
        {order.orderItems?.slice(0, 3).map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                <FiPackage className="h-5 w-5 text-slate-400" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900">
                {item.name}
              </p>
              <p className="text-xs text-slate-500">
                Qty: {item.quantity} × ৳{item.price}
              </p>
            </div>
          </div>
        ))}

        {order.orderItems?.length > 3 && (
          <p className="text-xs text-slate-500">
            +{order.orderItems.length - 3} more items
          </p>
        )}
      </div>

      {/* Order Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Total</p>
          <p className="text-lg font-bold text-slate-900">
            ৳{order.totalPrice}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          rightIcon={<FiArrowRight />}
          onClick={() => onView?.(order)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;