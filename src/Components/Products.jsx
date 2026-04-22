import React, { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../pages/ProductCard";
import { getProducts } from "../services/productService";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaSearch, FaTimes, FaBoxOpen } from "react-icons/fa";
import { products as localProducts } from "./BlogData/BlogData";

export default function Products() {
  const { category: categoryParam } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]); // Optimized range
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetched = await getProducts();
        setProducts(fetched && fetched.length > 0 ? fetched : localProducts);
      } catch (error) {
        console.error("Fetch error, using local data:", error);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [products]);

  // Sync category from URL params
  useEffect(() => {
    if (categoryParam) {
      const decoded = categoryParam.replace(/-/g, " ");
      const matched = categories.find(
        (c) => c.toLowerCase() === decoded.toLowerCase(),
      );
      setSelectedCategory(matched || "All");
    } else {
      setSelectedCategory("All");
    }
  }, [categoryParam, categories]);

  // Main Filtering and Sorting Logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = (product.rating || 0) >= minRating;
      const matchesStock = inStockOnly ? product.stock > 0 : true;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesStock
      );
    });

    const sortMethods = {
      "price-low": (a, b) => a.price - b.price,
      "price-high": (a, b) => b.price - a.price,
      rating: (a, b) => (b.rating || 0) - (a.rating || 0),
      popular: (a, b) => (b.reviews || 0) - (a.reviews || 0),
      newest: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    };

    const sorted = [...filtered];
    return sortMethods[sortBy] ? sorted.sort(sortMethods[sortBy]) : sorted;
  }, [
    products,
    selectedCategory,
    sortBy,
    searchQuery,
    priceRange,
    minRating,
    inStockOnly,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPriceRange([0, 5000]);
    setMinRating(0);
    setInStockOnly(true);
    setSortBy("popular");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Loading amazing products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pb-20"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl md:text-5xl font-extrabold mb-3"
          >
            Premium Wooden Products
          </motion.h1>
          <p className="text-orange-100 text-lg opacity-90">
            Handcrafted with love, tradition, and 100% natural wood.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, material or use..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none shadow-md text-gray-700 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaFilter className="text-orange-600 text-sm" /> Filters
                </h2>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Categories
                </h3>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-4 py-2.5 rounded-xl transition-all text-sm font-medium ${
                        selectedCategory === cat
                          ? "bg-orange-600 text-white shadow-md shadow-orange-200"
                          : "text-gray-600 hover:bg-orange-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Toggle */}
              <div className="pt-6 border-t border-gray-100">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors">
                    In Stock Only
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${inStockOnly ? "bg-orange-500" : "bg-gray-300"}`}
                    ></div>
                    <div
                      className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform ${inStockOnly ? "translate-x-5" : "translate-x-0"}`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Listing Grid */}
          <main className="lg:col-span-3">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm">
              <p className="text-gray-500 font-medium">
                Showing{" "}
                <span className="text-gray-900 font-bold">
                  {filteredProducts.length}
                </span>{" "}
                high-quality items
              </p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400 font-bold uppercase">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border-none text-sm font-bold text-gray-700 py-2 pl-4 pr-8 rounded-xl focus:ring-2 focus:ring-orange-500 cursor-pointer"
                >
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-8"
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-24 bg-white rounded-3xl shadow-sm"
                >
                  <FaBoxOpen className="mx-auto text-6xl text-gray-200 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800">
                    No matches found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="mt-6 text-orange-600 font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
}
