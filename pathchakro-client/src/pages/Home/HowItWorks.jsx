import React from 'react';
import { FaUserPlus, FaPencilRuler, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const steps = [
    {
        icon: <FaUserPlus size={40} className="text-primary" />,
        title: "Step 1: Register",
        description: "Create an account with your name, email, and photo or log in with Google in just a few clicks."
    },
    {
        icon: <FaPencilRuler size={40} className="text-primary" />,
        title: "Step 2: Create or Submit Assignments",
        description: "Create new assignments for your friends or participate in existing ones by submitting your work."
    },
    {
        icon: <FaGraduationCap size={40} className="text-primary" />,
        title: "Step 3: Evaluate & Learn",
        description: "Review others' submissions, provide feedback, and learn from the grades and comments you receive on your work."
    }
];

const HowItWorks = () => {
    return (
        <div className="py-20 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold">How It Works</h2>
                    <p className="text-lg mt-2 text-base-content/70">Start your group study in just three simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="card bg-base-100 text-center shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="card-body items-center">
                                <div className="p-5 bg-base-300 rounded-full mb-4">
                                    {step.icon}
                                </div>
                                <h3 className="card-title text-2xl">{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;