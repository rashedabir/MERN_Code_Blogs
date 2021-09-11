import React, { useContext } from "react";
import { GlobalState } from "../context/GlobalState";

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.blogAPI.page;
  const [result] = state.blogAPI.result;
  return (
    <div className="my-4 text-center">
      {result < page * 6 ? (
        ""
      ) : (
        <button className="custom_button btn" onClick={() => setPage(page + 1)}>
          Load more
        </button>
      )}
    </div>
  );
}

export default LoadMore;
