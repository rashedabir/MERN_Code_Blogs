import React from "react";
import { Link } from "react-router-dom";

function PopularCard({ blog }) {
  return (
    <div className="card mb-3 blog_card" style={{ maxWidth: "100%" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={blog.images.url}
            className="img-fluid rounded-start"
            alt={blog.title}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <p className="card-text">
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCard;
