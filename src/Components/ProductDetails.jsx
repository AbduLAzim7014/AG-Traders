import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../Components/BlogData/BlogData";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaShareSquare,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaStar,
} from "react-icons/fa";

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ← uncommented & fixed

  const product = products.find((p) => p.slug === slug);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showNotification, setShowNotification] = useState("");

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-gray-100 to-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
          <button
            onClick={() => navigate("/product")}
            className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition shadow-md"
          >
            Back to Products
          </button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowNotification(`Added ${quantity} × ${product.name} to cart!`);
    setTimeout(() => setShowNotification(""), 3200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setShowNotification("Product link copied to clipboard!");
      setTimeout(() => setShowNotification(""), 3200);
    });
  };

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100,
  );
  const savings = product.oldPrice - product.price;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/product" },
    {
      name: product.category || "Category",
      path: `/product?category=${product.category?.toLowerCase() || ""}`,
    },
    { name: product.name, path: null },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 pb-16"
    >
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl animate-fade-in-out">
          {showNotification}
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="hover:text-orange-600 transition"
                  >
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="font-medium text-gray-900">
                    {crumb.name}
                  </span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="text-gray-400">/</span>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div className="space-y-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-105 md:h-120 object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {[product.image, product.image, product.image, product.image].map(
                (img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    className={`w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg cursor-pointer border-2 transition-all snap-center shrink-0 ${activeImage === idx ? "border-orange-500 shadow-md" : "border-gray-200 hover:border-orange-300"}`}
                    onClick={() => setActiveImage(idx)}
                  />
                ),
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl font-bold text-green-700">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xl text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString("en-IN")}
              </span>
              {discountPercent > 0 && (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {savings > 0 && (
              <p className="text-green-600 font-medium">
                You save ₹{savings.toLocaleString("en-IN")}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400 text-xl">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating || "–"} ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-6">
              <label htmlFor="quantity" className="font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value)))
                  }
                  className="w-20 text-center border-x border-gray-300 py-3 text-lg font-medium focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-xl font-semibold shadow-md transition text-lg"
              >
                <FaShoppingCart className="text-xl" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-3 bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-semibold shadow-md transition text-lg"
              >
                Buy Now
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-6 pt-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition"
              >
                {isFavorite ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-xl" />
                )}
                <span>Wishlist</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              >
                <FaShareSquare className="text-xl" />
                <span>Share</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="pt-6 border-t border-gray-200 space-y-3 text-gray-700">
              <p className="flex items-center gap-3">
                <FaTruck className="text-orange-600 text-xl" /> Ships in{" "}
                {product.shippingTime || "2-5 days"}
              </p>
              <p className="flex items-center gap-3">
                <FaShieldAlt className="text-orange-600 text-xl" /> 100%
                Authentic & Quality Checked
              </p>
              <p className="flex items-center gap-3">
                <FaUndo className="text-orange-600 text-xl" /> 30-Day Easy
                Returns
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p.id !== product.id,
              )
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  to={`/product/${related.slug}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group border border-gray-100"
                >
                  <div className="bg-gray-50 h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 min-h-10 mb-2">
                      {related.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-green-700 text-lg">
                        ₹{related.price.toLocaleString("en-IN")}
                      </span>
                      {related.oldPrice > related.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{related.oldPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
