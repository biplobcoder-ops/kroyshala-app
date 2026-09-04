import React, { useState } from "react";
import { FiX, FiUpload, FiPlus } from "react-icons/fi";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Textarea from "../../../components/ui/Textarea/Textarea";
import toast from "react-hot-toast";

const ProductFormModal = ({ product, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    discountPrice: product?.discountPrice || "",
    brand: product?.brand || "",
    sku: product?.sku || "",
    category: product?.category?._id || "",
    stock: product?.stock || "",
    tags: product?.tags?.join(", ") || "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(
    product?.images?.map((img) => img.url) || []
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Max 5 images
    if (imagePreviews.length + files.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }

    // File size check (5MB each)
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Each image must be less than 5MB");
        return;
      }
    }

    setImages((prev) => [...prev, ...files]);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      toast.error("Name, price, and stock are required");
      return;
    }

    if (images.length === 0 && imagePreviews.length === 0) {
      toast.error("At least one product image is required");
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discountPrice", formData.discountPrice || "0");
      formDataToSend.append("brand", formData.brand || "");
      formDataToSend.append("sku", formData.sku);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("tags", formData.tags || "");

      // Append images
      images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      await onSubmit(formDataToSend);
      onClose();
    } catch (error) {
      console.error("Product save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            {product ? "Edit Product" : "Add Product"}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Product Images (Max 5)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {imagePreviews.length < 5 && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 text-slate-400 hover:border-blue-500 hover:text-blue-500">
                  <FiPlus className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              JPG, PNG, or WEBP. Max 5MB each.
            </p>
          </div>

          <Input
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            required
            fullWidth
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Product description"
            rows={3}
            fullWidth
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (৳)"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              fullWidth
            />
            <Input
              label="Discount Price (৳)"
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              placeholder="0.00"
              fullWidth
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand name"
              fullWidth
            />
            <Input
              label="SKU"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU-001"
              required
              fullWidth
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Category ID"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category ID"
              fullWidth
            />
            <Input
              label="Stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
              fullWidth
            />
          </div>

          <Input
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="phone, apple, smart"
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
            {product ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;