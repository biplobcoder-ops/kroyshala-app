import React from "react";

const MyOrdersPage = () => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">
        My Orders
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Your orders will appear here.
      </p>

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <p className="text-sm font-medium text-slate-600">
          Order management is coming next.
        </p>
      </div>
    </div>
  );
};

export default MyOrdersPage;