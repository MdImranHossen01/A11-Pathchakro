import React from "react";
import { Link } from "react-router-dom"; // ✅ Shothik import 'react-router-dom' theke
import {
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaArrowRight,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
    e.target.reset();
  };

  return (
    <footer className="bg-base-100 border-t border-base-200 w-full">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-auto"
              src="https://i.ibb.co/Q7R2wDsN/Pen-Book-Learning-Education-Logo-1.png"
              alt="Pathchakro Logo"
            />
            <span className="text-xl font-bold text-primary">Pathchakro</span>
          </div>
          <p className="text-base-content/80">
            Your collaborative space to learn, share, and achieve academic
            success together.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://twitter.com/"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://discord.com/"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              <FaDiscord className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/"
              className="text-base-content/70 hover:text-primary transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Platform links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-base-content">Platform</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/assignments"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                All Assignments
              </Link>
            </li>

            <li>
              <Link
                to="/user-dashboard"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

  
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-base-content">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/about"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="text-base-content/70 hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </li>
           
            
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-base-content">
            Stay Updated
          </h3>
          <p className="text-base-content/80">
            Get weekly study tips and platform updates.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary bg-base-200 text-base-content"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-lg text-white transition-colors"
              >
                <FaArrowRight />
              </button>
            </div>
            <p className="text-xs text-base-content/50">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-base-200  py-4 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
          <p className="text-base-content/50 text-sm">
            © {currentYear} Pathchakro Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
