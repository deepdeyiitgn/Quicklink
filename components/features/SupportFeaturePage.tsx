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

const SupportFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Support Ticket System | QuickLink Features</title>
                <meta name="description" content="Get help when you need it with QuickLink's integrated support ticket system. Learn how to create tickets, track conversations, and get assistance from our team." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Support Ticket System</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Your Direct Line to Us. Get Help When You Need It.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Streamlined Support</h2>
                        <p className="text-gray-300">
                           Our integrated support ticket system is designed to provide a seamless and efficient way for you to get help. Instead of sending emails back and forth, you can create, manage, and track all your support conversations directly within your QuickLink dashboard.
                        </p>
                    </div>
                    <div className="flex justify-center">
                       <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 15.3137 3.68629 18 6.5 19.5" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M16 10H16.009" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 10H12.009" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 10H8.009" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">How It Works</h2>
                    <ol className="relative border-l border-gray-700 space-y-10 ml-4">
                        <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">1</span>
                            <h3 className="text-xl font-semibold text-white">Create a Ticket</h3>
                            <p className="text-gray-400">If you're a registered user, you can create a new ticket directly from your dashboard or our contact page. Provide a subject and a detailed message describing your issue.</p>
                        </li>
                        <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">2</span>
                            <h3 className="text-xl font-semibold text-white">Track Your Conversation</h3>
                            <p className="text-gray-400">View the status of your tickets (Open, In-Progress, Closed) and read all replies in a clean, threaded conversation view. No more searching through your inbox.</p>
                        </li>
                         <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">3</span>
                            <h3 className="text-xl font-semibold text-white">Get Notified</h3>
                            <p className="text-gray-400">When an admin replies to your ticket, you'll receive a notification within the app, ensuring you never miss an update.</p>
                        </li>
                    </ol>
                </div>
                
                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>

                <div className="text-center">
                    <Link to="/contact" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Contact Support
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SupportFeaturePage;