import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Blog from "./Components/Blog";
import Service from "./Components/Service";
import Login from "./pages/Login";

export default function Index() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}
