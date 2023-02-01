import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-column items-center">
      <h1 className="tc ma4 page-title">404 NOT FOUND</h1>
      <p className="tc fw1 f3">the page you requested couldn't be found.</p>
      <p className="tc fw1 f3">try logging in!</p>
    </div>
  );
};

export default NotFound;
