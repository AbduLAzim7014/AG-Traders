import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowLeftLine } from "react-icons/ri";
import { FaTruckMoving } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { GiWoodenCrate } from "react-icons/gi";
import img1 from "../assets/Images/yellow.png";
import { Link } from "react-router-dom";
import yellowImg from "../assets/Images/yellow.png";
import belanImg from "../assets/Images/belan.png";
import boardImg from "../assets/Images/marbal.png";

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [current]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  const nextSlide = () =>
    setCurrent(current === slides.length - 1 ? 0 : current + 1);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const categories = ["All", "Cakla", , "Sarmika"];

  const products = [
    {
      id: 1,
      name: "Yellow Wooden Chakla",
      category: "Chakla",
      price: 299,
      img: yellowImg,
    },
    {
      id: 2,
      name: " Belan",
      slug: "wooden-rolling-pin",
      category: "Belan",
      price: 199,
      img: belanImg,
    },
    {
      id: 3,
      name: "Wooden Cutting Board",
      slug: "wooden-cutting-board",
      category: "Board",
      price: 399,
      img: boardImg,
    },
  ];

  const filteredProducts = [...products]
    .filter((item) =>
      selectedCategory === "All" ? true : item.category === selectedCategory,
    )
    .sort((a, b) => {
      if (sortOption === "low-high") return a.price - b.price;
      if (sortOption === "high-low") return b.price - a.price;
      if (sortOption === "a-z") return a.name.localeCompare(b.name);
      return 0;
    });

  const features = [
    {
      title: "Transport",
      subtitle: "Export",
      icon: <FaTruckMoving />,
    },
    {
      title: "Manufacturing",
      subtitle: "Package",
      icon: <LuBoxes />,
    },
    {
      title: "Wooden Craft",
      subtitle: "Export",
      icon: <GiWoodenCrate />,
    },
    {
      title: "Policy",
      subtitle: "Terms",
      icon: <IoWalletOutline />,
    },
  ];

  const slides = [
    {
      id: 1,
      image: "src/assets/Images/ChatGPT Image Feb 14, 2026, 03_13_45 AM.png",
    },
    {
      id: 2,
      image: "src/assets/Images/belan.png",
    },
    {
      id: 3,
      image: "src/assets/Images/spon.png",
    },
    {
      id: 4,
      image: "src/assets/Images/marbal.png",
    },
  ];

  return (
    <>
      <div className="bg-gray-100">
        {/* HERO SECTION */}

        <div className="relative w-full h-[560px] overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="max-w-7xl mx-auto h-full flex items-center px-6">
                <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
                  {/* TEXT SIDE */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <img
                      src="src/assets/Images/ChatGPT Image Feb 14, 2026, 03_21_52 AM.png"
                      alt="A G Traders Logo"
                      className="w-32 h-20 object-contain mb-4 mx-auto md:mx-0"
                    />

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                      Premium Wooden & Marble <br />
                      <span className="text-green-700">Kitchen Essentials</span>
                    </h1>

                    <p className="text-gray-600 mb-6">
                      Trusted since 1965. Export quality craftsmanship with fast
                      delivery and secure payments.
                    </p>

                    <a
                      href="/blog"
                      className="inline-block px-8 py-3 bg-green-700 hover:bg-green-800 transition-all duration-300 rounded-lg text-white font-semibold shadow-lg hover:scale-105"
                    >
                      Shop Now
                    </a>
                  </div>

                  {/* IMAGE SIDE */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <img
                      src={slide.image}
                      alt="Product"
                      className="w-[80%] max-w-md object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.25)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* PREV BUTTON */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow hover:bg-white transition"
          >
            ❮
          </button>

          {/* NEXT BUTTON */}
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow hover:bg-white transition"
          >
            ❯
          </button>

          {/* DOTS */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  current === index ? "bg-green-700 scale-125" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <section className="w-full mt-6 mb-4 ">
          <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-6 border rounded-xl 
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                       bg-white"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-gray-500">{item.subtitle}</p>
                </div>

                <div className="text-3xl text-gray-800">{item.icon}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>

            {/* FILTER + SORT */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
              {/* Category Buttons */}
              <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full border transition ${
                      selectedCategory === cat
                        ? "bg-indigo-700 text-white"
                        : "bg-white hover:bg-indigo-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <select
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="default">Sort By</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
                <option value="a-z">Name: A → Z</option>
              </select>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl shadow hover:shadow-2xl transition duration-300 overflow-hidden"
                >
                  <Link to={`/products/${item.slug}`} className="block">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-48 
                    w-full object-cover"
                    />
                  </Link>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-indigo-700 font-bold mt-2">
                      ₹{item.price}
                    </p>

                    <button className="mt-4 w-full bg-indigo-700 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                No products found
              </p>
            )}
          </div>
        </section>

        {/* HERO SECTION */}

        <div className="w-full py-16 px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Wooden Crafts",
              desc: "Handmade elegance for your home",
              color: "bg-yellow-100",
            },
            {
              title: "Kitchen Essentials",
              desc: "Premium tools & accessories",
              color: "bg-red-100",
            },
            {
              title: "Decor & Lifestyle",
              desc: "Beautify your space effortlessly",
              color: "bg-blue-100",
            },
            {
              title: "Gift Collections",
              desc: "Perfect gifts for every occasion",
              color: "bg-purple-100",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`${item.color} p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* OFFER SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 to-white py-20 px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Left: Text Content */}
          <div className="md:w-1/2 z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 tracking-tight">
              Elevate Your Kitchen <br />
              <span className="text-amber-700">Experience.</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Benefit 1 */}
              <div className="group p-4 rounded-2xl border border-stone-100 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-stone-200 transition-all duration-300">
                <div className="w-10 h-10 mb-3 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
                  ✨
                </div>
                <h3 className="font-bold text-gray-900">Premium Wood</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Hand-selected, sustainable high-quality Wooden.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="group p-4 rounded-2xl border border-stone-100 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-stone-200 transition-all duration-300">
                <div className="w-10 h-10 mb-3 rounded-full bg-green-100 flex items-center justify-center text-green-700 group-hover:scale-110 transition-transform">
                  🚚
                </div>
                <h3 className="font-bold text-gray-900">Fast Delivery</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Carefully packaged and shipped to your door.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="group p-4 rounded-2xl border border-stone-100 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-stone-200 transition-all duration-300">
                <div className="w-10 h-10 mb-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600 mt-1">
                  100% encrypted and safe transactions.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="group p-4 rounded-2xl border border-stone-100 bg-white/50 hover:bg-white hover:shadow-xl hover:shadow-stone-200 transition-all duration-300">
                <div className="w-10 h-10 mb-3 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
                  💬
                </div>
                <h3 className="font-bold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Our experts are always here to help you.
                </p>
              </div>
            </div>

            <button className="mt-10 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-amber-800 transition-colors shadow-lg shadow-gray-200">
              Explore Collection
            </button>
          </div>

          {/* Right: Floating Image Section */}
          <div className="md:w-1/2 flex justify-center relative">
            {/* Decorative background circle */}
            <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-3xl scale-75 animate-pulse"></div>

            <img
              src="src/assets/Images/nono-removebg-preview.png"
              alt="Wooden Products"
              className="relative z-10 w-full max-w-[450px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-float"
            />
          </div>
        </section>

        {/* Add this to your Global CSS for the floating effect */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-30px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}</style>
      </div>

      <section className="bg-green-600 py-16 px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join Thousands of Happy Customers!
        </h2>
        <p className="mb-6">
          Subscribe now and get exclusive offers straight to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-3 rounded-l-lg text-gray-800 w-1/3 max-w-md"
        />
        <button className="bg-white text-green-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-200 transition">
          Subscribe
        </button>
      </section>

      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Ravi Kumar",
              feedback:
                "The quality of the wooden products is outstanding! Fast delivery and excellent customer service.",
            },
            {
              name: "Rahul Sharma",
              feedback:
                "I love the craftsmanship of the chakla and belan. They add a rustic charm to my kitchen!",
            },
            {
              name: "Suresh Patel",
              feedback:
                "Highly recommend AG Traders for anyone looking for premium kitchen essentials. Great value for money!",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Blog
        </h2>
        <div className="max-w-4xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "5 Benefits of Using Wooden Kitchen Tools",
              excerpt:
                "Discover why wooden kitchen tools are a must-have for every home chef. From durability to aesthetics, learn the top benefits of choosing wood.",
            },
            {
              title: "How to Care for Your Wooden Products",
              excerpt:
                "Keep your wooden kitchen essentials looking new with our expert care tips. Learn how to clean, oil, and maintain your wooden items for long-lasting beauty.",
            },
            {
              title: "Top 10 Wooden Products for Your Kitchen",
              excerpt:
                "Upgrade your kitchen with our top 10 must-have wooden products. From classic chakla to stylish cutting boards, find the perfect pieces to enhance your cooking experience.",
            },
          ].map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-700 py-16 px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Elevate Your Kitchen?
        </h2>
        <p className="mb-6">
          Explore our premium collection of wooden and marble kitchen essentials
          and experience the difference today!
        </p>
        <a
          href="/blog"
          className="inline-block px-8 py-3 bg-white text-green-700 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Shop Now
        </a>
      </section>

      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="max-w-4xl mx-auto text-center text-gray-700">
          <p className="mb-4">
            Founded in 1965, AG Traders has been a family-owned business
            dedicated to providing premium wooden and marble kitchen essentials.
            With over 50 years of experience, we pride ourselves on our
            craftsmanship, quality, and customer satisfaction. Our products are
            carefully crafted using sustainable materials and traditional
            techniques, ensuring that each piece is not only beautiful but also
            durable and functional. We are committed to delivering exceptional
            products and service to our customers worldwide.
          </p>
        </div>
      </section>
    </>
  );
}
