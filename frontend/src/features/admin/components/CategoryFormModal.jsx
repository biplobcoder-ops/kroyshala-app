import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";
import toast from "react-hot-toast";

const CategoryFormModal = ({ category, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Category name is required");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Category save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="full"
            className="!h-8 !w-8 !p-0"
            onClick={onClose}
          >
            <FiX className="h-4 w-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <Input
            label="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            required
            fullWidth
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Category description"
            rows={3}
            fullWidth
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {category ? "Update Category" : "Create Category"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;