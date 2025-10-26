import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";

const Home = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [auth, setAuth] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotalCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/product-count"
      );
      setTotal(response.data.total);
    } catch (err) {
      console.log("Error getting total count: ", err.message);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setProducts(response.data?.products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("Error getting products: ", err.message);
    }
  };

  const getAllCategories = async () => {
    try {
      const token = auth.token;
      const response = await axios.get(
        "http://localhost:8000/api/v1/category/get-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong in getting category", error.message);
    }
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
    if (checked.length) filterProduct();
    getAllCategories();
    getTotalCount();
  }, [checked.length]);

  const filterProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/filter-product",
        { checked, radio: [] }
      );
      setProducts(response.data.products);
    } catch (err) {
      console.log("Error filtering products: ", err.message);
    }
  };

  const loadMore = async (currentPage) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${currentPage}`
      );
      setLoading(false);
      setProducts((prevProducts) => [
        ...prevProducts,
        ...response.data.products,
      ]);
    } catch (err) {
      setLoading(false);
      console.log("Error loading more: ", err.message);
    }
  };

  const handleFilter = (value, id) => {
    const all = value ? [...checked, id] : checked.filter((c) => c !== id);
    setChecked(all);
  };

  return (
    <Layout title="Urbanix - Premium Fashion Collection">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Premium Fashion
              <span className="block text-purple-400">Collection</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
              Discover our curated selection of premium clothing and accessories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  // Scroll to products section
                  const productsSection =
                    document.getElementById("products-section");
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate("/categories")}
                className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300"
              >
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filter Section */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-visible sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <p className="text-purple-100 text-sm mt-1">
                  Refine your search
                </p>
              </div>

              <div className="p-6">
                {/* Category Filter */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-purple-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Category
                  </h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <Checkbox
                          onChange={(e) =>
                            handleFilter(e.target.checked, category._id)
                          }
                          className="mr-3"
                        />
                        <span className="text-gray-700 font-medium">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => window.location.reload()}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Products Section */}
          <div className="w-full lg:w-3/4" id="products-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Our Products
              </h2>
              <p className="text-gray-600">
                Discover our carefully curated collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
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
                      {product.description.substring(0, 60)}...
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
                </div>
              ))}
            </div>

            {products.length < total && (
              <div className="mt-12 text-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const nextPage = page + 1;
                    loadMore(nextPage);
                    setPage(nextPage);
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    "Load More Products"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
