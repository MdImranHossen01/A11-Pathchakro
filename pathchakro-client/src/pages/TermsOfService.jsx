import React from 'react';

const TermsOfService = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-sm text-base-content/70 mb-8">Last updated: July 1, 2025</p>

            <div className="space-y-6 prose max-w-none">
                <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
                <p>By accessing and using Pathchakro (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>

                <h2 className="text-2xl font-bold">2. User Accounts</h2>
                <p>To access most features of the Service, you must register for an account. When you register for an account, you may be required to provide us with some information about yourself, such as your name, email address, or other contact information. You agree that the information you provide to us is accurate and that you will keep it accurate and up-to-date at all times. You are solely responsible for maintaining the confidentiality of your account and password.</p>

                <h2 className="text-2xl font-bold">3. User Conduct</h2>
                <p>You agree not to use the Service for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the Service in any way that could damage the Service, the business of Pathchakro, or any other user.</p>
                <ul>
                    <li>You will not harass, abuse, or threaten others or otherwise violate any person's legal rights.</li>
                    <li>You will not post any content that is defamatory, obscene, or fraudulent.</li>
                    <li>You will not engage in academic dishonesty, including plagiarism or cheating.</li>
                </ul>

                <h2 className="text-2xl font-bold">4. Termination</h2>
                <p>We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                
                <p className="text-sm italic text-base-content/60">Disclaimer: This is a template Terms of Service and should be reviewed by a legal professional before use in a live, public-facing application.</p>
            </div>
        </div>
    );
};

export default TermsOfService;