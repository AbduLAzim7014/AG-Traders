import React from "react";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";
import Navigation from "../common/Navigation/Navigation";
import Header from "../common/Header";
import Faq from "../Components/Faq";

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <Header />
      <Outlet />
      <Faq />
      <Footer />
    </>
  );
}
