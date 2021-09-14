import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalState";
import Loading from "./Loading";
import PopularCard from "./PopularCard";

function Popular() {
  const state = useContext(GlobalState);
  const [blogs] = state.blogAPI.blogs;
  const [loading] = state.blogAPI.loading;

  return (
    <div className="bg-white border p-3">
      <h5 className="text-uppercase title">most popular</h5>
      <div className="pt-3">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          blogs.slice(0, 4).map((blog) => <PopularCard blog={blog} />)
        )}
      </div>
    </div>
  );
}

export default Popular;
