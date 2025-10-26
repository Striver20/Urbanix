import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SearchInput from "./Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart } = useCart();
  const categories = useCategory();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const getTotalCartItems = () => {
    return cart?.reduce((total, item) => total + (item.quantity || 1), 0) || 0;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-xl border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-xl mr-3">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2L3 7v11a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V7l-7-5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Urbanix
                </span>
              </Link>
            </div>

            <div className="hidden lg:ml-10 lg:flex lg:space-x-1">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-50"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-50 flex items-center"
                  onClick={toggleDropdown}
                >
                  Categories
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                      <h3 className="font-semibold">Categories</h3>
                    </div>
                    <div className="p-2">
                      <Link
                        to={"/categories"}
                        className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          All Categories
                        </span>
                      </Link>
                      {categories?.length > 0 ? (
                        categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/category/${category.slug}`}
                            className="block px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors font-medium"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-500">
                          No Categories
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Links */}
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-50"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-50"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <SearchInput />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <div className="relative">
              <Badge count={getTotalCartItems()} showZero={false}>
                <Link
                  to="/cart"
                  className="relative p-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H5M7 13v4a2 2 0 002 2h6a2 2 0 002-2v-4M7 13h10m-5 4h.01"
                    />
                  </svg>
                </Link>
              </Badge>
            </div>

            {/* Authentication */}
            {auth ? (
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <button
                    className="flex items-center p-2 rounded-xl hover:bg-purple-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={toggleUserMenu}
                  >
                    <img
                      className="h-10 w-10 rounded-xl object-cover border-2 border-purple-200"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                    />
                    <svg
                      className="ml-2 w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl bg-white border border-gray-100 overflow-hidden z-10">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-lg object-cover border-2 border-white/30"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Profile"
                          />
                          <div className="ml-3">
                            <p className="font-semibold">Welcome back!</p>
                            <p className="text-purple-100 text-sm">
                              Manage your account
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          to="/dashboard/user/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Your Profile
                        </Link>
                        <Link
                          to="/dashboard/user/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Orders
                        </Link>
                        <hr className="my-2 border-gray-200" />
                        <button
                          onClick={logout}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-purple-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
