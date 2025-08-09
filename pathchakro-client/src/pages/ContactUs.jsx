import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaPaperPlane, FaClock } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

const ContactUs = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        toast.success("Thank you for your message! We will get back to you soon.");
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-16">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-primary mb-4">Get In Touch</h1>
                    <p className="text-lg text-base-content max-w-2xl mx-auto">
                        We'd love to hear from you. Please fill out the form below or reach out to us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-primary">Send Us a Message</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Your Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    {...register("name", { required: "Name is required" })} 
                                    className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`} 
                                />
                                {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Your Email</span>
                                </label>
                                <input 
                                    type="email" 
                                    placeholder="john.doe@example.com" 
                                    {...register("email", { 
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })} 
                                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`} 
                                />
                                {errors.email && <span className="text-error text-sm mt-1">{errors.email.message}</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Your Message</span>
                                </label>
                                <textarea 
                                    {...register("message", { 
                                        required: "Message is required",
                                        minLength: {
                                            value: 10,
                                            message: "Message must be at least 10 characters"
                                        }
                                    })} 
                                    className={`textarea textarea-bordered w-full h-32 ${errors.message ? 'textarea-error' : ''}`} 
                                    placeholder="Your message..."
                                ></textarea>
                                {errors.message && <span className="text-error text-sm mt-1">{errors.message.message}</span>}
                            </div>
                            
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary w-full">
                                    <FaPaperPlane className="mr-2" /> Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-3xl font-bold mb-6 text-primary">Contact Information</h2>
                            <p className="text-base-content mb-6">
                                Feel free to reach out to us through any of the following methods. Our team is ready to assist you.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaMapMarkerAlt className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Address</h3>
                                        <p className="text-base-content">123 Learning Lane, Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaEnvelope className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email</h3>
                                        <p className="text-base-content">mail@pathchakro.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaPhone className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone</h3>
                                        <p className="text-base-content">+8801919011101</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-primary/10 p-3 rounded-full mr-4">
                                        <FaClock className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Working Hours</h3>
                                        <p className="text-base-content">Monday - Friday: 9am - 6pm</p>
                                        <p className="text-base-content">Saturday: 10am - 4pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Social Media Links */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com/" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                                    <FaFacebookF className="text-xl" />
                                </a>
                                <a href="https://twitter.com/" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                                    <FaXTwitter className="text-xl" />
                                </a>
                                <a href="https://instagram.com/" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                                    <FaInstagram className="text-xl" />
                                </a>
                                <a href="https://linkedin.com/" className="bg-primary/10 p-3 rounded-full hover:bg-primary hover:text-white transition-colors duration-300">
                                    <FaLinkedinIn className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    );
};

export default ContactUs;