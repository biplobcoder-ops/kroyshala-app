import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMapPin,
  FiTruck,
  FiCreditCard,
  FiXCircle,
  FiCheckCircle,
  FiPackage,
  FiShield,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";

import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderTimeline from "../components/OrderTimeline";

import {
  getSingleOrder,
  cancelOrder,
  confirmOrder,
  clearOrderError,
} from "../store/orderSlice";

// ==========================================
// Order Details Page
// ==========================================

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleOrder, loading, error } = useSelector(
    (state) => state.order
  );
  const { isAuthenticated, user } = useSelector((state) => state.auth); // ✅ user add

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/orders/${id}` } });
      return;
    }

    if (id) {
      dispatch(getSingleOrder(id));
    }

    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch, isAuthenticated, navigate, id]);

  // ==========================================
  // Cancel Order (User + Admin both)
  // ==========================================

  const handleCancelOrder = () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    dispatch(cancelOrder(id))
      .unwrap()
      .then(() => {
        toast.success("Order cancelled successfully!");
      })
      .catch((error) => {
        toast.error(error || "Failed to cancel order");
      });
  };

  // ==========================================
  // Confirm Order (Only Admin)
  // ==========================================

  const handleConfirmOrder = () => {
    dispatch(confirmOrder(id))
      .unwrap()
      .then(() => {
        toast.success("Order confirmed successfully!");
      })
      .catch((error) => {
        toast.error(error || "Failed to confirm order");
      });
  };

  // ==========================================
  // Loading State
  // ==========================================

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-slate-200" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              <div className="h-40 rounded-2xl bg-slate-200" />
              <div className="h-40 rounded-2xl bg-slate-200" />
            </div>
            <div className="h-60 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // Error State
  // ==========================================

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="error" title="Order not found" fullWidth>
          {error}
        </Alert>
        <div className="mt-4">
          <Link to="/orders">
            <Button variant="outline" size="sm" leftIcon={<FiArrowLeft />}>
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // No Order
  // ==========================================

  if (!singleOrder) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Alert variant="warning" title="Order not found" fullWidth>
          The order you are looking for does not exist.
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ==========================================
          Back Button + Header
      ========================================== */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/orders">
            <Button
              variant="outline"
              size="sm"
              rounded="full"
              className="!h-10 !w-10 !p-0"
            >
              <FiArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Order Details
            </h1>
            <p className="text-sm text-slate-500">
              #{singleOrder._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>

        <OrderStatusBadge status={singleOrder.orderStatus} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ==========================================
            Main Content
        ========================================== */}

        <div className="space-y-6 lg:col-span-2">
          {/* Order Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Order Status
            </h2>
            <OrderTimeline currentStatus={singleOrder.orderStatus} />
          </div>

          {/* Order Items */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Order Items
            </h2>

            <div className="space-y-4">
              {singleOrder.orderItems?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                      <FiPackage className="h-8 w-8 text-slate-400" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity} × ৳{item.price}
                    </p>
                  </div>

                  <p className="font-semibold text-slate-900">
                    ৳{item.quantity * item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <FiMapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">
                Shipping Address
              </h2>
            </div>

            <div className="space-y-1 text-sm text-slate-600">
              <p className="font-medium text-slate-900">
                {singleOrder.shippingAddress?.street}
              </p>
              <p>
                {singleOrder.shippingAddress?.city}
                {singleOrder.shippingAddress?.postalCode
                  ? ` - ${singleOrder.shippingAddress.postalCode}`
                  : ""}
              </p>
              <p>{singleOrder.shippingAddress?.country}</p>
            </div>
          </div>
        </div>

        {/* ==========================================
            Sidebar
        ========================================== */}

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Items Price</span>
                <span className="font-semibold text-slate-900">
                  ৳{singleOrder.itemsPrice}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Shipping</span>
                <span className="font-semibold text-slate-900">
                  {singleOrder.shippingPrice === 0
                    ? "Free"
                    : `৳${singleOrder.shippingPrice}`}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    ৳{singleOrder.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="mb-4 flex items-center gap-2">
              <FiCreditCard className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">Payment</h2>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Method</span>
                <span className="font-semibold uppercase text-slate-900">
                  {singleOrder.paymentMethod}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Status</span>
                {singleOrder.isPaid ? (
                  <span className="flex items-center gap-1 font-semibold text-green-600">
                    <FiCheckCircle className="h-4 w-4" />
                    Paid
                  </span>
                ) : (
                  <span className="font-semibold text-yellow-600">Unpaid</span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {/* ✅ Confirm Order - Only Admin */}
            {singleOrder.orderStatus === "pending" &&
              user?.role === "admin" && (
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  leftIcon={<FiCheckCircle />}
                  onClick={handleConfirmOrder}
                >
                  Confirm Order
                </Button>
              )}

            {/* Cancel Order - User & Admin */}
            {singleOrder.orderStatus === "pending" && (
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<FiXCircle />}
                onClick={handleCancelOrder}
                className="!text-red-600 hover:!bg-red-50"
              >
                Cancel Order
              </Button>
            )}

            {singleOrder.orderStatus === "confirmed" && (
              <Button
                type="button"
                variant="outline"
                size="md"
                fullWidth
                leftIcon={<FiXCircle />}
                onClick={handleCancelOrder}
                className="!text-red-600 hover:!bg-red-50"
              >
                Cancel Order
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              leftIcon={<FiTruck />}
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <FiShield className="h-3.5 w-3.5" />
              Secure payment & easy returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;