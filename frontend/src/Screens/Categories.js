import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container">
        <div className="row">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <div className="col-md-6 mt-5 gap-x-3 gap-y-3" key={category._id}>
                <button className="btn btn-primary">
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </button>
              </div>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No Categories</li>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
