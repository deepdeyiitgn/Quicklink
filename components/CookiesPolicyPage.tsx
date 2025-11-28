import React from 'react';
import { Helmet } from 'react-helmet';

const CookiesPolicyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Cookie Policy | QuickLink</title>
                <meta name="description" content="Learn about how QuickLink uses cookies for authentication, functionality, and security. Understand what cookies are and how you can manage them." />
                <meta name="keywords" content="cookie policy, cookies, quicklink cookies, data privacy" />
            </Helmet>
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in">
                <div className="max-w-4xl mx-auto text-gray-300 prose prose-invert prose-p:text-gray-300 prose-h1:text-white prose-h2:text-brand-primary legal-text">
                    <h1 className="text-4xl font-bold text-white mb-6 text-center">Cookie Policy</h1>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>
                        This Cookie Policy explains what cookies are and how we use them on QuickLink. You should read this policy to understand what type of cookies we use, the information we collect using cookies, and how that information is used.
                    </p>

                    <h2>What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are widely used to "remember" you and your preferences, either for a single visit (through a "session cookie") or for multiple repeat visits (using a "persistent cookie").
                    </p>

                    <h2>How We Use Cookies</h2>
                    <p>We use cookies for a few essential purposes:</p>
                    <ul>
                        <li>
                            <strong>Authentication:</strong> We use cookies to identify you when you log in to our Service. This cookie allows you to move from page to page within the site without having to log in again.
                        </li>
                        <li>
                            <strong>Functionality & Preferences:</strong> We use cookies to store your preferences, such as your choice of theme (light/dark mode).
                        </li>
                         <li>
                            <strong>Security:</strong> We use cookies to help enable and support our security features, such as Cross-Site Request Forgery (CSRF) protection.
                        </li>
                    </ul>
                    
                    <h2>Third-Party Cookies</h2>
                    <p>
                        We do not use third-party cookies for advertising or cross-site tracking. Our use of cookies is strictly limited to the essential functionality of the QuickLink website. However, some third-party services that are essential for our operation may set their own cookies:
                    </p>
                    <ul>
                      <li><strong>Google:</strong> Google may set cookies as part of its reCAPTCHA service (to protect against bots) and its Google Identity Services (for "Sign in with Google" functionality).</li>
                      <li><strong>Payment Processors:</strong> Our payment providers (e.g., Razorpay) may use their own cookies during the payment process to ensure a secure and seamless transaction.</li>
                    </ul>
                    <p>We do not have access to or control over these third-party cookies. Please review their respective privacy and cookie policies for more information.</p>

                    <h2>Your Choices Regarding Cookies</h2>
                    <p>
                        Most web browsers are set to accept cookies by default. However, you can usually choose to set your browser to remove or reject browser cookies. To do this, please follow the instructions provided by your browser.
                    </p>
                    <p>
                        Please be aware that if you choose to remove or reject essential cookies, this could affect the availability and functionality of our Service, such as your ability to stay logged in.
                    </p>

                    <h2>Changes to This Cookie Policy</h2>
                    <p>
                        We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                    </p>

                    <h2>Contact Us</h2>
                    <p>If you have any questions about this Cookie Policy, please contact us through the links available on our website.</p>
                </div>
            </div>
        </>
    );
};

export default CookiesPolicyPage;
