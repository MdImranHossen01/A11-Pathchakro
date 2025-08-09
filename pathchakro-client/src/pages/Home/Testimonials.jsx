import React from 'react';

const testimonialData = [
    {
        quote: "Using Pathchakro has made our group study much easier. We get the opportunity to learn from each other's work, which is amazing!",
        name: "Arif Hossain",
        title: "Student, University of Dhaka",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "The process of creating assignments and sharing them with friends is very smooth. This platform has increased our interest in studying.",
        name: "Sadia Afrin",
        title: "Student, BUET",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "What I like most is the peer-grading system. Getting feedback from others helps me easily correct my mistakes.",
        name: "Imran Chowdhury",
        title: "Student, University of Chittagong",
        image: "https://randomuser.me/api/portraits/men/46.jpg"
    }
];

const Testimonials = () => {
    return (
        <div className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold">What Our Users Say</h2>
                    <p className="text-lg mt-2 text-base-content/70">Students' experiences with our platform.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialData.map((testimonial, index) => (
                        <div key={index} className="card bg-base-200 shadow-lg">
                            <div className="card-body">
                                <p className="text-base-content/80">"{testimonial.quote}"</p>
                                <div className="flex items-center mt-4">
                                    <div className="avatar">
                                        <div className="w-14 rounded-full">
                                            <img src={testimonial.image} alt={testimonial.name} />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-bold">{testimonial.name}</h4>
                                        <p className="text-sm text-base-content/60">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;