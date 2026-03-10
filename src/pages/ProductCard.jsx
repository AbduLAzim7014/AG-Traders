import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showNotification, setShowNotification] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );
  const savings = product.oldPrice - product.price;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
        {/* Image Container */}
        <div className="relative w-full h-52 bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <motion.div
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              className="absolute -top-3 -right-10 bg-linear-to-r from-red-500 to-orange-500 text-white px-8 py-1 text-xs font-bold transform rotate-45 shadow-lg"
            >
              {discountPercent}% OFF
            </motion.div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 left-3">
            {product.stock > 20 ? (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                In Stock
              </span>
            ) : product.stock > 0 ? (
              <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Limited Stock
              </span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                Out of Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition"
          >
            {isInWishlist(product.id) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-600" />
            )}
          </motion.button>

          {/* Quick Add Button - Completed the truncated part */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleQuickAdd}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800 transition"
          >
            Quick Add
          </motion.button>
        </div>

        {/* Notification */}
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            ✓ Added to cart!
          </motion.div>
        )}

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Product Info */}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
              {product.category}
            </div>

            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-orange-600 transition">
              {product.name}
            </h3>

            <p className="text-xs text-gray-600 mb-2">{product.material}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.floor(product.rating) ? "" : "opacity-30"
                    }
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews})</span>
            </div>
          </div>

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-green-600">
                ₹{product.price}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
              <span className="text-xs text-red-500 font-semibold">
                Save ₹{savings}
              </span>
            </div>
            {product.shippingTime && (
              <p className="text-xs text-blue-600">
                📦 Ships in {product.shippingTime}
              </p>
            )}
          </div>

          {/* View Details Button */}
          <Link
            to={`/product/${product.slug}`}
            className="block w-full text-center bg-linear-to-r from-blue-600 to-blue-700 text-white py-2 rounded-lg hover:shadow-lg transition font-semibold text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
