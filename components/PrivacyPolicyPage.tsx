import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Privacy Policy | QuickLink</title>
                <meta name="description" content="Read the QuickLink Privacy Policy to understand how we collect, use, and protect your personal data, including information on cookies, usage data, and security." />
                <meta name="keywords" content="privacy policy, data protection, quicklink privacy, user data, cookies policy" />
            </Helmet>
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in">
                <div className="max-w-4xl mx-auto text-gray-300 prose prose-invert prose-p:text-gray-300 prose-h1:text-white prose-h2:text-brand-primary prose-h3:text-white prose-li:text-gray-300 legal-text">
                    <h1 className="text-4xl font-bold text-white mb-6 text-center">Privacy Policy</h1>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>
                        Welcome to <strong>QuickLink</strong> ("Company", "We", "Us", "Our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our URL shortening and QR code generation services (collectively, the "Service").
                    </p>

                    <h2>1. Collecting and Using Your Personal Data</h2>
                    <h3>Types of Data Collected</h3>
                    
                    <h4>Personal Data</h4>
                    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information. This may include, but is not limited to:</p>
                    <ul>
                        <li>Email address, first name, and last name (when creating an account).</li>
                        <li>Payment information (processed by our third-party payment provider. <strong>We do not store your full card details</strong>).</li>
                        <li><strong>Two-Factor Authentication Data:</strong> If you enable 2FA, we store an encrypted secret key linked to your account. We do not have access to your live authentication codes.</li>
                        <li><strong>QuickChat Data:</strong> If you use QuickChat, we may collect your chosen chat username, custom welcome message, and the content of your messages.</li>
                    </ul>

                    <h4>Usage Data</h4>
                    <p><strong>Usage Data</strong> is collected automatically when using the Service. It includes Your device's IP address, browser type, pages visited, and time spent on pages. For anonymous users, we collect IP addresses to enforce usage limits. For registered users, we may also collect device and browser information to enhance security and provide better support.</p>
                    
                    <h4>Tracking Technologies and Cookies</h4>
                    <p>We use essential and functionality Cookies to authenticate you, remember your preferences, and ensure the security of our Service. For more details, please see our Cookie Policy.</p>

                    <h3>Use of Your Personal Data</h3>
                    <p>The Company may use Personal Data for the following purposes:</p>
                    <ul>
                        <li><strong>To provide and maintain our Service,</strong> including monitoring usage and preventing abuse.</li>
                        <li><strong>To manage Your Account,</strong> including your registration and access to features.</li>
                        <li><strong>To contact You</strong> regarding your account, subscriptions, or important service updates.</li>
                         <li><strong>To manage Your requests,</strong> including support tickets and other inquiries.</li>
                         <li><strong>To enforce our Terms of Service,</strong> including moderating user-generated content on our Blog and QuickChat features.</li>
                    </ul>

                    <h2>2. Disclosure of Your Personal Data</h2>
                    <p><strong>We do not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties</strong> for marketing purposes. We may share information with trusted third parties who assist us in operating our website (e.g., payment processors, email providers), so long as those parties agree to keep this information confidential. We may also release information when required by law.</p>

                    <h2>3. Information Visible to Administrators</h2>
                    <p>To ensure the safety, security, and proper functioning of our platform, authorized administrators may access certain user data for moderation, support, and troubleshooting purposes. This may include:</p>
                    <ul>
                        <li>Your account details (name, email, subscription status).</li>
                        <li>The content of your support tickets.</li>
                        <li>User-generated content such as blog posts and comments.</li>
                        <li>The content of conversations within QuickChat for moderation purposes.</li>
                        <li>Session details such as the last known IP address and browser type for security investigations.</li>
                    </ul>
                    <p>Our administrators are bound by strict confidentiality policies.</p>

                    <h2>4. Data Retention and Security</h2>
                     <p>We will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. Usage data like IP addresses are retained as long as necessary for security and abuse prevention. User-generated content such as blog posts and chat messages are retained as long as your account is active, or as required for our platform's integrity.</p>
                    <p>The security of Your Personal Data is important to Us, but remember that <strong>no method of transmission over the Internet is 100% secure</strong>. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
                    
                    <h2>5. Children's Privacy</h2>
                    <p>Our Service does not address anyone under the age of 13. <strong>We do not knowingly collect personally identifiable information from anyone under the age of 13.</strong> If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us.</p>

                    <h2>6. Changes to this Privacy Policy</h2>
                    <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page. <strong>You are advised to review this Privacy Policy periodically for any changes.</strong></p>

                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, You can contact us through the links available on our website.</p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;
