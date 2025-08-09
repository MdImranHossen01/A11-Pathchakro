import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading, initialized } = useAuth();
    const location = useLocation();
    const [isChecking, setIsChecking] = useState(true);
    
    useEffect(() => {
        if (!loading && initialized) {
            setIsChecking(false);
        }
    }, [loading, initialized]);
    
    if (loading || isChecking) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    
    // Check if user exists
    if (user) {
        return children; // If user is logged in, show the page
    }
    
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;