import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/style.css";
import Index from "./Index";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>,
);
