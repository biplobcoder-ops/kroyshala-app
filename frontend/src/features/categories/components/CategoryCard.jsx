import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiGrid } from "react-icons/fi";

import Card from "../../../components/ui/Card/Card";

// ==========================================
// Category Card Component
// ==========================================

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category.slug}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* ==========================================
            Category Image
        ========================================== */}

        <div className="relative aspect-square overflow-hidden bg-slate-100">
          {category.image?.url ? (
            <img
              src={category.image.url}
              alt={category.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FiGrid className="h-16 w-16 text-slate-300" />
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-900/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2 text-sm font-medium text-white">
              View Products
              <FiArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* ==========================================
            Category Info
        ========================================== */}

        <div className="p-4">
          <h3 className="truncate font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
            {category.name}
          </h3>

          {category.description && (
            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {category.description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-blue-600">
              Shop Now
            </span>
            <FiArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;