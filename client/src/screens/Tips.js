import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import { GlobalState } from "../context/GlobalState";

function Tips() {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;
  const [callback, setCallback] = state.blogAPI.callback;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const tips = blogs.filter((blog) => blog.category === "tips & tricks");

  const deleteBlogs = async (id, public_id, name) => {
    try {
      if (window.confirm(`Want to Delete ${name}`)) {
        setLoading(true);
        const deleteImg = axios.post(
          "/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteBlog = axios.delete(`/api/blogs/${id}`, {
          headers: { Authorization: token },
        });
        await deleteImg;
        await deleteBlog;
        setCallback(!callback);
        setLoading(false);
        toast.error(`${name} Deleted`);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="bg-white border container py-3">
      <h5 className="text-uppercase title">tips & tricks</h5>
      {loading ? (
        "Loading..."
      ) : (
        <div className="pt-3">
          {tips &&
            tips.map((blog) => (
              <BlogCard blog={blog} deleteBlogs={deleteBlogs} />
            ))}
        </div>
      )}
    </div>
  );
}

export default Tips;
