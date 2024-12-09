import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Get categories
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/category/get-category"
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
