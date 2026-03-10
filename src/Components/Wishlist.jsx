import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
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

  // SAFE items array
  const items = Array.isArray(wishlist)
    ? wishlist
    : Array.isArray(wishlist.items)
      ? wishlist.items
      : [];

  const totalValue = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + Number(item?.price || 0);
    }, 0);
  }, [items]);

  const avgPrice = items.length > 0 ? Math.round(totalValue / items.length) : 0;

  const handleAddToCart = (item) => {
    if (item?.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    addToCart(item, 1);
    removeFromWishlist(item.id);
    toast.success("Added to cart");
  };

  // EMPTY STATE
  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-100 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">❤️ Your Wishlist is Empty</h1>
          <Link
            to="/product"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg"
          >
            Explore Products
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaHeart className="text-red-500" /> My Wishlist
          </h1>

          <button
            onClick={clearWishlist}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear Wishlist
          </button>
        </div>

        {/* Items */}
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="bg-white p-4 rounded shadow"
            >
              <img
                src={item?.img || item?.image || ""}
                alt={item?.name}
                className="h-48 w-full object-cover rounded"
              />

              <h3 className="font-bold mt-3">{item?.name}</h3>

              <p className="text-orange-600 font-bold">
                ₹{Number(item?.price || 0)}
              </p>

              {item?.stock !== undefined && (
                <p
                  className={`text-sm font-semibold mt-1 ${
                    item.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.stock > 0 ? `Stock: ${item.stock}` : "Out of Stock"}
                </p>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  disabled={item?.stock === 0}
                  onClick={() => handleAddToCart(item)}
                  className={`flex-1 py-2 rounded font-bold ${
                    item?.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                >
                  <FaShoppingCart /> Add
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 mt-10 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Wishlist Summary</h2>
          <p>Total Items: {items.length}</p>
          <p>Total Value: ₹{totalValue}</p>
          <p>Average Price: ₹{avgPrice}</p>

          <button
            onClick={() => navigate("/product")}
            className="w-full mt-6 bg-blue-500 text-white py-3 rounded"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </motion.div>
  );
}
