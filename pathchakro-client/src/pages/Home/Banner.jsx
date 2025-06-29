import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Banner = () => {
    return (
        <div 
            className="hero min-h-[70vh] rounded-lg overflow-hidden" 
            style={{ 
                backgroundImage: 'url(https://images.pexels.com/photos/8429503/pexels-photo-8429503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)' 
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <motion.div
                    className="max-w-md"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="mb-5 text-5xl font-bold">Your Online Study Group, Reimagined.</h1>
                    <p className="mb-5">Collaborate, create assignments, provide feedback, and succeed together. Pathchakro is the smart way to study with friends.</p>
                    <Link to="/assignments">
                        <motion.button 
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Explore Assignments
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;