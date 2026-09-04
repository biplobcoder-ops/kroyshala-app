import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";

const ThankYouPage = () => {
  const { orderId } = useParams();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 text-center">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <FiCheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Thank You!
        </h1>
        <p className="mt-2 text-slate-600">
          Your order has been placed successfully.
        </p>

        {orderId && (
          <p className="mt-4 text-sm text-slate-500">
            Order ID:{" "}
            <span className="font-semibold text-slate-900">
              #{orderId.slice(-8).toUpperCase()}
            </span>
          </p>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/orders">
            <Button
              variant="primary"
              size="md"
              leftIcon={<FiPackage />}
            >
              View My Orders
            </Button>
          </Link>

          <Link to="/products">
            <Button
              variant="outline"
              size="md"
              leftIcon={<FiShoppingBag />}
              rightIcon={<FiArrowRight />}
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;