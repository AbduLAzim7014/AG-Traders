import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./Layout/RootLayout";

import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Service from "./Components/Service";
import Products from "./Components/Products";
// import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";

import CheckOut from "./pages/CheckOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

import { auth } from "./pages/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import EmailOtpLogin from "./pages/EmailOtpLogin";
import ProductDetails from "./Components/ProductDetails";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔴 IMPORTANT FIX
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        <img
          className="loading-img"
          src="https://www.freepik.com/premium-vector/loading-bar-progress-icon_49253496.htm#fromView=keyword&page=1&position=31&uuid=5196bdb8-07d9-487f-b8a1-1f8de8b4ad79&query=Loading"
          alt=""
        />
      </div>
    );
  }

  return (
    <Routes>
      {/* Login / Register */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {/* Main Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service" element={<Service />} />
        <Route path="product" element={<Products />} />
        <Route path="product/category/:category" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetails />} />{" "}
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="otp" element={<EmailOtpLogin />} />
        {/* Protected Routes */}
        <Route
          path="checkout"
          element={user ? <CheckOut /> : <Navigate to="/login" />}
        />
        <Route
          path="profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="orders"
          element={user ? <Orders /> : <Navigate to="/login" />}
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
