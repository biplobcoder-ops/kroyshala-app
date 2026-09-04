import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiRefreshCw, FiPackage, FiEye, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Pagination from "../../../components/ui/Pagination/Pagination";
import TableSkeleton from "../components/TableSkeleton";
import OrderDetailsModal from "../components/OrderDetailsModal";
import {
  getAllOrders,
  updateOrderStatus,
  bulkUpdateOrderStatus,
  fetchSingleOrder,
} from "../store/dashboardSlice";

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, pagination, selectedOrder } = useSelector((state) => state.dashboard);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getAllOrders({ page: currentPage, limit: 10, orderStatus: statusFilter, search }));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, currentPage, statusFilter, search]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, orderStatus: status }))
      .unwrap()
      .then(() => toast.success("Order status updated!"))
      .catch((error) => toast.error(error));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(orders.map((o) => o._id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOne = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleBulkUpdate = () => {
    if (selectedOrders.length === 0) {
      toast.error("Select at least one order");
      return;
    }
    if (!bulkStatus) {
      toast.error("Select a status");
      return;
    }

    dispatch(bulkUpdateOrderStatus({ orderIds: selectedOrders, orderStatus: bulkStatus }))
      .unwrap()
      .then(() => {
        toast.success("Orders updated successfully!");
        setSelectedOrders([]);
        setBulkStatus("");
        dispatch(getAllOrders({ page: currentPage, limit: 10, orderStatus: statusFilter, search }));
      })
      .catch((error) => toast.error(error));
  };

  const handleViewOrder = (orderId) => {
    dispatch(fetchSingleOrder(orderId))
      .unwrap()
      .then(() => setShowModal(true))
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Orders Management</h1>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <Input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            leftIcon={<FiSearch />}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="">All Orders</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<FiRefreshCw />}
          onClick={() => dispatch(getAllOrders({ page: currentPage, limit: 10, orderStatus: statusFilter, search }))}
        >
          Refresh
        </Button>

        <span className="ml-auto text-sm text-slate-500">{pagination.totalItems} orders</span>
      </div>

      {selectedOrders.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-blue-50 p-3">
          <span className="text-sm font-medium text-blue-700">
            {selectedOrders.length} orders selected
          </span>
          <select
            value={bulkStatus}
            onChange={(e) => setBulkStatus(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          >
            <option value="">Select Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <Button type="button" variant="primary" size="sm" onClick={handleBulkUpdate}>
            Apply
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setSelectedOrders([])}>
            Clear
          </Button>
        </div>
      )}

      {loading && orders.length === 0 ? (
        <TableSkeleton rows={6} columns={5} />
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FiPackage className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-600">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === orders.length && orders.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 accent-blue-600"
                  />
                </th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOne(order._id)}
                      className="h-4 w-4 accent-blue-600"
                    />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3">{order.user?.name || "N/A"}</td>
                  <td className="px-4 py-3 font-semibold">৳{order.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      order.orderStatus === "delivered" ? "bg-green-100 text-green-700" :
                      order.orderStatus === "cancelled" ? "bg-red-100 text-red-700" :
                      order.orderStatus === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="!h-8 !w-8 !p-0"
                        onClick={() => handleViewOrder(order._id)}
                        title="View Details"
                      >
                        <FiEye className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {showModal && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default AdminOrdersPage;