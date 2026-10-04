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
  FiArrowRight,
} from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-neutral-900 text-neutral-400">
      {/* ========== NEWSLETTER SECTION ========== */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl font-display">
                Stay in the loop
              </h3>
              <p className="mt-2 text-sm text-neutral-400">
                Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full gap-2 lg:justify-end"
            >
              <div className="relative flex-1 max-w-md">
                <FiMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-800 py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 outline-none transition-colors focus:border-primary-500 focus:bg-neutral-800"
                />
              </div>
              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-700 active:scale-[0.98]"
              >
                <span className="hidden sm:inline">Subscribe</span>
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ========== MAIN FOOTER ========== */}
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                <FiShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                Kroyshala
              </span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Your trusted online shopping destination. Quality products, fast delivery,
              and secure payments — all in one place.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: <FiFacebook />, label: "Facebook" },
                { icon: <FiTwitter />, label: "Twitter" },
                { icon: <FiInstagram />, label: "Instagram" },
                { icon: <FiYoutube />, label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 transition-all hover:bg-primary-600 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Home", path: "/", icon: <FiHome /> },
                { label: "All Products", path: "/products", icon: <FiPackage /> },
                { label: "Categories", path: "/categories", icon: <FiGrid /> },
                { label: "Cart", path: "/cart", icon: <FiShoppingCart /> },
                { label: "Wishlist", path: "/wishlist", icon: <FiHeart /> },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="text-neutral-500 transition-colors group-hover:text-primary-500">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "My Profile", path: "/account/profile", icon: <FiUser /> },
                { label: "My Orders", path: "/orders", icon: <FiPackage /> },
                { label: "My Address", path: "/account/addresses", icon: <FiMapPin /> },
                { label: "Login", path: "/login", icon: <FiUser /> },
                { label: "Register", path: "/register", icon: <FiUser /> },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <span className="text-neutral-500 transition-colors group-hover:text-primary-500">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-primary-500">
                  <FiMail className="h-4 w-4" />
                </span>
                <span>support@kroyshala.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-primary-500">
                  <FiPhone className="h-4 w-4" />
                </span>
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-primary-500">
                  <FiMapPin className="h-4 w-4" />
                </span>
                <span className="mt-1">
                  Gulshan, Dhaka
                  <br />
                  Bangladesh
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========== BOTTOM BAR ========== */}
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-[1280px] px-4 py-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Kroyshala. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="h-3 w-px bg-neutral-700" />
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <span className="h-3 w-px bg-neutral-700" />
            <p>Made with ❤️ in Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
