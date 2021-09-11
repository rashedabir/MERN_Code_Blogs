import axios from "axios";
import { useEffect, useState } from "react";

function CategoryAPI() {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategory = async () => {
    const res = await axios.get(
      "https://code-blogs-tech.herokuapp.com/api/category"
    );
    setCategories(res.data.categories);
  };
  useEffect(() => {
    getCategory();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
}

export default CategoryAPI;
