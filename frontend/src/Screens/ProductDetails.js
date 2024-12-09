import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Product = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getProduct = async () => {
    if (!params.slug) {
      console.log("No slug provided in URL.");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(response.data.product);
      getSimilarProducts(
        response.data?.product._id,
        response.data?.product.category._id
      );
    } catch (err) {
      console.error("Error getting product details:", err.message);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    if (!pid || !cid) {
      console.log("No pid or cid received");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(response.data?.products);
    } catch (err) {
      console.error("Error getting similar products:", err.message);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      {product && (
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
              className="rounded-lg shadow-lg max-w-full h-auto"
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {product.category?.name}
            </p>
            <div className="flex space-x-4 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                Order Now
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <hr className="my-8" />

      {/* Related Products */}
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Similar Items</h1>
        {relatedProducts.length < 1 && (
          <p className="text-center text-gray-500">No Similar Products Found</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
            >
              <img
                src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                className="rounded-lg max-w-full h-auto mb-4"
                alt={p.name}
              />
              <h5 className="text-lg font-semibold mb-2">{p.name}</h5>
              <p className="text-gray-700 mb-2">${p.price}</p>
              <p className="text-gray-500 text-sm mb-4">
                {p.description.substring(0, 30)}...
              </p>
              <a
                href={`/product/${p.slug}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
