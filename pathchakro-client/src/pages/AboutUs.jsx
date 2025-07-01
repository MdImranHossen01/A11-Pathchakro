import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-base-100">
            {/* Hero Section */}
            <div className="hero min-h-96 bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Our Mission</h1>
                        <p className="py-6">
                            At Pathchakro, our mission is to revolutionize online group study. We believe that collaborative learning is the key to academic success, and we're dedicated to building a platform that is simple, effective, and accessible to all students.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold">Our Core Values</h2>
                    <p className="text-lg mt-2 text-base-content/70">The principles that guide us.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Collaboration</h3>
                        <p>We foster a community where students can easily work together, share knowledge, and provide constructive feedback through our peer-grading system.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Accessibility</h3>
                        <p>Our platform is designed to be user-friendly and fully responsive, ensuring that you can access your study materials anytime, anywhere, on any device.</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-2">Integrity</h3>
                        <p>We are committed to providing a secure and reliable platform where academic integrity is paramount, featuring creator-only controls and a fair evaluation process.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;