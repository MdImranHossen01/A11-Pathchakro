import React from 'react';

const faqData = [
    {
        question: "How do I create a new account?",
        answer: "You can easily create a new account by going to the 'Register' page and providing your name, email, photo, and a strong password. Alternatively, you can log in directly using Google."
    },
    {
        question: "Can I edit or delete assignments I've created?",
        answer: "Yes, you can. However, you'll only be able to edit or delete assignments you've created yourself. On the 'Assignments' page, you'll find 'Update' and 'Delete' buttons on the assignment cards you've created."
    },
    {
        question: "Who can evaluate my submitted assignments?",
        answer: "Any logged-in user can evaluate your work from the 'Pending Assignments' page. However, a user cannot evaluate their own submitted assignments."
    },
    {
        question: "What should I do if I forget my account password?",
        answer: "Currently, our system doesn't have a password reset option. But if you logged in using Google, you won't need a password. We're working on adding a password reset feature in the future."
    },
    {
        question: "Is this platform safe to use?",
        answer: "Yes, we take user data security very seriously. Your password is encrypted and we use modern security measures to protect your personal information."
    },
    {
        question: "What are the rules for borrowing books from the library?",
        answer: "You can view details of any book in the 'Library' section and click the 'Borrow' button. Then select a return date to borrow the book, if copies are available."
    }
];

const FaqPage = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold">Frequently Asked Questions (FAQ)</h1>
                <p className="py-4 text-lg text-base-content/70">Find answers to your common questions here.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
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
    );
};

export default FaqPage;