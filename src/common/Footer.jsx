import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div>
        <footer className="bg-white ">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  A G <span className="text-indigo-600">Traders</span>
                </h2>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Premium wooden kitchen tools & traditional products crafted
                  with quality and care.
                </p>

                <div className="flex gap-4 mt-6">
                  {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                    (Icon, i) => (
                      <a
                        key={i}
                        href="#"
                        className="p-2 border rounded-full text-gray-600 hover:bg-indigo-600 hover:text-white transition"
                      >
                        <Icon size={14} />
                      </a>
                    ),
                  )}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {["Home", "About Us", "Products", "Contact", "FAQ"].map(
                    (link, i) => (
                      <li key={i}>
                        <a
                          href="/"
                          className="hover:text-indigo-600 transition"
                        >
                          {link}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Products */}
              <div>
                <h3 className="text-lg font-semibold font-semibold text-heading uppercase ">
                  Products
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  {[
                    "Cakla",
                    "Belan",
                    "Wooden Spoons",
                    "Masala Box",
                    "Chopping Board",
                  ].map((item, i) => (
                    <li key={i}>
                      <a
                        href="/product"
                        className="hover:text-indigo-600 transition"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-lg font-semibold font-semibold text-heading uppercase">
                  Newsletter
                </h3>
                <p className="text-sm font-semibold text-heading uppercase mb-4">
                  Subscribe for latest offers & updates.
                </p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border  rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 transition"
                  >
                    Go
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className=" border-gray-600  text-center text-sm text-gray-400">
            © {new Date().getFullYear()} AG Traders. All Rights Reserved. <br />
            Created by{" "}
            <span className="text-yellow-400 font-semibold">
              Abdul Azim Ansari
            </span>
          </div>

          {/* Bottom Bar */}
        </footer>
      </div>
    </>
  );
}
