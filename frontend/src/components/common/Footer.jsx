import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiHome,
  FiPackage,
  FiGrid,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

// ==========================================
// Footer Component
// ==========================================

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
                <FiShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">Kroyshala</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Your trusted online shopping destination. Quality products,
              fast delivery, and secure payments.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-slate-400 hover:text-white transition">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition">
                <FiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-white transition">
                  <FiHome className="h-4 w-4" /> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="flex items-center gap-2 hover:text-white transition">
                  <FiPackage className="h-4 w-4" /> Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="flex items-center gap-2 hover:text-white transition">
                  <FiGrid className="h-4 w-4" /> Categories
                </Link>
              </li>
              <li>
                <Link to="/cart" className="flex items-center gap-2 hover:text-white transition">
                  <FiShoppingCart className="h-4 w-4" /> Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="flex items-center gap-2 hover:text-white transition">
                  <FiHeart className="h-4 w-4" /> Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/account/profile" className="flex items-center gap-2 hover:text-white transition">
                  <FiUser className="h-4 w-4" /> My Profile
                </Link>
              </li>
              <li>
                <Link to="/orders" className="flex items-center gap-2 hover:text-white transition">
                  <FiPackage className="h-4 w-4" /> My Orders
                </Link>
              </li>
              <li>
                <Link to="/account/addresses" className="flex items-center gap-2 hover:text-white transition">
                  <FiMapPin className="h-4 w-4" /> My Address
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center gap-2 hover:text-white transition">
                  <FiUser className="h-4 w-4" /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-2 hover:text-white transition">
                  <FiUser className="h-4 w-4" /> Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMail className="h-4 w-4 text-blue-400" />
                support@kroyshala.com
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 text-green-400" />
                +880 1700-000000
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="h-4 w-4 mt-0.5 text-red-400" />
                <span>
                  Gulshan, Dhaka
                  <br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Kroyshala. All rights reserved.</p>
          <p>Made with ❤️ in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;