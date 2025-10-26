import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { API_BASE_URL } from "../config/api";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap overflow-x-hidden">
            {values?.results.map((product) => (
              <div className="h-full flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-col border-2 border-gray-500 rounded-md m-4">
                <img
                  src={`${API_BASE_URL}/api/v1/product/product-photo/${product._id}`}
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
        </div>
      </div>
    </Layout>
  );
};

export default Search;
