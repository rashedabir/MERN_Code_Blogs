import React, { useContext } from "react";
import parse from "html-react-parser";
import { GlobalState } from "../context/GlobalState";
import { Link } from "react-router-dom";

function BlogCard({ blog, deleteBlogs }) {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <div className="card mb-3" style={{ maxWidth: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4 blog_card_img">
          <img
            src={blog.images.url}
            className="img-fluid rounded-start blog_img"
            alt={blog.title}
          />
          <p className="blog_card_category">{blog.category}</p>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <p className="card-text hide-text">{parse(blog.description)}</p>
            {isLogged ? (
              <p className="card-text d-flex action">
                <Link
                  to={`/edit_post/${blog._id}`}
                  className="fas fa-edit me-2 edit_action"
                ></Link>
                <i
                  onClick={() => {
                    deleteBlogs(blog._id, blog.images.public_id, blog.title);
                  }}
                  className="fas fa-trash-alt ms-2 text-danger"
                ></i>
              </p>
            ) : (
              <p className="card-text">
                <small className="text-muted text-uppercase">
                  <i className="far fa-user me-2"></i>codeblogs
                </small>
              </p>
            )}
            <p className="card-text">
              <small className="text-muted">
                Last update {new Date(blog.updatedAt).toDateString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
