import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiUsers,
  FiPackage,
  FiShoppingCart,
  FiGrid,
  FiTrendingUp,
  FiBarChart2,
  FiAlertTriangle,
  FiClock,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import Card from "../../../components/ui/Card/Card";
import Badge from "../../../components/ui/Badge/Badge";
import {
  fetchDashboardOverview,
  fetchRevenueAnalytics,
  fetchOrderStatusAnalytics,
  fetchProductPerformance,
  getAllOrders,
} from "../store/dashboardSlice";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];

const defaultRevenueData = [
  { name: "Jan", totalRevenue: 15000 },
  { name: "Feb", totalRevenue: 22000 },
  { name: "Mar", totalRevenue: 18000 },
  { name: "Apr", totalRevenue: 28000 },
  { name: "May", totalRevenue: 35000 },
  { name: "Jun", totalRevenue: 42000 },
];

const defaultOrderStatusData = [
  { name: "Pending", value: 30 },
  { name: "Confirmed", value: 25 },
  { name: "Shipped", value: 20 },
  { name: "Delivered", value: 40 },
  { name: "Cancelled", value: 10 },
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const {
    overview,
    revenueAnalytics,
    orderStatusAnalytics,
    productPerformance,
    orders,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardOverview());
    dispatch(fetchRevenueAnalytics("month"));
    dispatch(fetchOrderStatusAnalytics());
    dispatch(fetchProductPerformance());
    dispatch(getAllOrders({ page: 1, limit: 5 }));
  }, [dispatch]);

  const hasData =
    overview &&
    (overview.totalUsers > 0 ||
      overview.totalProducts > 0 ||
      overview.totalOrders > 0);

  const revenueData =
    revenueAnalytics?.length > 0 ? revenueAnalytics : defaultRevenueData;
  const orderStatusData =
    orderStatusAnalytics?.length > 0
      ? orderStatusAnalytics.map((s) => ({
          name: s._id?.charAt(0).toUpperCase() + s._id?.slice(1),
          value: s.count,
        }))
      : defaultOrderStatusData;

  // Low stock products
  const lowStockProducts =
    productPerformance?.filter((p) => p.stock <= 5) || [];

  const stats = [
    {
      id: "users",
      label: "Total Users",
      value: overview?.totalUsers ?? 0,
      icon: <FiUsers className="h-6 w-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      id: "products",
      label: "Total Products",
      value: overview?.totalProducts ?? 0,
      icon: <FiPackage className="h-6 w-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      id: "orders",
      label: "Total Orders",
      value: overview?.totalOrders ?? 0,
      icon: <FiShoppingCart className="h-6 w-6 text-orange-600" />,
      bg: "bg-orange-50",
    },
    {
      id: "categories",
      label: "Categories",
      value: overview?.totalCategories ?? 0,
      icon: <FiGrid className="h-6 w-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-5 transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="h-5 w-5 text-green-600" />
              <h2 className="font-semibold text-slate-900">Revenue Overview</h2>
            </div>
            <Badge variant="success" size="sm">Monthly</Badge>
          </div>
          {!hasData ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <FiBarChart2 className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-3 font-semibold text-slate-600">No revenue data</p>
              <p className="mt-1 text-sm text-slate-400">Once orders are placed, charts will appear here</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="totalRevenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Order Status Chart */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiShoppingCart className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold text-slate-900">Order Status</h2>
            </div>
            <Badge variant="info" size="sm">Live</Badge>
          </div>
          {!hasData ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
              <FiShoppingCart className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-3 font-semibold text-slate-600">No order data</p>
              <p className="mt-1 text-sm text-slate-400">Order statistics will show here</p>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiClock className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-slate-900">Recent Orders</h2>
            </div>
            <Link to="/admin/orders" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
              View All <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {orders?.length === 0 ? (
            <div className="py-8 text-center">
              <FiShoppingCart className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">No recent orders</p>
            </div>
          ) : (
            <div className="space-y-2">
              {orders?.slice(0, 5).map((order) => (
                <div key={order._id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                  <div>
                    <p className="text-sm font-mono">#{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-slate-500">{order.user?.name || "N/A"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">৳{order.totalPrice}</p>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusColors[order.orderStatus] || "bg-slate-100"}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Low Stock Alert */}
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiAlertTriangle className="h-5 w-5 text-red-600" />
              <h2 className="font-semibold text-slate-900">Low Stock Alert</h2>
            </div>
            <Badge variant="danger" size="sm">{lowStockProducts.length} items</Badge>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="py-8 text-center">
              <FiPackage className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">All products are well stocked</p>
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.slice(0, 5).map((product) => (
                <div key={product._id} className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3">
                  <div className="flex items-center gap-3">
                    {product.images?.[0]?.url && (
                      <img src={product.images[0].url} alt={product.name} className="h-8 w-8 rounded-lg object-cover" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                    </div>
                  </div>
                  <Badge variant="danger" size="sm">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;