import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiEdit2, FiTrash2, FiGrid } from "react-icons/fi";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button/Button";
import ConfirmDialog from "../../../components/ui/ConfirmDialog/ConfirmDialog";
import CategoryFormModal from "../components/CategoryFormModal";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../categories/store/categorySlice";

const AdminCategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categories);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCreate = async (data) => {
    await dispatch(createCategory(data)).unwrap();
    toast.success("Category created successfully!");
    dispatch(fetchCategories());
  };

  const handleUpdate = async (data) => {
    await dispatch(updateCategory({ id: editingCategory._id, data })).unwrap();
    toast.success("Category updated successfully!");
    dispatch(fetchCategories());
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await dispatch(deleteCategory(deleteTarget._id)).unwrap();
      toast.success("Category deleted successfully!");
      dispatch(fetchCategories());
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
        <h1 className="text-2xl font-bold text-slate-900">Categories Management</h1>
        <Button
          type="button"
          variant="primary"
          size="sm"
          leftIcon={<FiPlus />}
          onClick={() => {
            setEditingCategory(null);
            setShowModal(true);
          }}
        >
          Add Category
        </Button>
      </div>

      {loading && categories.length === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FiGrid className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 font-semibold text-slate-600">No categories found</p>
          <Button
            type="button"
            variant="primary"
            size="md"
            leftIcon={<FiPlus />}
            className="mt-4"
            onClick={() => {
              setEditingCategory(null);
              setShowModal(true);
            }}
          >
            Add Category
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                {category.image?.url && (
                  <img
                    src={category.image.url}
                    alt={category.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">{category.name}</h3>
                  <p className="text-xs text-slate-500">{category.slug}</p>
                </div>
              </div>

              {category.description && (
                <p className="mt-3 line-clamp-2 text-sm text-slate-600">{category.description}</p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    category.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {category.isActive ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    rounded="lg"
                    className="!h-8 !w-8 !p-0"
                    onClick={() => {
                      setEditingCategory(category);
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
                    onClick={() => setDeleteTarget(category)}
                  >
                    <FiTrash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CategoryFormModal
          category={editingCategory}
          onClose={() => setShowModal(false)}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
        />
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdminCategoriesPage;