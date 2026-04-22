import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaTruck,
  FaCheckCircle,
  FaLock,
  FaHeadset,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";

// Data & Context
import { getProductBySlug, getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Assets Import
import yellow from "../assets/Images/yellow.png";
import goolgotani from "../assets/Images/goolgotani.png";
import belan from "../assets/Images/belan.png";
import neems from "../assets/Images/neems.png";
import ProductCard from "../pages/ProductCard";

const imageMap = {
  "yellow.png": yellow,
  "goolgotani.png": goolgotani,
  "belan.png": belan,
  "neems.png": neems,
};

// Helper to get correct image path
const getImageUrl = (filename) => imageMap[filename] || filename || yellow;

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [single, list] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);

        if (single) {
          setProduct(single);
          setAllProducts(list || []);
          setQuantity(1); // Reset quantity on new product
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          toast.error("Product not found!");
          navigate("/product");
        }
      } catch (e) {
        console.error("Fetch Error:", e);
        toast.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (slug) loadData();
  }, [slug, navigate]);

  // Related Products logic
  const relatedProducts = useMemo(() => {
    if (!product || !allProducts.length) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold animate-pulse">
          Loading Details...
        </p>
      </div>
    );
  }

  if (!product) return null;

  const discount =
    product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Header Navigation */}
      <nav className="bg-white border-b px-6 py-3 text-[10px] md:text-xs text-gray-500 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex gap-2 uppercase tracking-widest font-bold items-center">
          <Link to="/" className="hover:text-orange-600">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <Link to="/product" className="hover:text-orange-600">
            Shop
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row gap-10 p-6 md:p-12 border border-gray-100">
          {/* LEFT: Image Area */}
          <div className="lg:w-1/2">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-3xl p-6 relative group border border-gray-50"
              >
                <img
                  src={getImageUrl(product.image)}
                  className="w-full h-[350px] md:h-[500px] object-contain mx-auto mix-blend-multiply"
                  alt={product.name}
                />
                <button
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center transition-all active:scale-90"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-300 text-xl" />
                  )}
                </button>
              </motion.div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    toast.success(`${product.name} added to cart!`);
                  }}
                  className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-black uppercase shadow-xl hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="flex-1 bg-orange-600 text-white py-4 rounded-xl font-black uppercase shadow-xl hover:bg-orange-700 transition-all flex items-center justify-center gap-2">
                  <FaBolt /> Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Details Area */}
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-2">
              <span className="text-orange-600 font-black text-[10px] uppercase tracking-[0.2em]">
                {product.category || "Wooden Product"}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="bg-green-700 text-white px-2 py-0.5 rounded flex items-center gap-1 text-xs font-bold">
                  {product.rating || "4.5"} <FaStar size={10} />
                </div>
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                  {product.reviews || "0"} Reviews
                </span>
                <img
                  src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                  className="h-4"
                  alt="assured"
                />
              </div>
            </div>

            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-gray-900">
                  ₹{product.price * quantity}
                </span>
                {discount > 0 && (
                  <div className="flex flex-col">
                    <span className="text-lg text-gray-300 line-through font-bold">
                      ₹{product.oldPrice * quantity}
                    </span>
                    <span className="text-green-600 text-sm font-black uppercase">
                      {discount}% Off
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6">
              <span className="font-black text-gray-900 uppercase text-sm tracking-tighter">
                Quantity:
              </span>
              <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-orange-50 text-orange-600 border-r"
                >
                  <FaMinus size={12} />
                </button>
                <span className="px-8 font-black text-gray-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-orange-50 text-orange-600 border-l"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Material
                </p>
                <p className="font-bold text-gray-800">
                  {product.material || "Natural Seasoned Wood"}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-1">
                  Dimensions
                </p>
                <p className="font-bold text-gray-800">
                  {product.diameter || product.length || "Standard Size"}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm italic">
                {product.description ||
                  "Individually handcrafted from sustainably sourced single-block wood, ensuring a seamless finish and superior durability for your kitchen."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { icon: <FaTruck />, t: "Rapid Delivery" },
          { icon: <FaCheckCircle />, t: "Pure Wood" },
          { icon: <FaLock />, t: "Secure Pay" },
          { icon: <FaHeadset />, t: "Live Support" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm text-center border border-gray-50 flex flex-col items-center"
          >
            <div className="text-orange-600 text-2xl mb-2">{item.icon}</div>
            <h4 className="font-black uppercase tracking-tighter text-[9px] text-gray-900">
              {item.t}
            </h4>
          </div>
        ))}
      </div>

      {/* Related Products Grid */}
      <section className="max-w-7xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-8">
          Related Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(relatedProducts.length > 0
            ? relatedProducts
            : allProducts.slice(0, 4)
          ).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
