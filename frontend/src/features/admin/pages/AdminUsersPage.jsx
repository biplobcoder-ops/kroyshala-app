// src/features/admin/pages/AdminUsersPage.jsx (Updated with Eye Icon + Modal)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiTrash2, FiUsers, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Pagination from "../../../components/ui/Pagination/Pagination";
import TableSkeleton from "../components/TableSkeleton";
import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";
import UserDetailsModal from "../components/UserDetailsModal";
import { getAllUsers, banUser, unbanUser, deleteUser } from "../store/dashboardSlice";

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, userPagination } = useSelector((state) => state.dashboard);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [viewTarget, setViewTarget] = useState(null); // ✅ selected user for modal

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      dispatch(getAllUsers({ page: currentPage, limit: 10, search }));
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [dispatch, currentPage, search]);

  const handleBanToggle = (user) => {
    if (user.isBanned) {
      dispatch(unbanUser(user._id))
        .unwrap()
        .then(() => toast.success("User unbanned!"))
        .catch((error) => toast.error(error));
    } else {
      dispatch(banUser(user._id))
        .unwrap()
        .then(() => toast.success("User banned!"))
        .catch((error) => toast.error(error));
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteUser(deleteTarget._id)).unwrap();
      toast.success("User deleted successfully!");
      dispatch(getAllUsers({ page: currentPage, limit: 10, search }));
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Users Management</h1>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <Input
            type="text"
            placeholder="Search users by name, email, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            leftIcon={<FiSearch />}
          />
        </div>
        <span className="text-sm text-slate-500">{userPagination.totalItems} users</span>
      </div>

      {loading && users.length === 0 ? (
        <TableSkeleton rows={6} columns={5} />
      ) : users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FiUsers className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-600">No users found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      user.isBanned ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {user.isBanned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {/* ✅ Eye Icon */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        rounded="lg"
                        className="!h-8 !w-8 !p-0"
                        onClick={() => setViewTarget(user)}
                        title="View Details"
                      >
                        <FiEye className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant={user.isBanned ? "outline" : "danger"}
                        size="sm"
                        onClick={() => handleBanToggle(user)}
                        disabled={user.role === "admin"}
                      >
                        {user.isBanned ? "Unban" : "Ban"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="!text-red-500"
                        onClick={() => setDeleteTarget(user)}
                        disabled={user.role === "admin"}
                      >
                        <FiTrash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {userPagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={userPagination.currentPage}
            totalPages={userPagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* ✅ User Details Modal */}
      {viewTarget && (
        <UserDetailsModal user={viewTarget} onClose={() => setViewTarget(null)} />
      )}

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminUsersPage;