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

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 self-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                Urbanix
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  Categories
                </button>
                {dropdownOpen && (
                  <ul className="absolute bg-white border border-gray-300 rounded shadow-md">
                    <li>
                      <Link
                        to={"/categories"}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.length > 0 ? (
                      categories.map((category) => (
                        <li key={category.id} className="mb-2">
                          <Link
                            to={`/category/${category.slug}`}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                            onClick={() => setDropdownOpen(false)}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No Categories</li>
                    )}
                  </ul>
                )}
              </div>

              {/* Other Links */}
              <Link
                to="/shop"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Contact
              </Link>

              {/* Authentication Links */}
              {auth ? (
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <SearchInput />

          {/* Right Side Icons */}
          <div className="flex items-center ml-4">
            {/* Cart Icon */}

            <Badge count={cart?.length}>
              <Link
                to="/cart"
                className="relative text-gray-900 hover:text-gray-700"
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
                    d="M3 3h2l.4 2M7 13h10l1.38-6.59A1 1 0 0017.5 5H6.1l-.35-1.56A1 1 0 004.75 3H3m4 10a1 1 0 100 2h10a1 1 0 100-2H7zm0 0a1 1 0 011-1h10a1 1 0 011 1m-12 5a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z"
                  />
                </svg>
                <Link to="/cart" className="nav-link">
                  Cart
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                </Link>
              </Link>
            </Badge>

            {/* User Menu */}
            <div className="ml-4 relative">
              <button
                className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleUserMenu}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                />
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
