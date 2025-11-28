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

const ChatFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>QuickChat | QuickLink Features</title>
                <meta name="description" content="Connect with other QuickLink users through our private, secure, and request-based messaging system. Learn about its privacy features and admin moderation tools." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">QuickChat</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Private, Secure Messaging for QuickLink Users.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Connect Instantly</h2>
                        <p className="text-gray-300">
                           QuickChat is a lightweight, integrated messaging system that allows you to connect with other registered users on the platform. It's designed for simple, direct conversations without the complexity of a full-fledged social media app.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10L12 14L16 10" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#00e5ff" strokeWidth="1.5"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Designed for Privacy & Safety</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Privacy First</h3>
                            <p className="text-gray-400 text-sm">Your privacy is paramount. You can set a custom chat username, and your real name is only shown after you accept a chat. Profile pictures and emails are never exposed until you explicitly allow it in settings.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Request-Based System</h3>
                            <p className="text-gray-400 text-sm">To prevent spam and unwanted messages, a user must accept a chat request before a conversation can begin. You have full control over who can message you.</p>
                        </div>
                        <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Personalization</h3>
                            <p className="text-gray-400 text-sm">Set a custom welcome message that appears when someone starts a chat with you. Control your profile picture visibility to maintain your privacy.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Admin Moderation</h3>
                            <p className="text-gray-400 text-sm">Admins can monitor conversations, define a list of censored words, and disable chat privileges for any user to maintain a safe and respectful environment.</p>
                        </div>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>
            </div>
        </>
    );
};

export default ChatFeaturePage;