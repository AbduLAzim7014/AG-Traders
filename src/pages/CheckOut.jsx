import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CheckOut() {
  const { cart, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const shippingCharge = totalPrice > 1000 ? 0 : 99;
  const grandTotal = totalPrice + shippingCharge;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    toast.success("success the payment");

    cart.forEach((item) => removeFromCart(item._id));

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">
            Billing Details
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Full Address"
              className="w-full border p-3 rounded-lg"
              rows="3"
              onChange={handleChange}
            ></textarea>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="border p-3 rounded-lg"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">
            Order Summary
          </h2>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.qty}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCharge === 0 ? "Free" : `₹${shippingCharge}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Place Order
              </button>

              <button className=" text-2xl font-bold text-center ">
                Thanks You
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
