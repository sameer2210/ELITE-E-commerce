import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asynclogoutuser } from '../../store/actions/userActions';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  Mic,
  Gift,
} from 'lucide-react';

// Move navigationData outside the component for performance
const navigationData = {
  'New In': { featured: [], categories: [], spotlight: {} },
  'Men': {
    featured: { title: 'Featured Categories', brands: ['Clothing', 'Footwear', 'Accessories', 'Grooming'] },
    categories: {
      Clothing: { items: ['Shirts', 'T-Shirts', 'Jeans', 'Suits'] },
      Footwear: { items: ['Casual Shoes', 'Formal Shoes', 'Sneakers'] },
    },
    spotlight: {
      title: 'New Collection',
      image: '/api/placeholder/300/400',
      brand: 'Premium Menswear',
      description: 'Elevate your style with our curated collection',
      cta: 'SHOP NOW',
    },
  },
  'Women': {
    featured: { title: 'Featured Categories', brands: ['Clothing', 'Footwear', 'Accessories', 'Beauty'] },
    categories: {
      Clothing: { items: ['Dresses', 'Tops', 'Skirts', 'Ethnic Wear'] },
      Footwear: { items: ['Heels', 'Flats', 'Sandals'] },
    },
    spotlight: {
      title: 'Trending Now',
      image: '/api/placeholder/300/400',
      brand: "Women's Fashion",
      description: "Discover the latest trends in women's fashion",
      cta: 'EXPLORE',
    },
  },
  'Watches & Jewellery': {
    featured: {
      title: 'Featured Brands',
      brands: ['Rado', 'Longines', 'Tissot', 'Versace', 'Cartier', 'Rolex'],
    },
    categories: {
      TimeValue: { items: ['Cartier', 'IWC Schaffhausen', 'Jaeger-LeCoultre'] },
      'Re-loved Watches': { items: ['Rolex', 'Omega', 'Tudor'] },
      'Fine Jewellery': { items: ['Bulgari', 'Piaget', 'De Beers Forevermark'] },
      Gender: { items: ['Men', 'Women', 'Unisex'] },
      Material: { items: ['Stainless Steel', 'Genuine Leather', '18k Gold'] },
    },
    spotlight: {
      title: 'Spotlight On',
      image: '/api/placeholder/300/400',
      brand: 'Cartier',
      description: 'Timeless designs that stand for elegance, beauty & precision',
      cta: 'DISCOVER',
    },
  },
  'Home': { featured: [], categories: [], spotlight: {} },
  'Kids': { featured: [], categories: [], spotlight: {} },
  'Beauty': { featured: [], categories: [], spotlight: {} },
  'Indiluxe': { featured: [], categories: [], spotlight: {} },
  'Brands': { featured: [], categories: [], spotlight: {} },
};


