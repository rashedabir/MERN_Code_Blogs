import React from "react";
import Loader from "react-loader-spinner";

function NotFound() {
  return (
    <div className="bg-white border container py-3">
      <Loader type="Bars" color="#122" height={100} width="100%" />
      <h3 className="text-center pt-4">Page Not Found</h3>
    </div>
  );
}

export default NotFound;
