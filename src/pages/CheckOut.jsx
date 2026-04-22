import React, { useReducer, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrder } from "../services/orderService";
import { getProductById, updateProduct } from "../services/productService";
import { auth } from "./config/firebase";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const initialState = {
  step: 1,
  loading: false,
  formData: { name: "", email: "", phone: "", address: "" },
  savedAddresses: [],
  selectedAddress: null,
  paymentMethod: "cod",
  coupon: "",
  discount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.name]: action.value },
      };
    case "SET_ADDRESSES":
      return { ...state, savedAddresses: action.value };
    case "SELECT_ADDRESS":
      return { ...state, selectedAddress: action.value, step: 2 };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_PAYMENT":
      return { ...state, paymentMethod: action.method };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_COUPON":
      return { ...state, coupon: action.value };
    case "SET_DISCOUNT":
      return { ...state, discount: action.value };
    default:
      return state;
  }
}

// Sub-component for Stripe
function StripePaymentForm({ amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
    } else {
      onSuccess(paymentMethod.id);
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 p-4 border rounded-lg bg-gray-50"
    >
      <CardElement className="p-3 bg-white border rounded" />
      <button
        type="submit"
        disabled={processing}
        className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 disabled:bg-gray-400"
      >
        {processing ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </form>
  );
}

async function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function handleRazorpayPayment({
  amount,
  orderId,
  name,
  email,
  phone,
  onSuccess,
}) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    toast.error("Unable to load Razorpay checkout. Please try again later.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, receipt: orderId }),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Failed to create payment order");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "AG Traders",
      description: "Order Payment",
      order_id: data.id,
      handler: async function (razorpayResponse) {
        const verifyRes = await fetch(
          "http://localhost:5000/api/verify-payment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(razorpayResponse),
          },
        );
        const verifyData = await verifyRes.json();
        if (verifyRes.ok && verifyData.verified) {
          toast.success("Payment successful!");
          onSuccess();
          return;
        }
        toast.error("Payment verification failed.");
      },
      prefill: {
        name: name || "",
        email: email || "",
        contact: phone || "",
      },
      theme: { color: "#F97316" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    toast.error(error.message);
  }
}

