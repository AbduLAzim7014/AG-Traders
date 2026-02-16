import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Demo credentials (replace with API later)
  const USER = {
    email: "admin@gmail.com",
    password: "123456",
  };

  const validate = () => {
    let err = {};
    if (!form.email) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      err.email = "Invalid email address";

    if (!form.password) err.password = "Password is required";
    else if (form.password.length < 6) err.password = "Min 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      if (form.email === USER.email && form.password === USER.password) {
        localStorage.setItem("auth", "true");
        navigate("/");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center  shadow from-indigo-600 to-purple-600 px-4  sm:py-[25px] lg-py-[10px] ">
        <div className=" bg-[white]  rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          {errors.general && (
            <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-center">
              {errors.general}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="123456"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-sm text-indigo-600"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="">Create By Abdul Azim</p>
          </form>
        </div>
      </div>

      <hr className="max-w-[50%] mx-auto " />
    </>
  );
}
