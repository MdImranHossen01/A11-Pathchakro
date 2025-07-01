import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-base-content/70 mb-8">Last updated: July 1, 2025</p>

            <div className="space-y-6 prose max-w-none">
                <p>Welcome to Pathchakro. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.</p>

                <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website (such as posting assignments or submitting work) or otherwise when you contact us.</p>
                <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Email Address, Photo URL, and Password.</p>

                <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                <ul>
                    <li>To facilitate account creation and logon process.</li>
                    <li>To manage user accounts. We may use your information for the purposes of managing our account and keeping it in working order.</li>
                    <li>To enable user-to-user communications. We may use your information in order to enable user-to-user communications with each user's consent.</li>
                </ul>

                <h2 className="text-2xl font-bold">3. Will Your Information Be Shared With Anyone?</h2>
                <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not share, sell, rent or trade any of your information with third parties for their promotional purposes.</p>

                <h2 className="text-2xl font-bold">4. Data Security</h2>
                <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

                <h2 className="text-2xl font-bold">5. Contact Us</h2>
                <p>If you have questions or comments about this policy, you may contact us through the Contact Us page.</p>
                
                <p className="text-sm italic text-base-content/60">Disclaimer: This is a template Privacy Policy and should be reviewed by a legal professional before use in a live, public-facing application.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;