export default function CheckOut() {
  const { cart = [], totalPrice = 0, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  const shippingCharge = totalPrice > 1000 ? 0 : 99;
  const grandTotal = Math.max(0, totalPrice + shippingCharge - state.discount);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("addresses")) || [];
    dispatch({ type: "SET_ADDRESSES", value: saved });
  }, []);

  const saveAddress = () => {
    const { name, phone, address } = state.formData;
    if (!name.trim() || !phone.trim() || !address.trim()) {
      return toast.error("Please fill in all address details");
    }
    const updated = [state.formData, ...state.savedAddresses];
    localStorage.setItem("addresses", JSON.stringify(updated));
    dispatch({ type: "SET_ADDRESSES", value: updated });
    toast.success("Address added successfully");
  };

  const processOrder = async (paymentStatus) => {
    if (!state.selectedAddress) return toast.error("Select an address first");
    if (!auth.currentUser) return toast.error("Please login to continue");

    const order = {
      orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      items: cart,
      total: grandTotal,
      shippingAddress: state.selectedAddress,
      paymentMethod: state.paymentMethod,
      paymentStatus,
      userId: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      status: paymentStatus === "Paid" ? "Processing" : "Pending",
    };

    try {
      await addOrder(order);
      // Update Stock logic
      for (const item of cart) {
        const product = await getProductById(item._id || item.id);
        if (product && product.stock >= item.qty) {
          await updateProduct(item._id || item.id, {
            stock: product.stock - item.qty,
          });
        }
      }
      cart.forEach((item) => removeFromCart(item._id));
      toast.success("Order Placed Successfully! 🚀");
      navigate("/orders");
    } catch (err) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* Step-by-Step Selection */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-orange-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Delivery Address
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {state.savedAddresses.map((addr, i) => (
                <div
                  key={i}
                  onClick={() =>
                    dispatch({ type: "SELECT_ADDRESS", value: addr })
                  }
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${state.selectedAddress === addr ? "border-orange-500 bg-orange-50" : "border-gray-100 hover:border-orange-200"}`}
                >
                  <p className="font-bold text-gray-800">{addr.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{addr.address}</p>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    {addr.phone}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 grid gap-3">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Add New Address
              </p>
              <input
                placeholder="Full Name"
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "name",
                    value: e.target.value,
                  })
                }
              />
              <input
                placeholder="Email"
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "email",
                    value: e.target.value,
                  })
                }
              />
              <input
                placeholder="Mobile Number"
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "phone",
                    value: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Complete Address"
                className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    name: "address",
                    value: e.target.value,
                  })
                }
              />
              <button
                onClick={saveAddress}
                className="bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-black transition-all"
              >
                Save & Use This Address
              </button>
            </div>
          </section>

          {state.step >= 2 && (
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <span className="bg-orange-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Payment Method
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() =>
                    dispatch({ type: "SET_PAYMENT", method: "cod" })
                  }
                  className={`w-full p-4 border-2 rounded-xl text-left flex items-center justify-between transition-colors ${state.paymentMethod === "cod" ? "border-orange-500 bg-orange-50" : "border-gray-100"}`}
                >
                  <span className="font-bold">Cash on Delivery</span>
                  {state.paymentMethod === "cod" && (
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
                  )}
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "SET_PAYMENT", method: "online" })
                  }
                  className={`w-full p-4 border-2 rounded-xl text-left flex items-center justify-between transition-colors ${state.paymentMethod === "online" ? "border-orange-500 bg-orange-50" : "border-gray-100"}`}
                >
                  <span className="font-bold">Stripe / Card</span>
                  {state.paymentMethod === "online" && (
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
                  )}
                </button>

                <button
                  onClick={() =>
                    dispatch({ type: "SET_PAYMENT", method: "razorpay" })
                  }
                  className={`w-full p-4 border-2 rounded-xl text-left flex items-center justify-between transition-colors ${state.paymentMethod === "razorpay" ? "border-orange-500 bg-orange-50" : "border-gray-100"}`}
                >
                  <span className="font-bold">Razorpay / UPI</span>
                  {state.paymentMethod === "razorpay" && (
                    <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white" />
                  )}
                </button>
              </div>

              {state.paymentMethod === "online" ? (
                <Elements stripe={stripePromise}>
                  <StripePaymentForm
                    amount={grandTotal}
                    onSuccess={() => processOrder("Paid")}
                  />
                </Elements>
              ) : state.paymentMethod === "razorpay" ? (
                <div className="mt-6 p-4 rounded-2xl border border-gray-200 bg-orange-50">
                  <p className="font-semibold text-gray-800 mb-3">
                    Pay using Razorpay. After payment success, your order will
                    be placed automatically.
                  </p>
                  <button
                    onClick={async () => {
                      const orderId =
                        "ORD-" +
                        Math.random().toString(36).substr(2, 9).toUpperCase();
                      await handleRazorpayPayment({
                        amount: grandTotal,
                        orderId,
                        name: state.formData.name,
                        email: state.formData.email,
                        phone: state.formData.phone,
                        onSuccess: () => processOrder("Paid"),
                      });
                    }}
                    className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all disabled:bg-gray-400"
                  >
                    Pay ₹{grandTotal} with Razorpay
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => processOrder("Pending")}
                  className="w-full mt-6 bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 active:scale-[0.98] transition-all"
                >
                  Place Order (COD)
                </button>
              )}
            </section>
          )}
        </div>

        {/* Right Side Summary */}
        <aside>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="max-h-60 overflow-y-auto mb-4 border-b pb-4 space-y-3">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {item.name} <b className="text-gray-800">×{item.qty}</b>
                  </span>
                  <span className="font-bold">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              <input
                placeholder="Coupon Code"
                className="flex-1 border p-2 rounded-lg text-sm outline-none"
                onChange={(e) =>
                  dispatch({
                    type: "SET_COUPON",
                    value: e.target.value.toUpperCase(),
                  })
                }
              />
              <button
                onClick={() =>
                  state.coupon === "SAVE10"
                    ? dispatch({ type: "SET_DISCOUNT", value: 100 })
                    : toast.error("Invalid Coupon")
                }
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-bold"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span
                  className={
                    shippingCharge === 0 ? "text-green-600 font-bold" : ""
                  }
                >
                  {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                </span>
              </div>
              {state.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{state.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-black text-gray-800 pt-2 border-t mt-2">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
