import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-4">
          🛒 Shopping Cart
        </h2>

        {cart.length === 0 ? (  
          <p className="text-gray-500 text-center py-10">Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between border-b pb-6"
              >
                {/* Product Image */}
                <div className="w-32 h-32">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-500">
                    Subtotal: ₹{item.price * item.qty}
                  </p>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={() => updateQty(item._id, "dec")}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-semibold">{item.qty}</span>

                  <button
                    onClick={() => updateQty(item._id, "inc")}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Section */}
            <div className="flex justify-between items-center pt-6">
              <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>

              <button
                onClick={() => navigate("/checkout")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
