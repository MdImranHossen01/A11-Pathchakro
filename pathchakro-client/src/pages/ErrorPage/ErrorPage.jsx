import React from 'react';
import { Link, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-9xl font-extrabold text-primary">Oops!</h1>
      <p className="text-4xl font-medium mt-4">
        {error.status} - {error.statusText || 'Page Not Found'}
      </p>
      <p className="text-lg mt-4 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default ErrorPage;