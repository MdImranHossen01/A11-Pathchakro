import React from 'react';
import { Link } from 'react-router';
import { FaTwitter, FaLinkedin, FaDiscord, FaArrowRight, FaGithub } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing to our newsletter!");
        e.target.reset();
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Main footer content */}
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand info */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <img className='w-12 h-12' src="https://i.ibb.co/Q7R2wDsN/Pen-Book-Learning-Education-Logo-1.png" alt="Pathchakro Logo" />
                        <span className='text-2xl font-bold text-white'>Pathchakro</span>
                    </div>
                    <p className="text-gray-400">Your collaborative space to learn, share, and achieve academic success together.</p>
                    <div className="flex space-x-4 pt-2">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaTwitter className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaLinkedin className="w-5 h-5" />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaDiscord className="w-5 h-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaGithub className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Platform links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Platform</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                        <li><Link to="/assignments" className="text-gray-400 hover:text-white transition-colors">All Assignments</Link></li>
                        <li><Link to="/create-assignment" className="text-gray-400 hover:text-white transition-colors">Create Assignment</Link></li>
                        <li><Link to="/pending-assignments" className="text-gray-400 hover:text-white transition-colors">Pending Assignments</Link></li>
                    </ul>
                </div>

                {/* Resources links */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About us</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
                    <p className="text-gray-400">Get weekly study tips and platform updates.</p>
                    <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-white"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white transition-colors"
                            >
                                <FaArrowRight />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
                    </form>
                </div>
            </div>

            {/* Copyright bar */}
            <div className="border-t border-gray-800 py-6 px-6">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} Pathchakro Ltd. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;