import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
import { API_BASE_URL } from "../config/api";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [category, setCategory] = useState("");

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/category/get-category`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error retrieving categories");
    }
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const token = auth.token;
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      if (photo) productData.append("photo", photo);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product Created successfully");
        setName("");
        setDescription("");
        setPhoto(null);
        setPrice(0);
        setQuantity(0);
        navigate("/dashboard/admin/products");
      } else toast.error("Error creating product in form");
    } catch (err) {
      console.log("Error creating product: ", err.message);
      toast.error("Error pushing product data");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Manage Product
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <Select
          placeholder="Select a category"
          size="large"
          showSearch
          className="w-full mb-4"
          onChange={(value) => setCategory(value)}
        >
          <Option value="">Select a Category</Option>
          {categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Photo
          </label>
          <label className="flex items-center justify-center w-full p-4 mt-1 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-500">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {photo && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(photo)}
              alt="Product Preview"
              className="w-48 h-48 object-cover mx-auto rounded-md"
            />
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Product Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Product Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div>
          <Select
            placeholder="Select Shipping"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setShipping(value);
            }}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleCreate}>
            CREATE PRODUCT
          </button>
        </div>
        {/* Add more form fields as needed */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateProduct;
