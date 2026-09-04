import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Alert from "../../../components/ui/Alert/Alert";

import { fetchCart, clearCart } from "../../cart/store/cartSlice";
import { createOrder, clearOrderError } from "../store/orderSlice";
import { useAuth } from "../../auth/context/AuthContext";

const CheckoutPage = () => {
  const { loading: authLoading } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartState = useSelector((state) => state.cart);
  const items = cartState?.items || [];
  const totalPrice = cartState?.totalPrice || 0;
  const totalItems = cartState?.totalItems || 0;

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const orderState = useSelector((state) => state.order);
  const loading = orderState?.loading || false;
  const error = orderState?.error || null;

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cartFetched, setCartFetched] = useState(false);
  const orderPlaced = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    if (orderPlaced.current) return;

    const loadCart = async () => {
      try {
        await dispatch(fetchCart()).unwrap();
        setCartFetched(true);
      } catch (err) {
        console.error("Cart fetch failed:", err);
        navigate("/cart");
      }
    };

    loadCart();
  }, [dispatch, isAuthenticated, navigate, authLoading]);

  useEffect(() => {
    if (!cartFetched) return;
    if (orderPlaced.current) return;

    if (!items || items.length === 0) {
      navigate("/cart");
      return;
    }

    if (user?.address) {
      setShippingAddress({
        street: user.address.street || "",
        city: user.address.city || "",
        postalCode: user.address.postalCode || "",
        country: user.address.country || "Bangladesh",
      });
    }
  }, [cartFetched, items, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shippingAddress.street || !shippingAddress.city) {
      toast.error("Please provide complete shipping address");
      return;
    }

    try {
      const result = await dispatch(
        createOrder({
          shippingAddress,
          paymentMethod,
        })
      ).unwrap();

      orderPlaced.current = true;
      dispatch(clearCart());

      toast.success("Order placed successfully!");

      const orderId = result?.payload?.order?._id;
      if (orderId) {
        navigate(`/thank-you/${orderId}`, { replace: true });
      } else {
        navigate("/orders", { replace: true });
      }
    } catch (error) {
      console.error("Order creation failed:", error);

      if (
        error?.includes("token") ||
        error?.includes("login") ||
        error?.includes("Invalid") ||
        error?.includes("expired")
      ) {
        toast.error("Session expired. Please login again.");
        navigate("/login", { state: { from: "/checkout" } });
      } else {
        toast.error(error || "Failed to place order");
      }
    }
  };

  const shippingPrice = totalPrice > 5000 ? 0 : 60;
  const finalTotal = totalPrice + shippingPrice;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Checkout</h1>

      {error && (
        <div className="mb-4">
          <Alert variant="error" title="Something went wrong">
            {error}
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <FiMapPin className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Street Address"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleChange}
                  placeholder="House, Road, Area"
                  required
                  fullWidth
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="City"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    fullWidth
                  />

                  <Input
                    label="Postal Code"
                    name="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={handleChange}
                    placeholder="Postal Code"
                    fullWidth
                  />
                </div>

                <Input
                  label="Country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                  placeholder="Country"
                  fullWidth
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="mb-4 flex items-center gap-2">
                <FiCreditCard className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 transition ${
                    paymentMethod === "cod"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <FiTruck className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Cash on Delivery</p>
                    <p className="text-sm text-slate-500">Pay when you receive</p>
                  </div>
                  {paymentMethod === "cod" && (
                    <FiCheckCircle className="ml-auto h-5 w-5 text-blue-600" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 transition ${
                    paymentMethod === "bkash"
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <FiCreditCard className="h-5 w-5 text-pink-600" />
                  <div>
                    <p className="font-semibold text-slate-900">bKash Payment</p>
                    <p className="text-sm text-slate-500">Pay with bKash</p>
                  </div>
                  {paymentMethod === "bkash" && (
                    <FiCheckCircle className="ml-auto h-5 w-5 text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Items ({totalItems})</span>
                  <span className="font-semibold text-slate-900">৳{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-600">Shipping</span>
                  <span className="font-semibold text-slate-900">
                    {shippingPrice === 0 ? "Free" : `৳${shippingPrice}`}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-slate-900">
                      ৳{finalTotal}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                className="mt-6"
                loading={loading}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;