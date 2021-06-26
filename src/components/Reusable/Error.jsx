import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="container">
      <h3 className=" text-center mb-5"> Sorry, this page isn't available.</h3>
      <p className="alert-danger alert">
        The link you followed may be broken, or the page may have been removed.
        <Link to="/"> Go back to Sociopath.</Link>
      </p>
    </div>
  );
};

export default Error;
