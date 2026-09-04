import React from "react";

const OrderStatusPage = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">
        Order Status
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Track your order status here.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-sm font-medium text-slate-600">
          Order tracking will be connected later.
        </p>
      </div>
    </div>
  );
};

export default OrderStatusPage;