import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import useAuth from '../hooks/useAuth'; // Adjust the import path as necessary

const Logo = () => {
    const { user } = useAuth();
    
    return (
        <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
                <img
                    className="h-8 w-auto"
                    src="https://i.ibb.co/Q7R2wDsN/Pen-Book-Learning-Education-Logo-1.png"
                    alt="Logo"
                />
                <span className="text-xl font-bold text-primary">
                    Pathchakro
                </span>
            </Link>
        </div>
    );
};

export default Logo;