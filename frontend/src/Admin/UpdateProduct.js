import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");

  // Fetch single product data
  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/product/get-product/${params.slug}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.data.success) {
        const product = response.data.product;
        setName(product.name);
        setId(product._id);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        setShipping(product.shipping);
        setCategory(product.category._id);
        if (product.photo) {
          setPhoto(
            `http://localhost:8000/api/v1/product/product-photo/${product._id}`
          );
        }
      }
    } catch (err) {
      console.log("Error in fetching single product:", err.message);
    }
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = auth.token;
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      if (photo && typeof photo !== "string")
        productData.append("photo", photo);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);

      const response = await axios.put(
        `http://localhost:8000/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product Updated successfully");
        navigate("/dashboard/admin/products");
      } else toast.error("Error updating product");
    } catch (err) {
      console.log("Error updating product:", err.message);
      toast.error("Error updating product data");
    }
  };

  // Delete Product

  const handleDelete = async () => {
    try {
      const confirmUpdate = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmUpdate) return;
      const response = await axios.delete(
        `http://localhost:8000/api/v1/product/delete-product/${id}`,
        {
          header: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("Product deleted successfully");
      navigate("/dashboard/admin/products");
    } catch (err) {
      console.log("Error deleting product: ", err.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Update Product
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl">
        <Select
          placeholder="Select a category"
          size="large"
          showSearch
          className="w-full mb-4"
          onChange={(value) => setCategory(value)}
          value={category}
        >
          <Option value="">Select a Category</Option>
          {categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
        </Select>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Photo
          </label>
          <label className="flex items-center justify-center w-full p-4 mt-1 border border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-500">
            {photo && typeof photo !== "string" ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {photo ? (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(photo)}
              alt="product-photo"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="mb-4">
            <img
              src={`http://localhost:8000/api/v1/product/product-photo/${id}`}
              alt="product-photo"
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}

        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="number"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Product Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <Select
          placeholder="Select Shipping"
          size="large"
          className="w-full mb-4"
          onChange={(value) => setShipping(value === "1")}
          value={shipping ? "Yes" : "No"}
        >
          <Option value="0">No</Option>
          <Option value="1">Yes</Option>
        </Select>

        <button
          onClick={handleUpdate}
          className="w-full py-2 mb-6 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-150"
        >
          UPDATE PRODUCT
        </button>
        <button
          onClick={handleDelete}
          className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-150"
        >
          DELETE PRODUCT
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateProduct;
