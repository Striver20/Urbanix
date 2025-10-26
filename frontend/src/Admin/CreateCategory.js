import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from "../components/Layout/Form/CategoryForm";
import { useAuth } from "../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [auth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const token = auth?.token;
  // Show and hide modal
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  // Handle form submission to create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/category/create-category",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        setName("");
        setDescription("");
        toast.success("Category created successfully!");
        getAllCategories();
      } else {
        toast.error("Category creation failed!");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong in creating category");
    }
  };

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/category/update-category/${selected}`,
        { name: updatedName, description: updatedDescription },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Category updated successfully!");
        getAllCategories();
        setIsModalOpen(false);
      } else {
        toast.error("Category update failed!");
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Something went wrong in updating category");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Category deleted successfully!");
        getAllCategories();
      } else {
        toast.error("Category delete failed!");
      }
    } catch (err) {
      console.log("Error deleting category", err.message);
      toast.error("Error deleting category");
    }
  };

  // Fetch all categories
  const getAllCategories = async () => {
    try {
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
    getAllCategories();
  }, []);

  return (
    <>
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center my-5">Manage Category</h1>
      <div className="p-3 w-full max-w-lg mx-auto">
        <CategoryForm
          handleSubmit={handleSubmit}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
      </div>
      <div className="overflow-x-auto mt-10 bg-white shadow-md rounded-lg mx-auto mb-40 max-w-4xl">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Category Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Description
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {categories?.map((category) => (
              <tr
                key={category._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="text-left py-3 px-4 border-b">
                  {category.name}
                </td>
                <td className="text-left py-3 px-4 border-b">
                  {category.description}
                </td>
                <td className="text-left py-3 px-4 border-b">
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setUpdatedName(category.name);
                      setUpdatedDescription(category.description);
                      setSelected(category._id);
                    }}
                    className="bg-blue-500 text-white py-1 px-3 mx-2 rounded hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(category._id);
                    }}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Edit Category"
          open={isModalOpen}
          onOk={handleUpdate}
          onCancel={handleCancel}
        >
          <CategoryForm
            name={updatedName}
            setName={setUpdatedName}
            description={updatedDescription}
            setDescription={setUpdatedDescription}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;
