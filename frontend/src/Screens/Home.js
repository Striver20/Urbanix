import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg"; // Assuming you have an image in the assets folder
import { useAuth } from "../context/auth";
import axios from "axios";
const Home = () => {
  const [auth, setAuth] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // get all products
  const getAllProducts = async (req, res) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/get-product"
      );
      console.log(response);
      setProducts(response.data.products);
    } catch (err) {
      console.log("Error getting products: ", err.message);
    }
  };
  const getAllCategories = async () => {
    try {
      const token = auth.auth.token;
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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout title={"All Prodcuts - Best Offers"}>
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          {categories.map((category) => {
            <Checkbox key={category._id} onChange={(e) => console.log(e)}>
              {category.name}
            </Checkbox>;
          })}
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products?.map((product) => (
              <div className="h-full flex flex-col border-2 border-gray-500 rounded-md m-4">
                <img
                  src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
                  alt="Product Image"
                  className="h-48 w-full object-cover rounded-t-md rounded-b-sm"
                />
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h5 className="text-lg font-semibold">{product.name}</h5>
                  <p className="text-gray-700 text-sm mt-2">
                    {product.description}
                  </p>
                  <button class="btn btn-primary ">See details</button>
                  <button class="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
