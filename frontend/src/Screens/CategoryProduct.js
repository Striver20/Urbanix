import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { cart, setCart } = useCart();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const getProductByCategory = async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/v1/product/product-category/${params.slug}`;
      console.log("🚀 CategoryProduct API Call:", url);
      console.log("🔧 API_BASE_URL:", API_BASE_URL);
      
      const { data } = await axios.get(url);
      setProduct(data?.products);
      setCategory(data?.category.name);
    } catch (err) {
      console.log("Error fetching product category: ", err.message);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [params.slug]);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      watches: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
        </svg>
      ),
      shoes: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 18h20v2H2v-2zM2 16l6-4 6 4H2zm18-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
        </svg>
      ),
      clothes: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C9.24 2 7 4.24 7 7v3H6c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1h-1V7c0-2.76-2.24-5-5-5zm-1 16H9v-6h2v6zm4 0h-2v-6h2v6zm-1-10H9V7c0-1.66 1.34-3 3-3s3 1.34 3 3v1z" />
        </svg>
      ),
      sneaker: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 18h20v2H2v-2zM2 16l6-4 6 4H2zm18-2c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z" />
        </svg>
      ),
      kids: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    };

    const categoryKey = Object.keys(icons).find((key) =>
      category?.toLowerCase().includes(key)
    );

    if (categoryKey) {
      return icons[categoryKey];
    }

    return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <Layout title={`Loading ${category || "Category"} Products`}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${category} Collection - Shop Premium ${category}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-2xl mr-4">
              {getCategoryIcon(category)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {category}
                <span className="block text-purple-400 text-2xl md:text-3xl">
                  Collection
                </span>
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 text-center max-w-2xl mx-auto">
            Discover our premium {category?.toLowerCase()} collection with{" "}
            {products?.length} carefully curated products
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Link
              to="/categories"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Categories
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-500">{category}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {category} Products ({products?.length} items)
          </h2>
          <p className="text-gray-600 mb-6">
            Premium quality {category?.toLowerCase()} for every style and
            occasion
          </p>

          {/* Controls Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
              >
                <option value="newest">✨ Newest First</option>
                <option value="price-low">💰 Price: Low to High</option>
                <option value="price-high">💎 Price: High to Low</option>
                <option value="name">🔤 Name A-Z</option>
              </select>
              <svg
                className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
                title="Grid View"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}
                title="List View"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        {/* Products Grid/List */}
        {products?.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }
          >
            {sortedProducts.map((product) => (
              <div
                key={product._id}
                className={
                  viewMode === "grid"
                    ? "group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                    : "group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex"
                }
              >
                {viewMode === "grid" ? (
                  <>
                    {/* Grid View */}
                    <div className="relative overflow-hidden">
                      <img
                        src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                        alt={product.name}
                        className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {product.description.substring(0, 80)}...
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold text-purple-600">
                          ${product.price}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="text-gray-600 text-sm ml-2">
                            (4.5)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                          onClick={() => navigate(`/product/${product.slug}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                          onClick={() => {
                            // Check if product already exists in cart
                            const existingItemIndex = cart.findIndex(
                              (item) => item._id === product._id
                            );

                            if (existingItemIndex !== -1) {
                              // Product exists, increment quantity
                              const updatedCart = [...cart];
                              updatedCart[existingItemIndex].quantity += 1;
                              setCart(updatedCart);
                              toast.success(
                                `📦 Quantity increased to ${updatedCart[existingItemIndex].quantity}!`
                              );
                            } else {
                              // New product, add to cart with quantity 1
                              const cartItem = {
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                description: product.description,
                                slug: product.slug,
                                category: product.category,
                                quantity: 1,
                              };
                              setCart([...cart, cartItem]);
                              toast.success("✨ Product added to cart!");
                            }
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <img
                      src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="h-48 w-48 object-cover"
                    />
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {product.description}
                        </p>
                        <div className="flex items-center text-yellow-400 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                          <span className="text-gray-600 text-sm ml-2">
                            (4.5 • 127 reviews)
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-purple-600">
                          ${product.price}
                        </span>
                        <div className="flex space-x-3">
                          <button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            View Details
                          </button>
                          <button
                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => {
                              // Check if product already exists in cart
                              const existingItemIndex = cart.findIndex(
                                (item) => item._id === product._id
                              );

                              if (existingItemIndex !== -1) {
                                // Product exists, increment quantity
                                const updatedCart = [...cart];
                                updatedCart[existingItemIndex].quantity += 1;
                                setCart(updatedCart);
                                toast.success(
                                  `📦 Quantity increased to ${updatedCart[existingItemIndex].quantity}!`
                                );
                              } else {
                                // New product, add to cart with quantity 1
                                const cartItem = {
                                  _id: product._id,
                                  name: product.name,
                                  price: product.price,
                                  description: product.description,
                                  slug: product.slug,
                                  category: product.category,
                                  quantity: 1,
                                };
                                setCart([...cart, cartItem]);
                                toast.success("✨ Product added to cart!");
                              }
                            }}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Products Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any products in the {category} category yet.
              </p>
              <Link
                to="/categories"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Browse Other Categories
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
