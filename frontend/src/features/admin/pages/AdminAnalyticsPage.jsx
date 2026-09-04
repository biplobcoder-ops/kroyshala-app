import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiTrendingUp,
  FiShoppingCart,
  FiDollarSign,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../../../components/ui/Card/Card";
import Alert from "../../../components/ui/Alert/Alert";
import {
  fetchMonthlySales,
  fetchOrderStatistics,
  fetchRevenueStatistics,
  fetchSalesAnalytics,
  fetchCustomerAnalytics,
} from "../store/dashboardSlice";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const AdminAnalyticsPage = () => {
  const dispatch = useDispatch();
  const {
    monthlySales,
    orderStats,
    revenueStats,
    salesAnalytics,
    customerAnalytics,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const [period, setPeriod] = useState("month");

  useEffect(() => {
    dispatch(fetchMonthlySales());
    dispatch(fetchOrderStatistics());
    dispatch(fetchRevenueStatistics());
    dispatch(fetchSalesAnalytics(period));
    dispatch(fetchCustomerAnalytics());
  }, [dispatch, period]);

  const monthlySalesData =
    monthlySales?.map((item) => ({
      name: `${item._id?.year}-${item._id?.month}`,
      totalOrders: item.totalOrders,
      totalSales: item.totalSales,
      totalItems: item.totalItems,
    })) || [];

  const salesData =
    salesAnalytics?.map((item) => ({
      name: String(item._id),
      totalOrders: item.totalOrders,
      totalItems: item.totalItems,
    })) || [];

  const topCustomers = customerAnalytics?.topCustomers || [];

  const orderStatCards = [
    { label: "Total Orders", value: orderStats?.totalOrders ?? 0, icon: <FiShoppingCart className="h-5 w-5 text-blue-600" />, bg: "bg-blue-50" },
    { label: "Pending", value: orderStats?.pendingOrders ?? 0, icon: <FiBarChart2 className="h-5 w-5 text-yellow-600" />, bg: "bg-yellow-50" },
    { label: "Delivered", value: orderStats?.deliveredOrders ?? 0, icon: <FiTrendingUp className="h-5 w-5 text-green-600" />, bg: "bg-green-50" },
    { label: "Cancelled", value: orderStats?.cancelledOrders ?? 0, icon: <FiShoppingCart className="h-5 w-5 text-red-600" />, bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h1>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>

      {error && (
        <Alert variant="error" title="Something went wrong" dismissible>
          {error}
        </Alert>
      )}

      {revenueStats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                <FiDollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Revenue</p>
                <p className="text-lg font-bold">৳{revenueStats.totalRevenue}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                <FiTrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg Order Value</p>
                <p className="text-lg font-bold">৳{Math.round(revenueStats.averageOrderValue)}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
                <FiShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Max Order</p>
                <p className="text-lg font-bold">৳{revenueStats.maxOrder}</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
                <FiShoppingCart className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Min Order</p>
                <p className="text-lg font-bold">৳{revenueStats.minOrder}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderStatCards.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <FiBarChart2 className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-slate-900">Monthly Sales Overview</h2>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySalesData}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSales" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Sales (৳)" />
              <Bar dataKey="totalOrders" fill="#10B981" radius={[6, 6, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center gap-2">
          <FiTrendingUp className="h-5 w-5 text-green-600" />
          <h2 className="font-semibold text-slate-900">Sales Analytics ({period})</h2>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalOrders" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} name="Orders" />
              <Line type="monotone" dataKey="totalItems" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} name="Items" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {customerAnalytics && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <FiUsers className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold text-slate-900">Customer Overview</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">Total Customers</span>
                <span className="font-bold">{customerAnalytics.totalCustomers}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-slate-50 p-3">
                <span className="text-sm text-slate-600">New Customers (This Month)</span>
                <span className="font-bold">{customerAnalytics.newCustomersThisMonth}</span>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <FiUsers className="h-5 w-5 text-orange-600" />
              <h2 className="font-semibold text-slate-900">Top Customers</h2>
            </div>
            <div className="space-y-3">
              {topCustomers.length > 0 ? (
                topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <div>
                      <p className="text-sm font-medium">{customer.user?.name}</p>
                      <p className="text-xs text-slate-500">{customer.user?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">৳{customer.totalSpent}</p>
                      <p className="text-xs text-slate-500">{customer.totalOrders} orders</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No customer data</p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminAnalyticsPage;