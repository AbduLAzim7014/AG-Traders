import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaHome,
  FaMobileAlt,
} from "react-icons/fa";
import { auth, provider } from "../pages/config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import EmailOtpLogin from "./EmailOtpLogin"; // Ensure path is correct

// Assuming woodBg is still your belan image
import woodBg from "../assets/Images/belan.png";

export default function Login() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // States from your original file
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // New state to toggle UI
  const [useOtp, setUseOtp] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, emailOrPhone, password);
      navigate("/profile");
    } catch (err) {
      setError("Invalid Email or Password");
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      navigate("/profile");
    } catch (err) {
      setError("Google login failed");
    }
    setLoading(false);
  };

  // 3D Hover Effect logic preserved
  useEffect(() => {
    const card = cardRef.current;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left - width / 2;
      const y = e.clientY - top - height / 2;
      card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
    };
    const handleLeave = () => {
      card.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex justify-center items-center p-4 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${woodBg})` }}
    >
      {/* Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/30 hover:bg-white hover:text-black transition"
        >
          <FaHome /> Home
        </Link>
      </div>

      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl border border-white/30 transition-transform duration-300 animate-floating"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-white">
          AG Traders
        </h1>
        <p className="text-center text-white/70 mb-6 italic text-sm">
          Premium Wooden Kitchenware
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-200 border border-red-500/50 p-2 mb-4 rounded text-sm text-center">
            {error}
          </div>
        )}

        {!useOtp ? (
          <>
            <input
              type="text"
              placeholder="Enter Email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full p-3 mb-4 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-10 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 rounded-xl mb-3 hover:scale-105 transition shadow-lg"
            >
              {loading ? "Logging in..." : "SIGN IN"}
            </button>
          </>
        ) : (
          <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
            <EmailOtpLogin />
          </div>
        )}

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-white/20"></div>
          <span className="mx-4 text-white/50 text-xs">OR CONTINUE WITH</span>
          <div className="flex-grow border-t border-white/20"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={googleLogin}
            className="flex items-center justify-center bg-white text-black py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
          >
            <FaGoogle className="mr-2 text-red-500" /> Google
          </button>
          <button
            onClick={() => setUseOtp(!useOtp)}
            className="flex items-center justify-center bg-white/10 border border-white/30 py-2.5 rounded-xl text-sm text-white hover:bg-white/20 transition"
          >
            <FaMobileAlt className="mr-2 text-yellow-400" />
            {useOtp ? "Password" : "OTP Login"}
          </button>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          New to AG Traders?
          <Link
            to="/register"
            className="text-yellow-400 font-bold ml-1 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      <style>
        {`
        @keyframes float {
          0%,100% {transform: translateY(0)}
          50% {transform: translateY(-10px)}
        }
        .animate-floating{
          animation: float 4s ease-in-out infinite;
        }
        `}
      </style>
    </div>
  );
}
