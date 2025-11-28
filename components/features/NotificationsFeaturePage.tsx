// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   🛡️ Helper: Google Gemini & ChatGPT
//   🌐 WEBSITE: https://qlynk.vercel.app
//   📅 CREATED: 2025
//   🧠 DESCRIPTION:
//       QuickLink is a secure, high-performance web application designed for 
//       shortening URLs, generating QR codes, and providing developers with 
//       easy-to-integrate API services. Built with simplicity, reliability, 
//       and speed in mind by Deep Dey.
//
//   ⚙️ TECHNOLOGY STACK:
//       - HTML, CSS, TypeScript
//       - Node.js / Express (Backend)
//       - Vercel (Deployment)
//       - JSON API Integration
//
//   📩 CONTACT:
//       ✉️ Email: thedeeparise@gmail.com
//       🔗 GitHub: https://github.com/deepdeyiitgn/QuickLink
//       🧾 License: All Rights Reserved © 2025 Deep Dey
//       💬 Instagram: https://www.instagram.com/deepdey.official/
//
//   ⚠️ LEGAL NOTICE:
//       This source code is the intellectual property of Deep Dey. 
//       Any unauthorized copying, modification, distribution, or use of 
//       this project in whole or in part without written permission is 
//       strictly prohibited and may result in legal action.
//
// ===================================================================================

import React from 'react';
import { Helmet } from 'react-helmet';
// FIX: Corrected import from "react-router-dom" to resolve module not found errors by changing single quotes to double quotes.
import { Link } from "react-router-dom";
import AdComponent from '../AdComponent';

const NotificationsFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Notifications System | QuickLink Features</title>
                <meta name="description" content="Stay informed with QuickLink's notification system. Get real-time alerts for support ticket replies, subscription updates, and important announcements." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Stay in the Loop</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Never miss an important update with our integrated notification system.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Real-Time Alerts</h2>
                        <p className="text-gray-300">
                           Our notification system ensures you're always aware of important account activity. You'll receive alerts for:
                        </p>
                        <ul className="space-y-3 text-gray-300 list-disc list-inside mt-4">
                            <li>Replies to your support tickets.</li>
                            <li>Subscription status changes and expiration warnings.</li>
                            <li>Important announcements and new feature releases from the QuickLink team.</li>
                            <li>Security alerts related to your account.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                         <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 12 3 14 3 14H21C21 14 18 12 18 8Z" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.73 21C12.5542 21.3031 12.2855 21.5446 11.9587 21.6839C11.6319 21.8232 11.2671 21.8519 10.9201 21.7644C10.5731 21.677 10.2673 21.478 10.0556 21.1999C9.84397 20.9217 9.74291 20.5841 9.76 20.24" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                
                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Browser & In-App Notifications</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-6">
                        Receive alerts where it's most convenient for you. Enable browser notifications for instant pop-ups, or check your unread count in the app header at any time.
                    </p>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-primary mb-6 text-center">For Administrators</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto">
                        The admin dashboard includes a powerful tool to send targeted notifications. You can send a message to a single user, or broadcast an announcement to everyone on the platform. This is perfect for:
                    </p>
                    <ul className="space-y-4 text-gray-300 list-disc list-inside mt-6 max-w-lg mx-auto">
                        <li>Announcing new features or planned maintenance.</li>
                        <li>Notifying a user about a specific issue with their account.</li>
                        <li>Sending promotional offers or updates.</li>
                    </ul>
                </div>
                
                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
            </div>
        </>
    );
};

export default NotificationsFeaturePage;