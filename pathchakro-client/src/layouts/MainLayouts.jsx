import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Full-width navbar */}
            <Navbar />
            
            {/* Main content area with container */}
            <main className='flex-grow container mx-auto px-4 py-6'>
                <Outlet />
            </main>
            
            {/* Full-width footer */}
            <Footer />
        </div>
    );
};

export default MainLayouts;