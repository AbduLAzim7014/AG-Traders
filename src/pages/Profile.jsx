import React, { useEffect, useState } from "react";
import { auth } from "../pages/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaBox,
  FaHeart,
  FaMapMarkerAlt,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const logoutUser = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}

      <div className="md:w-72 w-full bg-white shadow-md p-4 md:p-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <img
            src={user.photoURL || "https://i.pravatar.cc/100"}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full"
            alt=""
          />

          <div>
            <p className="text-xs md:text-sm text-gray-500">User Name </p>
            <h2 className="font-semibold text-sm md:text-base">
              {user.displayName || "User"}
            </h2>
          </div>
        </div>

        {/* Menu */}

        <ul className="mt-4 md:mt-6 flex md:block overflow-x-auto md:overflow-visible gap-4 md:space-y-4">
          <li
            onClick={() => setActiveTab("profile")}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
          >
            <FaUser /> My Profile
          </li>

          <li
            onClick={() => setActiveTab("orders")}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
          >
            <FaBox /> Orders
          </li>

          <li
            onClick={() => setActiveTab("wishlist")}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
          >
            <FaHeart /> Wishlist
          </li>

          <li
            onClick={() => setActiveTab("address")}
            className="flex items-center gap-2 md:gap-3 cursor-pointer hover:text-blue-600 whitespace-nowrap"
          >
            <FaMapMarkerAlt /> Address
          </li>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 md:gap-3 text-red-500 cursor-pointer whitespace-nowrap"
          >
            <FaSignOutAlt /> <Link to={"/login"}>Logout</Link>
          </button>
        </ul>
      </div>

      {/* Content */}

      <div className="flex-1 p-4 md:p-10">
        {/* PROFILE */}

        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-semibold">
                  {user.displayName || "Not Available"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">User ID</p>
                <p className="font-semibold break-all">{user.uid}</p>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS */}

        {activeTab === "orders" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">My Orders</h2>
            <p>No Orders Yet</p>
          </div>
        )}

        {/* WISHLIST */}

        {activeTab === "wishlist" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Wishlist</h2>
            <p>No Items In Wishlist</p>
          </div>
        )}

        {/* ADDRESS */}

        {activeTab === "address" && (
          <div className="bg-white shadow rounded-lg p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Manage Address
            </h2>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
