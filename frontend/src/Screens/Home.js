import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import { Prices } from "../components/Layout/Prices";

const Home = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const [auth, setAuth] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
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
    if (!checked.length && !radio.length) getAllProducts();
    if (checked.length || radio.length) filterProduct();
    getAllCategories();
    getTotalCount();
  }, [checked.length, radio.length]);

  const filterProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/filter-product",
        { checked, radio }
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
    <Layout title="All Products - Best Offers">
      <div className="flex flex-col md:flex-row gap-8 p-4">
        {/* Filter Section */}
        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-bold mb-4">Filter By Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-lg font-bold mt-6">Filter By Price</h4>
          <div className="mt-2">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <button
            className="w-full bg-red-600 text-white py-2 mt-6 rounded-lg shadow hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Clear Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-lg font-semibold">{product.name}</h5>
                  <p className="text-gray-700 text-sm mt-2">
                    {product.description.substring(0, 30)}...
                  </p>
                  <h5 className="text-lg font-semibold mt-2">
                    ${product.price}
                  </h5>
                  <div className="mt-4 space-y-2">
                    <button
                      className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      See Details
                    </button>
                    <button
                      className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.success("Product added to cart");
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
            <div className="mt-8 text-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const nextPage = page + 1;
                  loadMore(nextPage);
                  setPage(nextPage);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
