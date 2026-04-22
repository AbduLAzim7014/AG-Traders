import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaShoppingCart,
  FaHeart,
  FaArrowLeft,
  FaBoxOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const wishlistContext = useWishlist() || {};
  const cartContext = useCart() || {};

  const wishlist = wishlistContext.wishlist || wishlistContext.items || [];
  const removeFromWishlist = wishlistContext.removeFromWishlist || (() => {});
  const clearWishlist = wishlistContext.clearWishlist || (() => {});
  const addToCart = cartContext.addToCart || (() => {});

  const navigate = useNavigate();

  // Safe data extraction
  const items = Array.isArray(wishlist) ? wishlist : wishlist.items || [];

  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item?.price || 0), 0);
  }, [items]);

  const handleAddToCart = (item) => {
    if (item?.stock === 0) {
      toast.error("Maaf kijiye, ye product out of stock hai.");
      return;
    }
    addToCart(item, 1);
    removeFromWishlist(item.id);
    toast.success(`${item.name} cart mein add ho gaya!`);
  };

  // --- EMPTY STATE ---
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white p-10 rounded-[3rem] shadow-xl max-w-md border border-gray-100"
        >
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-orange-200 text-5xl" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Wishlist Khali Hai!
          </h1>
          <p className="text-gray-500 mb-8 font-medium">
            Lagta hai aapne abhi tak koi wooden art select nahi kiya.
          </p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg"
          >
            Explore Products <FaArrowLeft className="rotate-180" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 flex items-center gap-4">
              <FaHeart className="text-red-500 drop-shadow-md" /> My Favorites
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Aapne {items.length} items save kiye hain.
            </p>
          </div>

          <button
            onClick={() => {
              clearWishlist();
              toast.info("Wishlist clear kar di gayi hai.");
            }}
            className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
          >
            <FaTrash /> Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Wishlist Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-all"
                >
                  <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50">
                    <img
                      src={item?.image || item?.img}
                      alt={item?.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-black text-gray-900">
                      {item?.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">
                      {item?.category}
                    </p>
                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-1">
                      <span className="text-2xl font-black text-orange-600">
                        ₹{item?.price}
                      </span>
                      {item?.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item?.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      disabled={item?.stock === 0}
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 sm:w-12 h-12 flex items-center justify-center rounded-xl transition-all ${
                        item?.stock === 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white"
                      }`}
                      title="Add to Cart"
                    >
                      <FaShoppingCart />
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="flex-1 sm:w-12 h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Sidebar: Summary */}
          <aside className="lg:col-span-1">
            <div className="bg-[#0f172a] text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-28">
              <h2 className="text-2xl font-black mb-6 border-b border-white/10 pb-4 flex items-center gap-3">
                <FaBoxOpen className="text-orange-500" /> Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between font-medium opacity-80">
                  <span>Total Items</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex justify-between text-2xl font-black text-orange-400 pt-4 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span>₹{totalValue}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/product")}
                className="w-full bg-white text-[#0f172a] py-4 rounded-2xl font-black uppercase tracking-wider hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
              >
                Continue Shopping
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
