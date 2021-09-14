import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading({ loading }) {
  return (
    <div className="container-fluid">
      <div className="mb-4">
        <Skeleton circle={true} height={50} width={50} className="mb-3" />
        <Skeleton delay={loading} width="100%" height="100%" count={3} />
      </div>
      <div className="mb-4">
        <Skeleton circle={true} height={50} width={50} className="mb-3" />
        <Skeleton delay={loading} width="100%" height="100%" count={3} />
      </div>
      <div className="mb-4">
        <Skeleton circle={true} height={50} width={50} className="mb-3" />
        <Skeleton delay={loading} width="100%" height="100%" count={3} />
      </div>
      <div className="mb-4">
        <Skeleton circle={true} height={50} width={50} className="mb-3" />
        <Skeleton delay={loading} width="100%" height="100%" count={3} />
      </div>
      <div className="mb-4">
        <Skeleton circle={true} height={50} width={50} className="mb-3" />
        <Skeleton delay={loading} width="100%" height="100%" count={3} />
      </div>
    </div>
  );
}

export default Loading;
