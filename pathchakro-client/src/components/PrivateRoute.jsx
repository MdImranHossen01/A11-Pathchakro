import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth'; // You'll create this custom hook
import Spinner from './Spinner'; // A loading spinner component

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <Spinner />; // Show a loading spinner while checking auth status
    }

    if (user) {
        return children; // If user is logged in, show the page
    }

    // If user is not logged in, redirect to login page
    // state={{ from: location }} is used to redirect the user back to the page they were trying to access after they log in.
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;