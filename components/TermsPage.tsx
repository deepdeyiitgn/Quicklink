import React from 'react';
import { Helmet } from 'react-helmet';

const TermsPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Terms of Service | QuickLink</title>
                <meta name="description" content="Read the official Terms of Service for using QuickLink. This document outlines your rights and responsibilities, our acceptable use policy, and information on subscriptions and accounts." />
                <meta name="keywords" content="terms of service, terms and conditions, quicklink terms, legal, usage policy" />
            </Helmet>
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in">
                <div className="max-w-4xl mx-auto text-gray-300 prose prose-invert prose-p:text-gray-300 prose-h1:text-white prose-h2:text-brand-primary prose-h3:text-white prose-li:text-gray-300 legal-text">
                    <h1 className="text-4xl font-bold text-white mb-6 text-center">Terms of Service</h1>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>
                        Please read these terms and conditions (<strong>"Terms"</strong>, <strong>"Terms of Service"</strong>) carefully before using the QuickLink website (the <strong>"Service"</strong>) operated by QuickLink (<strong>"us"</strong>, <strong>"we"</strong>, or <strong>"our"</strong>).
                    </p>

                    <h2>1. Acknowledgment</h2>
                    <p>
                        These are the Terms of Service governing the use of this Service and the agreement that operates between You and the Company. These Terms set out the rights and obligations of all users regarding the use of the Service. Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms. <strong>These Terms apply to all visitors, users, and others who access or use the Service.</strong>
                    </p>
                    <p>
                        By accessing or using the Service You agree to be bound by these Terms. If You disagree with any part of these Terms then You may not access the Service.
                    </p>
                    <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with our Privacy Policy. Please read Our Privacy Policy carefully before using Our Service.</p>

                    <h2>2. User Accounts</h2>
                    <p>
                        When You create an account with Us, <strong>You must provide Us with information that is accurate, complete, and current at all times.</strong> Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
                    </p>
                    <p>
                        <strong>You are responsible for safeguarding the password</strong> and any Two-Factor Authentication (2FA) methods you use to access the Service and for any activities or actions under Your account. You agree not to disclose Your password to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
                    </p>

                    <h2>3. Usage Limits and Service Tiers</h2>
                    <p>The Service imposes limits on URL creation based on your user status:</p>
                    <ul>
                        <li><strong>Anonymous Users:</strong> Users who are not logged in are limited to creating a maximum of <strong>10 short URLs per IP address</strong>. These links expire after 24 hours.</li>
                        <li><strong>Free Registered Users:</strong> Users with a free account receive a starting credit of <strong>50 short URLs</strong>. These links expire after 7 days. Once credits are exhausted, you will be unable to create new links until you upgrade.</li>
                        <li><strong>Premium Users:</strong> Users who have purchased a subscription or product receive additional URL credits. The expiration of these links depends on the plan purchased, lasting up to one year.</li>
                        <li><strong>Administrators:</strong> Administrator accounts are not subject to these creation limits.</li>
                    </ul>

                    <h2>4. Acceptable Use and Content Restrictions</h2>
                    <p>You agree not to use the Service to create, share, or redirect to any content that:</p>
                    <ul>
                        <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
                        <li>Promotes illegal activity or contributes to the creation of viruses, malware, or any other destructive code.</li>
                        <li>Infringes on the intellectual property rights of others, including patents, copyrights, trademarks, or trade secrets.</li>
                        <li>Is used for "phishing," "spamming," or any other unsolicited advertising or promotional materials.</li>
                    </ul>
                    <p><strong>We reserve the right, but not the obligation, to investigate and/or terminate or block your account</strong> without a refund of any subscription fees if you have violated this provision, misused the Service, or behaved in a way we regard as inappropriate or unlawful.</p>
                    
                    <h2>5. User-Generated Content (Blog & Chat)</h2>
                    <p>Our Service allows you to post content on our Community Blog and communicate with other users via QuickChat ("User-Generated Content"). You are solely responsible for the content you create and post.</p>
                    <ul>
                        <li>You retain all of your rights to any User-Generated Content you submit, post or display on or through the Service and you are responsible for protecting those rights.</li>
                        <li>By posting content, you grant Us a non-exclusive, worldwide, royalty-free license to use, modify, publicly display, and distribute such content on and through the Service.</li>
                        <li>You represent and warrant that the content is Yours (you own it) or you have the right to use it and grant Us the rights as provided in these Terms.</li>
                        <li>We reserve the right to monitor, moderate, and remove any User-Generated Content that, in our sole discretion, violates these Terms or our acceptable use policies.</li>
                    </ul>

                    <h2>6. Subscriptions and Payments</h2>
                    <h4>Subscription</h4>
                    <p>Some parts of the Service are available only with a paid Subscription. You will be billed in advance on a one-time basis for the period you select. All payments are handled by our third-party payment processors. <strong>We do not store your payment card details.</strong></p>
                    <h4>Fee Changes</h4>
                    <p>The Company, in its sole discretion and at any time, may modify the Subscription fees. Any Subscription fee change will become effective at the end of the then-current Billing Cycle. Please refer to our Cancellation & Refund Policy for more details.</p>

                    <h2>7. Intellectual Property</h2>
                    <p>
                        The Service and its original content (excluding User-Generated Content), features, and functionality are and will remain the exclusive property of QuickLink and its licensors.
                    </p>

                    <h2>8. Links to Other Websites</h2>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company. <strong>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services.</strong>
                    </p>

                    <h2>9. Termination and Account Blocking</h2>
                    <p>
                        We may terminate, suspend, or permanently block Your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions, including the policies on Acceptable Use and User-Generated Content. Upon termination, Your right to use the Service will cease immediately.
                    </p>

                    <h2>10. Limitation of Liability</h2>
                    <p>
                        To the maximum extent permitted by applicable law, <strong>in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever</strong> arising out of or in any way related to the use of or inability to use the Service.
                    </p>

                    <h2>11. "As Is" and "As Available" Disclaimer</h2>
                    <p>
                        The Service is provided to You <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> and with all faults and defects without warranty of any kind.
                    </p>

                    <h2>12. Governing Law & Disputes Resolution</h2>
                    <p>The laws of the jurisdiction in which the Company is established shall govern this Terms and Your use of the Service. <strong>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</strong></p>
                    
                    <h2>13. Changes to These Terms and Conditions</h2>
                    <p>
                        We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. We will let you know via a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of these Terms.
                    </p>

                    <h2>14. Advertisements and User Support</h2>
                    <p>
                        This Service is supported by advertisements displayed on various pages. Revenue generated from these ads is crucial for covering server costs and allows Us to continue offering many of our core features for free. If you are unable or choose not to purchase a subscription, we kindly ask that you consider disabling your adblocker while using Our Service.
                    </p>

                    <h2>15. Contact Us</h2>
                    <p>If you have any questions about these Terms, You can contact us through the links available on our website.</p>
                </div>
            </div>
        </>
    );
};

export default TermsPage;
