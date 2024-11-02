import React from "react";

const ProductForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Add New Product
        </h2>

        <div className="form-group mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Name of Product
          </label>
          <input
            type="text"
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <input
            type="text"
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Price
          </label>
          <input
            type="number"
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price"
          />
        </div>

        <div className="form-group mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Quantity
          </label>
          <input
            type="number"
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Quantity"
          />
        </div>

        <div className="form-group mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Photo
          </label>
          <input type="file" className="w-full text-gray-500" />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
