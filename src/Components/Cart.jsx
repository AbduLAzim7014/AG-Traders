import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, updateQty, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold border-b pb-4 mb-4">
            My Cart ({cart.length})
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold">Your cart is empty</h3>
              <p className="text-gray-500 mt-2">Add items to it now</p>

              <button
                onClick={() => navigate("/products")}
                className="mt-5 px-6 py-3 bg-blue-600 text-white rounded"
              >
                Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center border-b py-6"
              >
                {/* IMAGE */}
                <div className="w-28 h-28">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h4 className="font-semibold text-lg">{item.name}</h4>

                  <p className="text-gray-600 mt-1">₹{item.price}</p>

                  <p className="text-sm text-gray-500">
                    Subtotal ₹{item.price * item.qty}
                  </p>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center border rounded mt-4 md:mt-0">
                  <button
                    onClick={() => updateQty(item._id, "dec")}
                    className="px-3 py-1 text-lg"
                  >
                    -
                  </button>

                  <span className="px-4">{item.qty}</span>

                  <button
                    onClick={() => updateQty(item._id, "inc")}
                    className="px-3 py-1 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - PRICE DETAILS */}
        {cart.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow h-fit sticky top-20">
            <h3 className="font-semibold text-lg border-b pb-3 mb-4">
              PRICE DETAILS
            </h3>

            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              PLACE ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
