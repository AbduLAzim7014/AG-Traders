import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBoxOpen,
  FaTruck,
  FaRegClock,
  FaUndo,
  FaHeadset,
  FaTimesCircle,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { getOrders, updateOrder } from "../services/orderService";
import { auth } from "./config/firebase";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const fetchOrders = useCallback(async () => {
    if (auth.currentUser) {
      try {
        const fetchedOrders = await getOrders(auth.currentUser.uid);
        // Sort by date descending (Newest first)
        setOrders(
          fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)),
        );
      } catch (error) {
        toast.error("Failed to load orders");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleBuyAgain = (item) => {
    addToCart({ ...item, qty: 1 });
    toast.success(`${item.name} added to cart!`);
  };

  const handleReorderAll = (items) => {
    items.forEach((item) => addToCart({ ...item, qty: 1 }));
    toast.success("All items added to cart 🛒");
    navigate("/cart");
  };

  const cancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await updateOrder(id, { status: "Cancelled ❌" });
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: "Cancelled ❌" } : o)),
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      toast.error("Cancellation period has expired or error occurred");
    }
  };

  if (loading) return <OrdersSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            <FaBoxOpen className="text-orange-600" /> My Orders
          </h1>
          <Link
            to="/product"
            className="text-sm font-bold text-orange-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </header>

        {orders.length === 0 ? (
          <EmptyOrdersState />
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                layout
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* ORDER HEADER */}
                <div className="bg-gray-50/50 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold border-b border-gray-100">
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest mb-1">
                      Date
                    </p>
                    <p className="text-gray-800">
                      {new Date(order.date).toLocaleDateString() || "Recently"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase tracking-widest mb-1">
                      Total Amount
                    </p>
                    <p className="text-gray-800">₹{order.total}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-gray-400 uppercase tracking-widest mb-1">
                      Order ID
                    </p>
                    <p className="text-gray-800 font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right md:text-left">
                    <p className="text-gray-400 uppercase tracking-widest mb-1">
                      Current Status
                    </p>
                    <span
                      className={`px-2 py-1 rounded-md ${order.status?.includes("Cancelled") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}
                    >
                      {order.status || "Processing"}
                    </span>
                  </div>
                </div>

                {/* ITEMS LIST */}
                <div className="p-6">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-6 items-center py-4 first:pt-0 border-b last:border-0 border-gray-50"
                    >
                      <img
                        src={item.image || "https://via.placeholder.com/80"}
                        alt={item.name}
                        className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Qty: {item.qty} • Price: ₹{item.price}
                        </p>
                        <button
                          onClick={() => handleBuyAgain(item)}
                          className="mt-2 text-xs font-black text-orange-600 flex items-center gap-1 hover:text-orange-700"
                        >
                          <FaUndo size={10} /> Buy it again
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* ACTION BAR */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        setOpenOrder(openOrder === order.id ? null : order.id)
                      }
                      className="btn-secondary"
                    >
                      {openOrder === order.id
                        ? "Hide Details"
                        : "Order Details"}
                    </button>
                    <button
                      onClick={() => toast.info("Tracking API simulation...")}
                      className="btn-secondary"
                    >
                      <FaTruck className="inline mr-2" /> Track
                    </button>
                    <button
                      onClick={() => handleReorderAll(order.items)}
                      className="bg-gray-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
                    >
                      Reorder Everything
                    </button>
                    {order.status !== "Cancelled ❌" && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="ml-auto text-red-500 text-sm font-bold hover:underline flex items-center gap-1"
                      >
                        <FaTimesCircle /> Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* DETAILS ACCORDION */}
                <AnimatePresence>
                  {openOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-gray-50 p-6 border-t border-gray-100 text-sm"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <p className="font-black mb-2 text-gray-400 uppercase text-[10px]">
                            Shipping Address
                          </p>
                          <p className="text-gray-700 leading-relaxed">
                            Default Jodhpur Office
                            <br />
                            Rajasthan, 342001
                          </p>
                        </div>
                        <div>
                          <p className="font-black mb-2 text-gray-400 uppercase text-[10px]">
                            Payment Summary
                          </p>
                          <div className="flex justify-between mb-1">
                            <span>Subtotal:</span> <span>₹{order.total}</span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-900">
                            <span>Grand Total:</span>{" "}
                            <span>₹{order.total}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const OrdersSkeleton = () => (
  <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
    <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
    {[1, 2].map((i) => (
      <div key={i} className="h-64 bg-gray-100 rounded-2xl mb-6"></div>
    ))}
  </div>
);

const EmptyOrdersState = () => (
  <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
    <FaRegClock className="mx-auto text-5xl text-gray-200 mb-4" />
    <h2 className="text-2xl font-black text-gray-900 mb-2">No orders found</h2>
    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
      Looks like you haven't placed any orders yet. Start exploring our premium
      handcrafted tools.
    </p>
    <Link
      to="/product"
      className="bg-orange-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-700 transition-all"
    >
      Shop Collections
    </Link>
  </div>
);
