import { useEffect, useState } from "react";
import axios from "axios";

function BlogAPI() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [callback, setCallback] = useState(false);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getBlogs = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://code-blogs-tech.herokuapp.com/api/blogs?limit=${page * 6}`
      );
      setBlogs(res.data.blogs);
      setResult(res.data.result);
      setLoading(false);
    };
    getBlogs();
  }, [callback, page]);

  return {
    loading: [loading, setLoading],
    blogs: [blogs, setBlogs],
    callback: [callback, setCallback],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default BlogAPI;
