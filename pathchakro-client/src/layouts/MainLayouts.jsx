import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayouts = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            {/* Full-width navbar */}
            <Navbar />
            
            {/* Main content area - no container here */}
            <main className='flex-grow'>
                <Outlet />
            </main>
            
            {/* Full-width footer */}
            <Footer />
        </div>
    );
};

export default MainLayouts;