import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { asynclogoutuser } from '../../store/actions/userActions';
import { useProductSearch } from '../../hooks/productHook/useProductSearch';
import ProductSearchBar from '../search/ProductSearchBar';
import ProductSearchOverlay from '../search/ProductSearchOverlay';
import {
  Search,
  ShoppingBag,
  CreditCard,
  User,
  Menu,
  X,
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


const NavDropdown = ({ menuItem, activeDropdown, handleMouseEnter }) => (
  <div
    key={menuItem}
    className="relative"
    onMouseEnter={() => handleMouseEnter(menuItem)}
  >
    <button
      className="flex items-center space-x-1 text-sm font-semibold text-gray-200 hover:text-white transition-colors py-2"
      aria-haspopup="true"
      aria-expanded={activeDropdown === menuItem}
      tabIndex={0}
    >
      <span>{menuItem}</span>
    </button>
  </div>
);

const NavMegaMenu = ({ data }) => {
  if (!data) return null;

  return (
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
  );
};

const Nav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dispatch = useDispatch();
  const activeDropdownData = activeDropdown ? navigationData[activeDropdown] : null;
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
    loading: searchLoading,
    error: searchError,
    minChars: searchMinChars,
    clear: clearSearch,
  } = useProductSearch({ minChars: 2, limit: 8, debounceMs: 250 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container, .search-overlay')) {
        if (isSearchOpen) {
          setSearchOpen(false);
          clearSearch();
        }
        setUserMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    if (isSearchOpen || isUserMenuOpen || activeDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen, isUserMenuOpen, activeDropdown, clearSearch]);

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
      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ease-out relative
          ${scrolled ? ' bg-stone-950/95 backdrop-blur-xl shadow-md' : 'bg-stone-950 '} `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 md:hidden">
            <div className="flex items-center gap-3">
              <NavLink to="/" className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] uppercase text-white">
                  ÉLITE
                </span>
                <span className="text-[10px] font-semibold tracking-[0.35em] text-white/70 uppercase">
                  LUXURY
                </span>
              </NavLink>
            </div>

            <div className="flex items-center space-x-1">
              <button
                className="p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>

              {user ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!isUserMenuOpen);
                      if (isSearchOpen) {
                        setSearchOpen(false);
                        clearSearch();
                      }
                    }}
                    className="flex items-center p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    aria-label="Account menu"
                  >
                    <User className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-stone-950 rounded-lg shadow-xl border border-gray-800 p-2 animate-in slide-in-from-top-2 z-2">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <div className="text-sm font-medium text-white">
                          {user.name || "User"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.isAdmin ? 'Admin' : 'Member'}
                        </div>
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
                      )}
                      <div className="border-t border-gray-700 my-1"></div>
                      <button onClick={handleLogout} className="block px-3 py-2 text-red-500 hover:text-white hover:bg-red-600 rounded-lg w-full text-left text-sm">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/signin" className="block px-3 py-2 text-white border border-white/30 rounded-full text-xs hover:bg-white hover:text-black transition">
                  SIGN IN
                </NavLink>
              )}

              <NavLink
                to="/cart"
                className="relative p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/wishlist"
                className="p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Gift card"
              >
                <CreditCard className="w-5 h-5" strokeWidth={1.5} />
              </NavLink>

              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[auto_1fr_auto] items-center py-4">
            <div className="flex items-center gap-4">
              <NavLink to="/" className="inline-flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.35em] uppercase text-white">
                  ÉLITE
                </span>
                <span className="text-xs font-semibold tracking-[0.4em] text-white/70 uppercase">
                  LUXURY
                </span>
              </NavLink>
              <span className="text-xs font-semibold tracking-[0.35em] text-white/50 uppercase">
                INDI
              </span>
            </div>

            <NavLink to="/" className="flex items-center justify-center">
              <span className="text-lg font-semibold text-white/90 tracking-[0.45em] uppercase">
                ÉLITE LUXURY
              </span>
            </NavLink>

            <div className="flex items-center justify-end space-x-2">
              {user ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!isUserMenuOpen);
                      if (isSearchOpen) {
                        setSearchOpen(false);
                        clearSearch();
                      }
                    }}
                    className="flex items-center p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    aria-label="Account menu"
                  >
                    <User className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-stone-950 rounded-lg shadow-xl border border-gray-800 p-2 animate-in slide-in-from-top-2 z-2">
                      <div className="px-3 py-2 border-b border-gray-700">
                        <div className="text-sm font-medium text-white">
                          {user.name || "User"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.isAdmin ? 'Admin' : 'Member'}
                        </div>
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
                      )}
                      <div className="border-t border-gray-700 my-1"></div>
                      <button onClick={handleLogout} className="block px-3 py-2 text-red-500 hover:text-white hover:bg-red-600 rounded-lg w-full text-left text-sm">
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink to="/signin" className="block px-3 py-2 text-white border border-white/30 rounded-full text-xs hover:bg-white hover:text-black transition">
                  SIGN IN
                </NavLink>
              )}

              <NavLink
                to="/cart"
                className="relative p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/wishlist"
                className="p-2 text-gray-200 hover:text-white transition-colors rounded-full hover:bg-white/10"
                aria-label="Gift card"
              >
                <CreditCard className="w-5 h-5" strokeWidth={1.5} />
              </NavLink>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex justify-center pb-4">
            <ProductSearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              results={searchResults}
              loading={searchLoading}
              error={searchError}
              minChars={searchMinChars}
              onResultSelect={() => setSearchQuery('')}
            />
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-center border-t border-white/10 py-3">
            <div
              className="flex items-center divide-x divide-white/15 dropdown-container"
              onMouseLeave={handleMouseLeave}
            >
              {menuKeys.map((menuItem) => (
                <div key={menuItem} className="px-4">
                  <NavDropdown
                    menuItem={menuItem}
                    activeDropdown={activeDropdown}
                    handleMouseEnter={handleMouseEnter}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Mega Menu */}
          {activeDropdownData && (
            <div
              className="absolute left-0 right-0 top-full mt-2 bg-stone-950/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-4 duration-300 z-50 dropdown-container"
              onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NavMegaMenu data={activeDropdownData} />
              </div>
            </div>
          )}

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
          <ProductSearchOverlay
            query={searchQuery}
            onQueryChange={setSearchQuery}
            results={searchResults}
            loading={searchLoading}
            error={searchError}
            minChars={searchMinChars}
            onClose={() => {
              setSearchOpen(false);
              clearSearch();
            }}
          />
        )}

      </nav>
    </>
  );
};

export default Nav;
