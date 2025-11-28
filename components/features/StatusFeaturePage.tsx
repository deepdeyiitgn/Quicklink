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

const StatusFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>System Status | QuickLink Features</title>
                <meta name="description" content="View the live operational status of all QuickLink services. Our status page offers full transparency on the health of our database, authentication, URL services, and payment gateways." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">System Status</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Live Transparency on Our Service Health.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Real-Time Monitoring</h2>
                        <p className="text-gray-300">
                            We believe in transparency. Our public status page provides a live, comprehensive health check of all our critical services. If something isn't working as expected, this is the first place to look for information and updates.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 12H20" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M4 12L7 9" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 12L7 15" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 12L17 9" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M20 12L17 15" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 18V6" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M15 18V6" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">What We Track</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-6">
                        The status page monitors the health of every core component of the QuickLink infrastructure.
                    </p>
                    <ul className="grid grid-cols-2 gap-4 text-gray-300">
                        <li className="bg-black/20 p-4 rounded-lg"><strong>Database:</strong> Monitors connectivity to our MongoDB Atlas cluster.</li>
                        <li className="bg-black/20 p-4 rounded-lg"><strong>Authentication:</strong> Checks the health of login, signup, and session management services.</li>
                        <li className="bg-black/20 p-4 rounded-lg"><strong>URL Services:</strong> Ensures that link creation and redirection are working correctly.</li>
                        <li className="bg-black/20 p-4 rounded-lg"><strong>Payment Gateways:</strong> Verifies that our payment processors are configured and reachable.</li>
                    </ul>
                </div>
                
                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>
                
                <div className="text-center">
                    <Link to="/status" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        View Live Status
                    </Link>
                </div>
            </div>
        </>
    );
};

export default StatusFeaturePage;