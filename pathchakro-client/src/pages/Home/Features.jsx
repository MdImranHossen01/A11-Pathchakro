import React from 'react';
import { FaPencilAlt, FaTasks, FaUsers, FaChartLine, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const featureList = [
    {
        icon: <FaPencilAlt className="text-primary" size={40} />,
        title: "Create & Share Assignments",
        description: "Any user can easily create detailed assignments with due dates, marks, and difficulty levels for the whole group."
    },
    {
        icon: <FaTasks className="text-primary" size={40} />,
        title: "Seamless Submissions",
        description: "Take any assignment by submitting your work via a simple link, adding notes for the examiner."
    },
    {
        icon: <FaUsers className="text-primary" size={40} />,
        title: "Peer Grading System",
        description: "Evaluate your friends' submissions, provide constructive feedback, and help each other learn and improve."
    },
    {
        icon: <FaChartLine className="text-primary" size={40} />,
        title: "Track Your Progress",
        description: "A personalized dashboard shows your attempted assignments, grades, and feedback all in one place."
    },
    {
        icon: <FaShieldAlt className="text-primary" size={40} />,
        title: "Secure Authentication",
        description: "Your account is protected with a secure JWT-based system, including social login options."
    },
    {
        icon: <FaMobileAlt className="text-primary" size={40} />,
        title: "Fully Responsive",
        description: "Access your study group and assignments seamlessly on desktop, tablet, or mobile."
    }
];

const Features = () => {
    return (
        <div className="w-full py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold">Why Choose Pathchakro?</h2>
                    <p className="text-lg mt-2 text-base-content/70">Everything you need for effective group study.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, index) => (
                        <div key={index} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body items-center text-center">
                                <div className="p-4 bg-base-200 rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="card-title mt-4">{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;