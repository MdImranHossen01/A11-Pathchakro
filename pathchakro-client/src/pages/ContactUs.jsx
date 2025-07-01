import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactUs = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        toast.success("Thank you for your message! We will get back to you soon.");
        reset();
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold">Get In Touch</h1>
                <p className="py-4 text-lg">We'd love to hear from you. Please fill out the form below.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="card bg-base-200 shadow-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Name</span></label>
                            <input type="text" placeholder="John Doe" {...register("name", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Email</span></label>
                            <input type="email" placeholder="john.doe@example.com" {...register("email", { required: true })} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text">Your Message</span></label>
                            <textarea {...register("message", { required: true })} className="textarea textarea-bordered h-32" placeholder="Your message..."></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-2xl font-semibold">Contact Information</h3>
                        <p className="mt-2">Feel free to reach out to us through any of the following methods.</p>
                    </div>
                    <div className="space-y-4">
                        <p><strong>Address:</strong> 123 Learning Lane, Dhaka, Bangladesh</p>
                        <p><strong>Email:</strong> contact@pathchakro.com</p>
                        <p><strong>Phone:</strong> +880 123 456 7890</p>
                    </div>
                    {/* You can add a map here if you want */}
                    {/* <div className="h-64 bg-base-300 rounded-lg mt-4"> Map Placeholder </div> */}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;