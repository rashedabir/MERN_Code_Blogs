import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import BlogCard from "../components/BlogCard";
import LoadMore from "../components/LoadMore";
import { GlobalState } from "../context/GlobalState";
import Loader from "react-loader-spinner";

function Home() {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;
  const [callback, setCallback] = state.blogAPI.callback;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);

  const deleteBlogs = async (id, public_id, name) => {
    try {
      if (window.confirm(`Want to Delete ${name}`)) {
        setLoading(true);
        const deleteImg = axios.post(
          "https://code-blogs-tech.herokuapp.com/api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteBlog = axios.delete(
          `https://code-blogs-tech.herokuapp.com/api/blogs/${id}`,
          {
            headers: { Authorization: token },
          }
        );
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
      <h5 className="text-uppercase title">all post</h5>
      {loading ? (
        <Loader
          type="Bars"
          color="#122"
          height={100}
          width="100%"
          timeout={loading} //3 secs
        />
      ) : (
        <div className="pt-3">
          {blogs &&
            blogs
              .slice(0)
              .reverse()
              .map((blog) => (
                <BlogCard blog={blog} deleteBlogs={deleteBlogs} />
              ))}
        </div>
      )}
      <LoadMore />
      {blogs.length < 1 && (
        <Loader
          type="Bars"
          color="#122"
          height={100}
          width="100%"
          timeout={loading} //3 secs
        />
      )}
    </div>
  );
}

export default Home;
