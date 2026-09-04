import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";

import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";

import {
  fetchCart,
  updateCartQuantity,
  removeFromCart,
  clearCartError,
} from "../store/cartSlice";

// ==========================================
// Cart Page
// ==========================================

const CartPage = () => {
  // ==========================================
  // Redux
  // ==========================================

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const items = cartState?.items || [];
  const totalPrice = cartState?.totalPrice || 0;
  const totalItems = cartState?.totalItems || 0;
  const loading = cartState?.loading || false;
  const error = cartState?.error || null;

  // ==========================================
  // Auth
  // ==========================================

  const { isAuthenticated } = useSelector((state) => state.auth);

  // ==========================================
  // Router
  // ==========================================

  const navigate = useNavigate();

  // ==========================================
  // Login Check + Fetch Cart
  // ==========================================

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/cart" },
        replace: true,
      });
      return;
    }

    dispatch(fetchCart());

    return () => {
      dispatch(clearCartError());
    };
  }, [dispatch, isAuthenticated, navigate]);

  // ==========================================
  // Update Quantity
  // ==========================================

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    dispatch(updateCartQuantity({ productId, quantity }))
      .unwrap()
      .then(() => {
        toast.success("Cart updated!");
      })
      .catch((error) => {
        toast.error(error || "Failed to update cart");
      });
  };

  // ==========================================
  // Remove Item
  // ==========================================

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => {
        toast.success("Product removed from cart!");
      })
      .catch((error) => {
        toast.error(error || "Failed to remove from cart");
      });
  };

  // ==========================================
  // Checkout
  // ==========================================

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // ==========================================
  // Filter Valid Items (product null না)
  // ==========================================

  const validItems = items.filter(
    (item) => item && item.product && item.product._id
  );

  // ==========================================
  // Loading State
  // ==========================================

  if (loading && validItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-4 rounded-2xl bg-slate-100 p-4"
            >
              <div className="h-24 w-24 rounded-lg bg-slate-200" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
                <div className="h-8 rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Empty Cart
  // ==========================================

  if (!loading && validItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <FiShoppingCart className="h-10 w-10 text-slate-400" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Looks like you haven't added any products to your cart yet.
          </p>

          <Button
            type="button"
            variant="primary"
            size="md"
            rightIcon={<FiArrowRight />}
            className="mt-6"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  // ==========================================
  // Render Cart
  // ==========================================

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Shopping Cart
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {totalItems} items in your cart
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4">
          <Alert
            variant="error"
            title="Something went wrong"
            dismissible
            onClose={() => dispatch(clearCartError())}
          >
            {error}
          </Alert>
        </div>
      )}

      {/* Cart Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {validItems.map((item) => (
            <CartItem
              key={item.product._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              loading={loading}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:sticky lg:top-24">
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;