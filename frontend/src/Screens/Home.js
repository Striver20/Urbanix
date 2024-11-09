import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import { Checkbox, Radio } from "antd";

import axios from "axios";
import { Prices } from "../components/Layout/Prices";
const Home = () => {
  const [auth, setAuth] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // get total count of products
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

  // get all products
  const getAllProducts = async (req, res) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/product-list/${page}`
      );
      setProducts(response.data.products);
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
    // Initially we are getting all products on front page
    if (!checked.length && !radio.length) getAllProducts();
    if (checked.length || radio.length) filterProdcut();
    getAllCategories();
    getTotalCount();
  }, [checked.length, radio.length]);

  // get filtered products
  const filterProdcut = async () => {
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

  // load more
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

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all.filter((c) => c !== id);
    setChecked(all);
  };

  return (
    <Layout title={"All Prodcuts - Best Offers"}>
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-col">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

          {/* Price Filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-col">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((price) => (
                <div>
                  <Radio key={price._id} value={price.array}>
                    {price.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button
              className="btn btn-secondary bg-danger mt-4"
              onClick={() => window.location.reload()}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap overflow-x-hidden">
            {products?.map((product) => (
              <div className="h-full flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-col border-2 border-gray-500 rounded-md m-4">
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                  alt="Product Image"
                  className="h-48 w-full object-cover rounded-t-md rounded-b-sm"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h5 className="text-lg font-semibold">{product.name}</h5>
                  <p className="text-gray-700 text-sm mt-2">
                    {product.description.substring(0, 30) + "..."}
                  </p>
                  <h5 className="text-lg font-semibold">{product.price}</h5>
                  <button class="btn btn-primary ">See details</button>
                  <button class="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const nextPage = page + 1;
                  loadMore(nextPage);
                  setPage(nextPage);
                }}
                className="btn btn-primary"
              >
                {loading ? "Loading..." : "Load more..."}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
