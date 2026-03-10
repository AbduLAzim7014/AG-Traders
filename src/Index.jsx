import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import RootLayout from "./Layout/RootLayout";

import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Service from "./Components/Service";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";

import CheckOut from "./pages/CheckOut";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Login from "./pages/Login";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Index() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase Auth Check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading Screen

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Pages */}

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

        <Route path="product/:slug" element={<ProductDetails />} />

        <Route path="cart" element={<Cart />} />

        <Route path="wishlist" element={<Wishlist />} />

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

      {/* 404 Page */}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
