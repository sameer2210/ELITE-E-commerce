import React from "react";
import { NavLink } from "react-router-dom";

const formatPrice = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return null;
  return `$${num.toLocaleString("en-IN")}`;
};

const ProductSearchResults = ({
  query,
  results,
  loading,
  error,
  minChars = 2,
  onSelect,
}) => {
  const trimmed = query.trim();

  if (!trimmed) return null;

  if (trimmed.length < minChars) {
    return (
      <p className="px-4 py-3 text-sm text-white/60">
        Type at least {minChars} characters to search.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="px-4 py-3 text-sm text-white/70">Searching products...</p>
    );
  }

  if (error) {
    return (
      <p className="px-4 py-3 text-sm text-red-400">{error}</p>
    );
  }

  if (!results?.length) {
    return (
      <p className="px-4 py-3 text-sm text-white/60">
        No products found for "{trimmed}".
      </p>
    );
  }

  return (
    <ul className="max-h-80 overflow-auto divide-y divide-white/10" role="listbox">
      {results.map((product) => {
        const id = product.id || product._id;
        const price = formatPrice(product.price);
        return (
          <li key={id} role="option">
            <NavLink
              to={`/product-info/${id}`}
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <div className="h-12 w-12 rounded-lg overflow-hidden bg-white/10">
                <img
                  src={product.image || product.images?.[0] || "https://via.placeholder.com/96"}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/96";
                  }}
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {product.title}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {[product.brand, product.category].filter(Boolean).join(" • ")}
                </p>
              </div>
              {price && (
                <span className="ml-auto text-sm text-white/80">{price}</span>
              )}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductSearchResults;
