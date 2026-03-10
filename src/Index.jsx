import React from "react";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";

export default function Index() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Routes>
      {/* Login Routes */}

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
    </Routes>
  );
}
