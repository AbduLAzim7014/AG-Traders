import { useState, useMemo } from "react";
import ProductCard from "../pages/ProductCard";
import { products, CATEGORIES } from "./BlogData/BlogData";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [showFilters, setShowFilters] = useState(true);
  const [minRating, setMinRating] = useState(0);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;

      return matchesCategory && matchesSearch && matchesPrice && matchesRating;
    });

    // Sort
    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high":
        return filtered.sort((a, b) => b.price - a.price);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "newest":
        return filtered.sort((a, b) => b.id - a.id);
      case "discount":
        return filtered.sort(
          (a, b) =>
            (b.oldPrice - b.price) / b.oldPrice -
            (a.oldPrice - a.price) / a.oldPrice,
        );
      default: // popular
        return filtered.sort((a, b) => b.reviews - a.reviews);
    }
  }, [selectedCategory, sortBy, searchQuery, priceRange, minRating]);

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 150 ? 1 : 0) +
    (minRating > 0 ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPriceRange([0, 150]);
    setMinRating(0);
    setSortBy("popular");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100"
    >
      {/* Hero Section */}
      <div className="bg-linear-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Wooden Products
            </h1>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Discover our exclusive collection of handcrafted wooden kitchen
              items - from traditional chaklas and belans to modern matani
              products
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search products by name, material, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTERS SIDEBAR */}
          <motion.div layout className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FaFilter /> Filters
                </h2>
                {activeFiltersCount > 0 && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {activeFiltersCount} Active
                  </span>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleResetFilters}
                  className="w-full mb-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition text-sm font-semibold"
                >
                  Reset All Filters
                </motion.button>
              )}

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ x: 4 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? "bg-orange-500 text-white font-semibold"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[0, 3.5, 4, 4.5, 4.8].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer hover:text-orange-600 transition"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={minRating === rating}
                        onChange={(e) =>
                          setMinRating(parseFloat(e.target.value))
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">
                        {rating === 0 ? "All Ratings" : `${rating}⭐ & up`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="pb-6 border-b">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Availability
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* PRODUCTS GRID */}
          <div className="lg:col-span-3">
            {/* Sorting and Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-md"
            >
              <p className="text-gray-600 font-semibold">
                Showing{" "}
                <span className="text-orange-600">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2 mt-4 sm:mt-0">
                <label className="text-gray-700 font-semibold">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Best Discount</option>
                </select>
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={handleResetFilters}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
                  >
                    Clear All Filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
