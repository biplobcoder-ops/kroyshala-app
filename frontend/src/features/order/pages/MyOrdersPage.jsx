import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiPackage, FiArrowRight } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Alert from "../../../components/ui/Alert/Alert";
import Pagination from "../../../components/ui/Pagination/Pagination";
import OrderCard from "../components/OrderCard";
import OrderDetailsModal from "../components/OrderDetailsModal";
import {
  getMyOrders,
  clearOrderError,
} from "../store/orderSlice";

const ORDERS_PER_PAGE = 10;

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/orders" },
      });
      return;
    }

    dispatch(getMyOrders());

    return () => {
      dispatch(clearOrderError());
    };
  }, [dispatch, isAuthenticated, navigate]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  if (loading && (!orders || orders.length === 0)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 h-8 w-48 rounded bg-slate-200" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-slate-100 p-5"
            >
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="mt-3 h-10 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && (!orders || orders.length === 0)) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
            <FiPackage className="h-10 w-10 text-slate-400" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            No Orders Yet
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            You haven't placed any orders yet.
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

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);
  const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
  const endIndex = startIndex + ORDERS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          {orders.length} orders placed
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <Alert
            variant="error"
            title="Something went wrong"
            dismissible
            onClose={() => dispatch(clearOrderError())}
          >
            {error}
          </Alert>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {currentOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onView={handleViewOrder}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default MyOrdersPage;