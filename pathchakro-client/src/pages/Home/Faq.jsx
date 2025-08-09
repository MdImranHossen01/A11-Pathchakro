import React from 'react';

const faqData = [
    {
        question: "How do I create a new assignment?",
        answer: "After logging in, simply click on your profile picture in the navbar. A dropdown menu will appear with a 'Create Assignment' link. Click it, and you'll be taken to a form where you can fill in all the details."
    },
    {
        question: "Can I delete or update an assignment after creating it?",
        answer: "Yes, but you can only update or delete assignments that you personally created. On the main 'Assignments' page, you will see 'Update' and 'Delete' buttons on the cards for your own assignments."
    },
    {
        question: "Who can grade my submitted work?",
        answer: "Any logged-in user can grade a pending assignment, with one exception: you cannot grade your own submission. This encourages impartial peer review and collaborative learning."
    },
    {
        question: "How do I see the grade and feedback for my submissions?",
        answer: "Navigate to 'My Attempted Assignments' from your profile dropdown. This page lists all the assignments you've submitted, showing their status, the marks you received, and any feedback left by the examiner."
    },
    {
        question: "Is this platform free to use?",
        answer: "Yes, Pathchakro is completely free for all users. Our goal is to provide an accessible platform to help students collaborate and improve their learning outcomes."
    }
]

const Faq = () => {
    return (
        <div className="bg-base-100 py-20">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
                    <p className="text-lg mt-2 text-base-content/70">Have questions? We have answers.</p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((item, index) => (
                        <div key={index} className="collapse collapse-plus bg-base-100 shadow-md">
                            <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                            <div className="collapse-title text-xl font-medium">
                                {item.question}
                            </div>
                            <div className="collapse-content">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;