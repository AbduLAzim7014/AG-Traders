import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../pages/config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import woodBg from "../assets/Images/yellow.png";

export default function Register() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  // 3D Hover Effect
  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();

      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;

      card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${woodBg})` }}
    >
      <ToastContainer />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Register Card */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/20 shadow-2xl backdrop-blur-lg border border-white/30 transition-transform duration-300 animate-floating"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-white font-medium">Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-white/30 rounded px-3 py-2 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-white font-medium">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-white/30 rounded px-3 py-2 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 text-white font-medium">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-white/30 rounded px-3 py-2 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="button"
              className="absolute right-3 top-9 text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-orange-500 text-white py-2 rounded shadow-lg transition-all duration-300"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm mt-4 text-center text-white/80">
          Already have an account?
          <Link to="/login" className="text-orange-400 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Floating Animation */}
      <style>
        {`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-floating{
          animation: float 4s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
