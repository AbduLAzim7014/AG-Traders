import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const fallbackImage = "https://via.placeholder.com/320x240?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <FaShoppingBag size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mt-2 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/product"
                  className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold transition-all inline-block shadow-lg shadow-orange-200"
                >
                  Start Shopping
                </Link>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-800">
                    Items ({cart.length})
                  </h2>
                </div>

                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-50 last:border-0"
                    >
                      {/* IMAGE */}
                      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || fallbackImage}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImage;
                          }}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* DETAILS */}
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-gray-800 text-lg hover:text-orange-600 transition-colors">
                          <Link to={`/product/${item.slug || item._id}`}>
                            {item.name}
                          </Link>
                        </h4>
                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                          <p className="font-bold text-orange-600 text-lg">
                            ₹{item.price}
                          </p>
                          <span className="text-gray-300">|</span>
                          <p className="text-sm text-gray-500 font-medium">
                            Subtotal: ₹{item.price * item.qty}
                          </p>
                        </div>

                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="flex items-center gap-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-wider mt-4 transition-colors"
                        >
                          <FaTrash size={12} /> Remove Item
                        </button>
                      </div>

                      {/* QUANTITY TOGGLE */}
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button
                          onClick={() => updateQty(item._id, "dec")}
                          disabled={item.qty <= 1}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all disabled:opacity-30"
                        >
                          <FaMinus size={12} />
                        </button>

                        <span className="w-12 text-center font-bold text-gray-800">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => updateQty(item._id, "inc")}
                          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* RIGHT SIDE - PRICE DETAILS */}
          {cart.length > 0 && (
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-xl text-gray-800 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Delivery</span>
                    <span className="text-green-600 font-bold uppercase text-sm">
                      Free
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-xl font-black text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <p className="text-right text-xs text-green-600 font-bold mt-1">
                      You save ₹0 on this order
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-100 transition-all active:scale-[0.98]"
                >
                  PROCEED TO CHECKOUT
                </button>

                <p className="text-center text-gray-400 text-[10px] mt-4 uppercase font-bold tracking-widest">
                  Secure SSL Encryption
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
