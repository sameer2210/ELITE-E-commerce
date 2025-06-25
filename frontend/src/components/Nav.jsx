// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// const Nav = () => {

//   const { user } = useSelector((state) => state.userReducer)

//   return (
//     <div className="flex gap-x-10 mb-10">
//       <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/">
//         Home
//       </NavLink>
//       {user ? (
//         <>
//           <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/settings">
//             User Settings
//           </NavLink>
//           {user?.isAdmin && (
//             <NavLink className={({ isActive }) => isActive ? "text-red-400" : ""} to="/create-product">
//               Create Product
//             </NavLink>
//           )}
//           <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/cart">
//             Cart
//           </NavLink>
//         </>
//       ) : (
//         <>
//           <NavLink className={({ isActive }) => (isActive ? "text-red-500" : "")} to="/signin">
//             Sign in
//           </NavLink>
//         </>
//       )}
//       <NavLink
//         className={({ isActive }) => (isActive ? "text-red-400" : "")} to="/about">
//         About
//       </NavLink>
//     </div>
//   );
// };

// export default Nav;

//------------------------------------------------------------------------------------------------

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Filter
} from "lucide-react";

const Nav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    format: "",
    timeOfDay: "",
    teaType: "",
    country: ""
  });

  const filterOptions = {
    category: [
      "Luxury Watches",
      "Smart Watches",
      "Vintage",
      "Sport",
      "Dress Watches"
    ],
    format: ["Analog", "Digital", "Hybrid", "Chronograph"],
    timeOfDay: ["Business Hours", "Evening", "Sports", "Casual"],
    teaType: ["Mechanical", "Quartz", "Automatic", "Solar"],
    country: ["Switzerland", "Japan", "Germany", "USA", "Italy"]
  };

  // Handle scroll effect for sticky navbar and filter bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      setShowFilterBar(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setSearchOpen(false);
        setUserMenuOpen(false);
        setOpenDropdown(null);
      }
    };
    if (isSearchOpen || isUserMenuOpen || openDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isSearchOpen, isUserMenuOpen, openDropdown]);

  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value
    }));
    setOpenDropdown(null);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter((value) => value !== "").length;
  };

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-2 px-4 text-center text-xs sm:text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <span className="relative inline-flex items-center gap-2 font-medium">
          Exclusive Collection - Handcrafted Luxury Timepieces
        </span>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-200/30"
            : "bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <NavLink to="/" className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                    ÉLITE
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-wider -mt-1">
                    LUXURY COLLECTION
                  </span>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-md group overflow-hidden ${
                    isActive
                      ? "text-red-600 shadow-md shadow-red-500/20"
                      : "text-gray-700 hover:text-slate-900 hover:bg-gray-50 hover:shadow-sm"
                  }`
                }
              >
                <span className="relative z-10">HOME</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </NavLink>

              {user ? (
                <>
                  {user?.isAdmin && (
                    <NavLink
                      to="/create-product"
                      className={({ isActive }) =>
                        `relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-md group overflow-hidden ${
                          isActive
                            ? "text-white bg-gradient-to-r from-red-500 to-red-400 shadow-md shadow-red-400/20"
                            : "text-gray-700 hover:text-slate-900 hover:bg-amber-50 hover:shadow-sm"
                        }`
                      }
                    >
                      <span className="relative z-10">ADMIN</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </NavLink>
                  )}
                </>
              ) : (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-md group overflow-hidden ${
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-blue-500 shadow-md shadow-blue-500/20"
                        : "text-gray-700 hover:text-slate-900 hover:bg-blue-50 hover:shadow-sm"
                    }`
                  }
                >
                  <span className="relative z-10">SIGN IN</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </NavLink>
              )}

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 rounded-md group overflow-hidden ${
                    isActive
                      ? "text-red-600 shadow-md shadow-red-400/20"
                      : "text-gray-700 hover:text-slate-900 hover:bg-gray-50 hover:shadow-sm"
                  }`
                }
              >
                <span className="relative z-10">ABOUT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </NavLink>
            </div>

            {/* Right Side Icon Controls */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {/* Search Icon */}
              <div className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchOpen(!isSearchOpen);
                    setUserMenuOpen(false);
                  }}
                  className="p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-full transform hover:scale-105"
                  title="Search"
                >
                  <Search className="w-5 h-5 transition-transform duration-200" />
                </button>
                {isSearchOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-xl border border-gray-100 p-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search luxury timepieces..."
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-500 text-center">
                      Discover our exclusive collection
                    </div>
                  </div>
                )}
              </div>

              {/* Location Icon */}
              <button
                className="p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-full transform hover:scale-105"
                title="Find Store"
              >
                <MapPin className="w-5 h-5 transition-transform duration-200" />
              </button>

              {/* User Profile Icon */}
              {user ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!isUserMenuOpen);
                      setSearchOpen(false);
                    }}
                    className="p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-full transform hover:scale-105"
                    title="Account"
                  >
                    <User className="w-5 h-5 transition-transform duration-200" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-100 p-2 animate-in slide-in-from-top-2 duration-300">
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || "User"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.isAdmin ? "Administrator" : "Member"}
                        </div>
                      </div>
                      <NavLink
                        to="/settings"
                        className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Profile Settings
                      </NavLink>
                      {user.isAdmin && (
                        <NavLink
                          to="/create-product"
                          className="block px-3 py-2 rounded-lg hover:bg-amber-50 text-sm font-medium text-gray-700"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Panel
                        </NavLink>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button className="block px-3 py-2 rounded-lg hover:bg-red-50 w-full text-left text-sm font-medium text-red-600">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/signin"
                  className="p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-full transform hover:scale-105"
                  title="Sign In"
                >
                  <User className="w-5 h-5 transition-transform duration-200" />
                </NavLink>
              )}

              {/* Shopping Cart Icon */}
              <NavLink
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-full transform hover:scale-105"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-md">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-slate-900 transition-all duration-300 hover:bg-gray-50 rounded-lg"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-white to-gray-50 rounded-b-xl">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOME
                </NavLink>
                {user ? (
                  <>
                    {user?.isAdmin && (
                      <NavLink
                        to="/create-product"
                        className={({ isActive }) =>
                          `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                            isActive
                              ? "text-red-600 bg-red-50"
                              : "text-gray-900 hover:bg-amber-100"
                          }`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        ADMIN
                      </NavLink>
                    )}
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-red-600 bg-red-50"
                            : "text-gray-900 hover:bg-gray-100"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      PROFILE
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                          isActive
                            ? "text-red-600 bg-red-50"
                            : "text-gray-900 hover:bg-gray-100"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      CART {cartCount > 0 && `(${cartCount})`}
                    </NavLink>
                  </>
                ) : (
                  <NavLink
                    to="/signin"
                    className={({ isActive }) =>
                      `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-900 hover:bg-blue-100"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SIGN IN
                  </NavLink>
                )}
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block px-4 py-2 font-medium text-base rounded-lg transition-all duration-300 ${
                      isActive
                        ? "text-red-600 bg-red-50"
                        : "text-gray-900 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ABOUT
                </NavLink>
                {user && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name?.split(" ")[0] || "User"}
                        </div>
                        <div className="text-xs text-gray-600">
                          {user.isAdmin ? "Administrator" : "Member"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Overlay for dropdowns */}
        {(isSearchOpen || isUserMenuOpen) && (
          <div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
            onClick={() => {
              setSearchOpen(false);
              setUserMenuOpen(false);
            }}
          />
        )}
      </nav>

      {/* Animated Filter Bar */}
      <div
        className={`sticky top-16 z-40 bg-gray-50 backdrop-blur-md border-b border-gray-200/50 transition-all duration-500 ease-out ${
          showFilterBar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 space-y-3 sm:space-y-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 border-2 border-white rounded-full"></span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {getActiveFilterCount() > 0 ? `Filtered: ` : ""}
                <span className="text-slate-900 font-semibold">products</span>
              </span>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 flex-1 max-w-full sm:max-w-3xl">
              {Object.entries(filterOptions).map(([filterKey, options]) => (
                <div key={filterKey} className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDropdown(
                        openDropdown === filterKey ? null : filterKey
                      );
                    }}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      activeFilters[filterKey]
                        ? "text-red-600 bg-red-50"
                        : "text-gray-700 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <span className="capitalize">
                      {filterKey === "teaType"
                        ? "Movement"
                        : filterKey.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        openDropdown === filterKey ? "rotate-180" : ""
                      }`}
                    />
                    {activeFilters[filterKey] && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </button>
                  {openDropdown === filterKey && (
                    <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 p-2 animate-in slide-in-from-top-2 duration-300 z-50">
                      <div className="space-y-1">
                        {options.map((option) => (
                          <button
                            key={option}
                            onClick={() =>
                              handleFilterChange(filterKey, option)
                            }
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium ${
                              activeFilters[filterKey] === option
                                ? "bg-red-50 text-red-700"
                                : "text-gray-700 hover:bg-gray-50 hover:text-slate-900"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {activeFilters[filterKey] === option && (
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                      {activeFilters[filterKey] && (
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={() => handleFilterChange(filterKey, "")}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50"
                          >
                            Clear filter
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Filter Toggle and Clear */}
            <div className="flex items-center space-x-2">
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={() =>
                    setActiveFilters({
                      category: "",
                      format: "",
                      timeOfDay: "",
                      teaType: "",
                      country: ""
                    })
                  }
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Clear All ({getActiveFilterCount()})
                </button>
              )}
              <button className="p-2 text-gray-600 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Tags */}
        {getActiveFilterCount() > 0 && (
          <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Active Filters:
              </span>
              {Object.entries(activeFilters).map(
                ([key, value]) =>
                  value && (
                    <div
                      key={key}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"
                    >
                      <span>{value}</span>
                      <button
                        onClick={() => handleFilterChange(key, "")}
                        className="hover:text-red-900 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for filter dropdowns */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-30 bg-black/10"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  );
};

export default Nav;
