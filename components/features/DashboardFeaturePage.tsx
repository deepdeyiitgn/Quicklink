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

const DashboardFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Dashboards | QuickLink Features</title>
                <meta name="description" content="Manage your account, links, subscriptions, and support tickets from your personal dashboard. Admins get powerful tools to manage the entire platform." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Your Control Center</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        The QuickLink dashboard is your central hub for managing everything.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#846cff" strokeWidth="1.5"/>
                            <path d="M3 9H21" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M9 3V21" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M12 12H18" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M12 16H16" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                     <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">User Dashboard</h2>
                        <ul className="space-y-3 text-gray-300 list-disc list-inside">
                            <li><strong>Profile Management:</strong> Update your name and profile picture.</li>
                            <li><strong>Subscription Status:</strong> View your current plan and benefits.</li>
                            <li><strong>Link History:</strong> See all the links you've created, both active and expired.</li>
                            <li><strong>Support Tickets:</strong> Create and manage your support requests in one place.</li>
                            <li><strong>Security:</strong> Set up Two-Factor Authentication (2FA) for enhanced account protection.</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                    <AdComponent type="in-feed" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl md:order-2">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4">Admin Dashboard</h2>
                         <ul className="space-y-3 text-gray-300 list-disc list-inside">
                            <li><strong>Live Activity:</strong> Monitor system status and online users in real-time.</li>
                            <li><strong>User Management:</strong> View, edit, and manage all users on the platform.</li>
                            <li><strong>Content Moderation:</strong> Approve blog posts and manage all user-generated content.</li>
                            <li><strong>E-commerce Control:</strong> Create and manage products and discount coupons for the shop.</li>
                            <li><strong>Global Notifications:</strong> Send announcements to all users or specific individuals.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center md:order-1">
                       <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 15V9C4 5.68629 6.68629 3 10 3H14C17.3137 3 20 5.68629 20 9V15C20 18.3137 17.3137 21 14 21H10C6.68629 21 4 18.3137 4 15Z" stroke="#846cff" strokeWidth="1.5"/>
                            <path d="M9 12C9 13.3807 10.1193 14.5 11.5 14.5C12.8807 14.5 14 13.3807 14 12C14 10.6193 12.8807 9.5 11.5 9.5" stroke="#00e5ff" strokeWidth="1.5"/>
                            <path d="M11.5 14.5V16.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M11.5 7.5V9.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                       </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>
            </div>
        </>
    );
};

export default DashboardFeaturePage;