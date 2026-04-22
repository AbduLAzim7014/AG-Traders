import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showNotification, setShowNotification] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&h=300&auto=format&fit=crop";

  // Calculations Memoized
  const { discountPercent, savings } = useMemo(() => {
    const discount =
      product.oldPrice && product.oldPrice > product.price
        ? Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100,
          )
        : 0;
    const saveAmt = (product.oldPrice || product.price) - product.price;
    return { discountPercent: discount, savings: saveAmt };
  }, [product.price, product.oldPrice]);

  // Wishlist logic with stopPropagation
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Card ke product page link ko trigger hone se rokta hai
    isInWishlist(product.id)
      ? removeFromWishlist(product.id)
      : addToWishlist(product);
  };

  // Add to Cart logic with stopPropagation
  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock === 0) return;

    addToCart(product, 1);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col h-full relative"
    >
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 top-0 bg-green-600 text-white text-center py-2 text-[10px] font-bold z-50 shadow-md"
          >
            ✓ Added to Cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Area with Overlay Link */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        <Link to={`/product/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image || fallbackImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 pointer-events-none">
          {discountPercent > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 pointer-events-none">
          <span
            className={`text-[9px] font-bold px-2 py-1 rounded uppercase text-white shadow-sm ${
              product.stock > 5
                ? "bg-green-500"
                : product.stock > 0
                  ? "bg-orange-500"
                  : "bg-gray-400"
            }`}
          >
            {product.stock > 5
              ? "In Stock"
              : product.stock > 0
                ? "Low Stock"
                : "Sold Out"}
          </span>
        </div>

        {/* Wishlist Button - Overlaying the Link */}
        <button
          onClick={handleWishlist}
          className="absolute bottom-3 left-3 w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-white transition-all z-20 active:scale-90"
        >
          {isInWishlist(product.id) ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
              {product.category || "Wooden"}
            </span>
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400 text-[10px]" />
              <span className="text-xs font-bold text-gray-600">
                {product.rating || "5.0"}
              </span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="text-gray-800 font-bold text-sm leading-tight mb-1 hover:text-orange-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-gray-500 mb-2">
            {product.material || "Handcrafted Wood"}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-2 pt-2 border-t border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-black text-gray-900">
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-center bg-white border border-gray-200 text-gray-800 py-2 rounded-lg text-[11px] font-bold hover:bg-gray-50 transition-all"
            >
              Details
            </Link>
            <button
              onClick={handleQuickAdd}
              disabled={product.stock === 0}
              className="bg-gray-900 text-white py-2 rounded-lg text-[11px] font-bold hover:bg-orange-600 disabled:bg-gray-100 disabled:text-gray-400 transition-all"
            >
              {product.stock === 0 ? "Out" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
