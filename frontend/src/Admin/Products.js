import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [auth] = useAuth();

  const getAllProducts = async () => {
    const token = auth.token;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/product/get-product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
    } catch (err) {
      toast.error("Error fetching product");
      console.log("Error fetching product: ", err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-4xl mb-8">All Products List</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products?.map((product) => (
          <Link
            key={product._id}
            to={`/dashboard/admin/update-product/${product.slug}`}
            className="w-72 h-96 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-200"
          >
            <div className="h-full flex flex-col">
              <img
                src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
                alt="Product Image"
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h5 className="text-lg font-semibold">{product.name}</h5>
                <p className="text-gray-700 text-sm mt-2">
                  {product.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
