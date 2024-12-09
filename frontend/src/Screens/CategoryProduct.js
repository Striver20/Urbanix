import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState();

  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/product/product-category/${params.slug}`
      );
      setProduct(data?.products);
      setCategory(data?.category.name);
    } catch (err) {
      console.log("Error fetching product category: ", err.message);
    }
  };
  useEffect(() => {
    getProductByCategory();
  }, []);

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category- {category}</h4>
        <h6 className="text-center">{products?.length} products found</h6>
        <div className="row">
          <div className="w-full md:w-3/4">
            <h1 className="text-2xl font-bold mb-6 text-center">
              All Products
            </h1>
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
                      <button className="w-full bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
