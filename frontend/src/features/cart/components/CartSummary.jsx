import React from "react";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";

import Button from "../../../components/ui/Button/Button";

// ==========================================
// Cart Summary Component
// ==========================================

const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-bold text-slate-900">
        Order Summary
      </h2>

      <div className="mt-4 space-y-3">
        {/* Total Items */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Total Items
          </span>
          <span className="font-semibold text-slate-900">
            {totalItems}
          </span>
        </div>

        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Subtotal
          </span>
          <span className="font-semibold text-slate-900">
            ৳{totalPrice}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Shipping
          </span>
          <span className="text-sm font-medium text-green-600">
            Free
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200" />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            Total
          </span>
          <span className="text-xl font-bold text-slate-900">
            ৳{totalPrice}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        type="button"
        variant="primary"
        size="lg"
        fullWidth
        rightIcon={<FiArrowRight />}
        className="mt-6"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </Button>

      {/* Continue Shopping */}
      <Button
        type="button"
        variant="outline"
        size="md"
        fullWidth
        leftIcon={<FiShoppingCart />}
        className="mt-3"
        onClick={() => navigate("/products")}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default CartSummary;