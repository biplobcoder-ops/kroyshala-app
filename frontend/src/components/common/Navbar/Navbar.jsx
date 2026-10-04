import React, { useEffect, useRef, useState } from "react";
import {
  FiShoppingBag, FiHome, FiPackage, FiGrid, FiShoppingCart,
  FiHeart, FiUser, FiMapPin, FiLock, FiLogOut, FiMenu, FiX,
  FiChevronDown, FiSearch, FiTruck, FiShield, FiLogIn, FiUserPlus, FiBarChart2,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../ui/Avatar/Avatar";
import Button from "../../ui/Button/Button";
import Badge from "../../ui/Badge/Badge";
import Input from "../../ui/Input/Input";
import { logoutUser } from "../../../features/auth/services/authApi2";
import { clearUser } from "../../../features/auth/store/authSlice2";
import { clearCart } from "../../../features/cart/store/cartSlice";
import { clearWishlist } from "../../../features/wishlist/store/wishlistSlice";
import useDebounce from "../../../hooks/useDebounce";
import {
  getSearchSuggestions,
  clearSuggestions,
} from "../../../features/search/store/searchSlice";

const navigationItems = [
  { id: "home", label: "Home", path: "/", icon: <FiHome /> },
  { id: "products", label: "Products", path: "/products", icon: <FiPackage /> },
  { id: "categories", label: "Categories", path: "/categories", icon: <FiGrid /> },
];

const bottomNavigationItems = [
  { id: "home", label: "Home", path: "/", icon: <FiHome /> },
  { id: "products", label: "Shop", path: "/products", icon: <FiPackage /> },
  { id: "cart", label: "Cart", path: "/cart", icon: <FiShoppingCart /> },
  { id: "wishlist", label: "Wishlist", path: "/wishlist", icon: <FiHeart /> },
  { id: "account", label: "Account", path: "/account/profile", icon: <FiUser /> },
];

const mobileSidebarItems = [
  { id: "home", label: "Home", icon: <FiHome />, path: "/" },
  { id: "products", label: "Products", icon: <FiPackage />, path: "/products" },
  { id: "categories", label: "Categories", icon: <FiGrid />, path: "/categories" },
  { id: "cart", label: "Cart", icon: <FiShoppingCart />, path: "/cart" },
  { id: "wishlist", label: "Wishlist", icon: <FiHeart />, path: "/wishlist" },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart?.totalItems || 0);
  const wishlistCount = useSelector((state) => state.wishlist?.items?.length || 0);
  const { suggestions, loading: searchLoading } = useSelector((state) => state.search);

  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const isAdmin = user?.role === "admin";

  const profileItems = isAdmin
    ? [
        { id: "admin", label: "Admin Panel", icon: <FiBarChart2 />, path: "/admin" },
        { id: "divider-1", divider: true },
        { id: "logout", label: "Logout", icon: <FiLogOut />, path: null, danger: true },
      ]
    : [
        { id: "profile", label: "My Profile", icon: <FiUser />, path: "/account/profile" },
        { id: "orders", label: "My Orders", icon: <FiPackage />, path: "/orders" },
        { id: "addresses", label: "My Address", icon: <FiMapPin />, path: "/account/addresses" },
        { id: "change-password", label: "Change Password", icon: <FiLock />, path: "/account/change-password" },
        { id: "divider-1", divider: true },
        { id: "logout", label: "Logout", icon: <FiLogOut />, path: null, danger: true },
      ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim().length >= 2) {
      dispatch(getSearchSuggestions(debouncedSearchTerm));
      setIsSearchOpen(true);
    } else {
      dispatch(clearSuggestions());
      setIsSearchOpen(false);
    }
  }, [debouncedSearchTerm, dispatch]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    if (path === "/account/profile") {
      return location.pathname === path || location.pathname.startsWith("/account/profile");
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsProfileOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target)) setIsSearchOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
        setIsProfileOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isSidebarOpen]);

  const handleLogout = async () => {
    try {
      try {
        await logoutUser();
      } catch (error) {
        console.log("Logout API error:", error);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("accessToken");
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearWishlist());

    setIsSidebarOpen(false);
    setIsProfileOpen(false);

    navigate("/", { replace: true });
  };

  const handleProfileItemClick = (item) => {
    setIsProfileOpen(false);
    setIsSidebarOpen(false);
    if (item.danger) handleLogout();
    else if (item.path) {
      navigate(item.path);
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    dispatch(clearSuggestions());
    setIsSearchOpen(false);
  };

  const handleProductClick = (slug) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    dispatch(clearSuggestions());
    navigate(`/products/${slug}`);
  };

  const isDropdownItemActive = (path) => {
    if (!path) return false;
    if (path === "/account/profile") {
      return location.pathname === path || location.pathname.startsWith("/account/profile");
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {/* ========== ANNOUNCEMENT BAR ========== */}
      <div className="hidden bg-neutral-900 text-white md:block">
        <div className="mx-auto flex h-9 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8 text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <FiTruck className="h-3.5 w-3.5 text-primary-400" />
              <span className="text-neutral-300">Free delivery over ৳5000</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiShield className="h-3.5 w-3.5 text-primary-400" />
              <span className="text-neutral-300">100% Secure Payment</span>
            </span>
          </div>
          <div className="flex items-center gap-5 text-neutral-300">
            <button className="hover:text-white transition-colors">Help Center</button>
            <span className="h-3 w-px bg-neutral-700" />
            <button className="hover:text-white transition-colors">Track Order</button>
          </div>
        </div>
      </div>

      {/* ========== MAIN NAVBAR ========== */}
      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? "border-neutral-200 shadow-sm"
            : "border-transparent shadow-none"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-3 sm:px-4 lg:px-8">
          <div className="flex h-16 items-center gap-2 sm:gap-3 lg:h-[72px]">
            {/* ----- Logo ----- */}
            <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5 group">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white shadow-sm transition-all duration-200 group-hover:bg-primary-700 group-hover:shadow-md">
                <FiShoppingBag className="h-5 w-5" />
              </div>
              <div className="block">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 font-display">
                  Kroyshala
                </span>
                <p className="hidden sm:block text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-400">
                  Premium Shopping
                </p>
              </div>
            </Link>

            {/* ----- Desktop Search ----- */}
            <div ref={searchRef} className="hidden flex-1 justify-center px-4 md:flex">
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  leftIcon={<FiSearch />}
                  className="!h-11 !rounded-xl !border-neutral-200 !bg-neutral-50 focus:!bg-white focus:!border-primary-500"
                />
                {isSearchOpen && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-neutral-200 bg-white shadow-xl animate-slide-down">
                    {searchLoading && (
                      <div className="p-4 text-center text-sm text-neutral-500">
                        <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600" />
                        <span className="ml-2">Searching...</span>
                      </div>
                    )}
                    {!searchLoading && suggestions?.totalResults === 0 && searchTerm.trim().length >= 2 && (
                      <div className="p-6 text-center">
                        <p className="text-sm font-medium text-neutral-900">No results found</p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Try different keywords for "{searchTerm}"
                        </p>
                      </div>
                    )}
                    {suggestions?.products?.length > 0 && (
                      <div>
                        <p className="bg-neutral-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                          Products
                        </p>
                        {suggestions.products.map((product) => (
                          <button
                            key={product._id}
                            type="button"
                            onClick={() => handleProductClick(product.slug)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-primary-50"
                          >
                            {product.images?.[0]?.url ? (
                              <img
                                src={product.images[0].url}
                                alt={product.name}
                                className="h-12 w-12 rounded-lg object-cover border border-neutral-100"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-100">
                                <FiPackage className="h-6 w-6 text-neutral-400" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-neutral-900">
                                {product.name}
                              </p>
                              <p className="text-xs font-semibold text-primary-600">
                                ৳{product.discountPrice || product.price}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {suggestions?.categories?.length > 0 && (
                      <div>
                        <p className="bg-neutral-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                          Categories
                        </p>
                        {suggestions.categories.map((category) => (
                          <button
                            key={category._id}
                            type="button"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchTerm("");
                              navigate(`/categories/${category.slug}`);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-primary-50"
                          >
                            <FiGrid className="h-4 w-4 text-neutral-400" />
                            <span className="text-sm text-neutral-900">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* ----- Right Actions ----- */}
            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1.5 ml-auto">
              {!user && (
                <div className="hidden md:flex items-center gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    rounded="lg"
                    leftIcon={<FiLogIn />}
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    rounded="lg"
                    leftIcon={<FiUserPlus />}
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {user && !isAdmin && (
                <>
                  <Link
                    to="/wishlist"
                    aria-label="Wishlist"
                    className={`relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors md:flex ${
                      isActive("/wishlist")
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <FiHeart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/cart"
                    aria-label="Shopping cart"
                    className={`relative hidden h-10 w-10 items-center justify-center rounded-full transition-colors md:flex ${
                      isActive("/cart")
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {!user && (
                <div className="flex md:hidden items-center gap-0.5 sm:gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    rounded="lg"
                    onClick={() => navigate("/login")}
                    className="!h-9 !px-3 !text-xs"
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    rounded="lg"
                    onClick={() => navigate("/register")}
                    className="!h-9 !px-3 !text-xs"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {user && !isAdmin && (
                <>
                  <Link
                    to="/wishlist"
                    aria-label="Wishlist"
                    className={`relative flex h-10 w-9 sm:w-10 items-center justify-center rounded-full transition-colors md:hidden ${
                      isActive("/wishlist")
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <FiHeart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to="/cart"
                    aria-label="Shopping cart"
                    className={`relative flex h-10 w-9 sm:w-10 items-center justify-center rounded-full transition-colors md:hidden ${
                      isActive("/cart")
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-100"
                    }`}
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {!isAdmin && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  rounded="lg"
                  aria-label="Open navigation menu"
                  onClick={() => setIsSidebarOpen(true)}
                  className="!h-10 !w-9 sm:!w-10 !p-0 text-neutral-700 md:hidden"
                >
                  <FiMenu className="h-5 w-5" />
                </Button>
              )}

              {/* Admin Avatar */}
              {user && isAdmin && (
                <div ref={profileRef} className="relative shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    rounded="full"
                    aria-label="Open user menu"
                    aria-expanded={isProfileOpen}
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="!h-11 !px-2 !py-1 hover:bg-neutral-100"
                  >
                    <Avatar
                      src={user.image?.url || ""}
                      name={user.name}
                      size="sm"
                      rounded="full"
                      border
                      className="shrink-0"
                    />
                  </Button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl animate-slide-down">
                      <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-3">
                        <p className="truncate text-sm font-semibold text-neutral-900">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-neutral-500">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <button
                          type="button"
                          onClick={() => handleProfileItemClick({ path: "/admin" })}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <FiBarChart2 className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FiLogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Customer Profile Dropdown (Desktop) */}
              {user && !isAdmin && (
                <div ref={profileRef} className="relative hidden shrink-0 md:block">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    rounded="full"
                    aria-label="Open user menu"
                    aria-expanded={isProfileOpen}
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="!h-11 !px-2 !py-1 hover:bg-neutral-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        src={user.image?.url || ""}
                        name={user.name}
                        size="sm"
                        rounded="full"
                        border
                        className="shrink-0"
                      />
                      <div className="hidden lg:block text-left">
                        <p className="max-w-28 truncate text-sm font-semibold leading-5 text-neutral-800">
                          {user.name?.split(" ")[0]}
                        </p>
                        <p className="max-w-28 truncate text-[10px] leading-3 text-neutral-500 capitalize">
                          {user.role}
                        </p>
                      </div>
                      <FiChevronDown
                        className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </Button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-[60] w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl animate-slide-down">
                      <div className="border-b border-neutral-100 bg-neutral-50 px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={user.image?.url || ""}
                            name={user.name}
                            size="md"
                            rounded="full"
                            border
                            shadow
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-neutral-900">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-neutral-500">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {profileItems.map((item) => {
                          if (item.divider)
                            return (
                              <div key={item.id} className="my-1 border-t border-neutral-100" />
                            );
                          const isActiveItem = isDropdownItemActive(item.path);
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleProfileItemClick(item)}
                              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                item.danger
                                  ? "text-red-600 hover:bg-red-50"
                                  : isActiveItem
                                  ? "bg-primary-50 text-primary-700"
                                  : "text-neutral-700 hover:bg-neutral-100"
                              }`}
                            >
                              <span
                                className={`h-4 w-4 ${
                                  isActiveItem ? "text-primary-600" : ""
                                }`}
                              >
                                {item.icon}
                              </span>
                              <span className="flex-1 text-left">{item.label}</span>
                              {isActiveItem && (
                                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ----- Desktop Navigation Links ----- */}
          {!isAdmin && (
            <nav className="hidden h-11 items-center gap-1 md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-primary-600"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary-600" />
                  )}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* ========== MOBILE SEARCH BAR ========== */}
      <div className="border-b border-neutral-200 bg-white p-3 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            leftIcon={<FiSearch />}
            rightIcon={
              searchTerm ? (
                <button type="button" onClick={handleSearchClear} className="cursor-pointer">
                  <FiX />
                </button>
              ) : null
            }
            className="!h-10 !rounded-xl !bg-neutral-100 !border-transparent focus:!bg-white focus:!border-primary-500"
          />
        </form>
      </div>

      {/* ========== MOBILE BOTTOM NAVIGATION ========== */}
      {!isAdmin && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 bg-white/95 backdrop-blur-md md:hidden safe-area-bottom">
          <div className="flex items-center justify-around">
            {bottomNavigationItems.map((item) => {
              const itemCount =
                item.id === "cart"
                  ? cartCount
                  : item.id === "wishlist"
                  ? wishlistCount
                  : null;
              const isItemActive = isActive(item.path);
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium transition-colors duration-200 ${
                    isItemActive
                      ? "text-primary-600"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    {item.icon}
                    {itemCount > 0 && (
                      <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                        {itemCount}
                      </span>
                    )}
                  </span>
                  <span className="truncate">{item.label}</span>
                  {isItemActive && (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary-600" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      )}

      {/* ========== MOBILE SIDEBAR OVERLAY ========== */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[90] bg-neutral-900/40 backdrop-blur-[2px] md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========== MOBILE SIDEBAR ========== */}
      {isSidebarOpen && !isAdmin && (
        <aside className="fixed inset-y-0 left-0 z-[100] flex w-[300px] max-w-[88vw] flex-col border-r border-neutral-200 bg-white shadow-2xl md:hidden animate-slide-right">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 px-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
                <FiShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-neutral-900 font-display">
                Kroyshala
              </span>
            </Link>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              rounded="full"
              aria-label="Close navigation menu"
              onClick={() => setIsSidebarOpen(false)}
              className="!h-9 !w-9 !p-0 text-neutral-500"
            >
              <FiX className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Menu
            </p>
            <div className="space-y-1">
              {mobileSidebarItems.map((item) => {
                const itemCount =
                  item.id === "cart"
                    ? cartCount
                    : item.id === "wishlist"
                    ? wishlistCount
                    : null;
                const isItemActive = isActive(item.path);
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${
                      isItemActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center ${
                        isItemActive ? "text-primary-600" : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {itemCount > 0 && (
                      <Badge variant="primary" size="sm" rounded="full">
                        {itemCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            {user && (
              <>
                <p className="mb-2 mt-5 px-3 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                  Account
                </p>
                <div className="space-y-1">
                  <Link
                    to="/account/profile"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <FiUser className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/orders"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <FiPackage className="h-5 w-5" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/account/addresses"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <FiMapPin className="h-5 w-5" />
                    <span>My Address</span>
                  </Link>
                  <Link
                    to="/account/change-password"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                  >
                    <FiLock className="h-5 w-5" />
                    <span>Change Password</span>
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-5 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </nav>
        </aside>
      )}
    </>
  );
};

export default Navbar;
