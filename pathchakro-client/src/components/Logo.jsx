import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return (
          <div className="flex-shrink-0 flex items-center">
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