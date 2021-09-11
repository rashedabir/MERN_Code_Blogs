import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalState";
import PopularCard from "./PopularCard";

function Popular() {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;

  return (
    <div className="bg-white border p-3">
      <h5 className="text-uppercase title">most popular</h5>
      <div className="pt-3">
        {blogs && blogs.slice(0, 4).map((blog) => <PopularCard blog={blog} />)}
      </div>
    </div>
  );
}

export default Popular;