const NavDropdown = ({ menuItem, data, activeDropdown, handleMouseEnter, handleMouseLeave }) => (
  <div
    key={menuItem}
    className="relative dropdown-container"
    onMouseEnter={() => handleMouseEnter(menuItem)}
    onMouseLeave={handleMouseLeave}
  >
    <button
      className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
      aria-haspopup="true"
      aria-expanded={activeDropdown === menuItem}
      tabIndex={0}
    >
      <span>{menuItem}</span>
      <ChevronDown className="w-4 h-4" />
    </button>
    {activeDropdown === menuItem && data && (
      <div className="absolute   mt-2 w-screen  bg-stone-950 rounded-xl shadow-2xl  animate-in slide-in-from-top-4 duration-300 z-50">
        <div className="p-6 grid grid-cols-4 gap-6">
          {/* Featured Section */}
          {data.featured && data.featured.brands && data.featured.brands.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-gray-700 pb-2">
                {data.featured.title}
              </h3>
              <div className="space-y-2">
                {data.featured.brands.map((brand, index) => (
                  <button
                    key={index}
                    className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Categories Section */}
          {data.categories && Object.keys(data.categories).length > 0 && (
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {Object.entries(data.categories).map(([category, catData]) => (
                <div key={category} className="space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase">{category}</h3>
                  <div className="space-y-1">
                    {catData.items && catData.items.map((item, idx) => (
                      <button
                        key={idx}
                        className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Spotlight Section */}
          {data.spotlight && data.spotlight.title && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {data.spotlight.title}
                </h3>
                <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                  {data.spotlight.image && (
                    <img
                      src={data.spotlight.image}
                      alt={data.spotlight.brand}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-white text-lg">{data.spotlight.brand}</h4>
                  <p className="text-sm text-gray-400">{data.spotlight.description}</p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    {data.spotlight.cta}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);

const Nav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setSearchOpen(false);
        setUserMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    if (isSearchOpen || isUserMenuOpen || activeDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen, isUserMenuOpen, activeDropdown]);

  const dropdownTimeoutRef = useRef(null);

  // Memoize menu keys for performance
  const menuKeys = useMemo(() => Object.keys(navigationData), []);

  const handleMouseEnter = (menuItem) => {
    clearTimeout(dropdownTimeoutRef.current);
    if (activeDropdown === menuItem) return;
    const data = navigationData[menuItem];
    if (
      data &&
      (data.featured?.brands?.length > 0 ||
        Object.keys(data.categories || {}).length > 0 ||
        data.spotlight?.title)
    ) {
      setActiveDropdown(menuItem);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLogout = async () => {
    try {
      await dispatch(asynclogoutuser(user.id))
      toast.success("Logged out successfully");
    } catch {
      toast.error("Failed to log out");
    }
  }

  return (
    <>
      {/* Premium Top Bar */}
      <div className="bg-gradient-to-r from-stone-950 via-black to-gray-950 text-white py-2 px-4 text-center text-xs sm:text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <Gift className="w-4 h-4 text-white" />
            <span>Free shipping on orders above ₹2999</span>
          </span>
          <span className="text-xs">Customer Care: 1800-123-4567 | Store Locator</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-out 
          ${scrolled ? ' bg-stone-950 backdrop-blur-xl shadow-md' : 'bg-stone-950 '} `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-white/95  font-sans tracking-tight">ÉLITE LUXURY</span>
              </NavLink>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-12 py-2 border border-gray-700 rounded-full bg-stone-900 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm placeholder-gray-400 transition-all duration-200"
                  placeholder="What are you looking for?"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button className="p-1 hover:bg-gray-800 rounded-full transition-colors">
                    <Mic className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <button
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-800"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account */}
              {user ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!isUserMenuOpen);
                      setSearchOpen(false);
                    }}

                    className="flex items-center space-x-1 p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-800"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-stone-950 rounded-lg shadow-xl border border-gray-800 p-2 animate-in slide-in-from-top-2 z-2">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <div className="text-sm font-medium  text-white">{user.name || "User"}</div>
                        <div className="text-xs text-gray-400">{user.isAdmin ? 'Admin' : 'Member'}</div>
                      </div>
                      <NavLink to="/settings" className="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg text-sm">
                        Profile
                      </NavLink>
                      <NavLink to="/contact" className="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg text-sm">
                        Contact
                      </NavLink>
                      <NavLink to="/wishlist" className="block px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-lg text-sm">
                        Wishlist
                      </NavLink>

                      {user.isAdmin && (
                        <NavLink to="/productCreate" className="block px-3 py-2 text-white hover:bg-red-500 rounded-lg text-sm">
                          Admin Panel
                        </NavLink>
                      )
                      }
                      <div className="border-t border-gray-700 my-1"></div>
                      <button onClick={handleLogout} className="block px-3 py-2 text-red-500 hover:text-white hover:bg-red-600 rounded-lg w-full text-left text-sm">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/signin" className="block px-3 py-2 text-white hover:bg-teal-600 rounded-lg text-sm">
                  SIGN IN
                </NavLink>
              )}


              {/* Shopping Cart */}
              <NavLink to="/cart" className="relative p-2 text-gray-100 hover:text-yellow-600 transition-colors rounded-full hover:bg-gray-800">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-center border-t border-gray-800 py-2">
            <div className="flex items-center space-x-6">
              {menuKeys.map((menuItem) => (
                <NavDropdown
                  key={menuItem}
                  menuItem={menuItem}
                  data={navigationData[menuItem]}
                  activeDropdown={activeDropdown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                />
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 animate-in slide-in-from-top-4 duration-300">
              <div className="px-4 pt-4 pb-6 space-y-2 bg-gray-900">
                {menuKeys.map((menuItem) => (
                  <NavLink
                    key={menuItem}
                    to={`/${menuItem.replace(/\s+/g, '').toLowerCase()}`}
                    className={({ isActive }) =>
                      `w-full text-left px-4 py-3 text-sm font-medium ${isActive ? 'text-white bg-gray-800' : 'text-gray-300'} hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-between`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    tabIndex={0}
                  >
                    {menuItem}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-full bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-100 text-sm placeholder-gray-400"
                  placeholder="What are you looking for?"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="ml-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400 text-center">Search our premium collection...</p>
            </div>
          </div>
        )}

      </nav>
    </>
  );
};

export default Nav;