import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../context/GlobalState";
import parse from "html-react-parser";

function BlogDetails() {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;
  const [details, setDetails] = useState([]);
  const [text, setText] = useState("");
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      blogs.forEach((blog) => {
        if (blog._id === params.id) {
          setDetails(blog);
          setText(blog.description);
        }
      });
    }
  }, [params.id, blogs]);

  return (
    <div className="container bg-white p-3 border">
      <h3 className="py-3">{details.title}</h3>
      <p className="card-text">
        <small className="text-muted text-uppercase">
          <i className="far fa-user me-2"></i>codeblogs •{" "}
          {new Date(details.createdAt).toDateString()}
        </small>
      </p>
      <p className="border-top mt-4 py-4">{parse(text)}</p>
    </div>
  );
}

export default BlogDetails;
