import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiRefreshCw, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Pagination from "../../../components/ui/Pagination/Pagination";
import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";
import ProductFormModal from "../components/ProductFormModal";
import TableSkeleton from "../components/TableSkeleton";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../products/store/productSlice";

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading, pagination } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: 10, search }));
  }, [dispatch, currentPage, search]);

  const handleCreate = async (data) => {
    await dispatch(createProduct(data)).unwrap();
    toast.success("Product created successfully!");
    dispatch(fetchProducts({ page: currentPage, limit: 10, search }));
  };

  const handleUpdate = async (data) => {
    await dispatch(updateProduct({ id: editingProduct._id, data })).unwrap();
    toast.success("Product updated successfully!");
    dispatch(fetchProducts({ page: currentPage, limit: 10, search }));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteProduct(deleteTarget._id)).unwrap();
      toast.success("Product deleted successfully!");
      dispatch(fetchProducts({ page: currentPage, limit: 10, search }));
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Products Management</h1>
        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<FiPlus />}
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="max-w-sm flex-1">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            leftIcon={<FiSearch />}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<FiRefreshCw />}
          onClick={() => dispatch(fetchProducts({ page: currentPage, limit: 10, search }))}
        >
          Refresh
        </Button>
        <span className="ml-auto text-sm text-slate-500">
          {pagination.total || 0} products
        </span>
      </div>

      {loading && products.length === 0 ? (
        <TableSkeleton rows={6} columns={6} />
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FiPackage className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-600">No products found</p>
          <p className="mt-1 text-sm text-slate-400">Try adjusting your search</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-slate-500">{product.sku}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold">৳{product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        product.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        rounded="lg"
                        className="!h-8 !w-8 !p-0"
                        onClick={() => {
                          setEditingProduct(product);
                          setShowModal(true);
                        }}
                      >
                        <FiEdit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        rounded="lg"
                        className="!h-8 !w-8 !p-0 !text-red-500"
                        onClick={() => setDeleteTarget(product)}
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

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setShowModal(false)}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminProductsPage;