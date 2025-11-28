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

const ShortenerFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>URL Shortener | QuickLink Features</title>
                <meta name="description" content="Create short, custom, and memorable links with QuickLink's powerful URL shortener. Perfect for branding, sharing, and managing your digital presence." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">URL Shortener</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Transform long, messy URLs into short, powerful links.
                    </p>
                     <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Clean & Memorable</h2>
                        <p className="text-gray-300">
                            Long URLs are hard to remember and look cluttered. Our URL shortener cleans up your links, making them easy to share on social media, in emails, or even verbally. A short, clean link is more trustworthy and gets more clicks.
                        </p>
                    </div>
                     <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M8 12H16" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>

                 <div className="grid md:grid-cols-2 gap-8 items-center">
                     <div className="glass-card p-8 rounded-2xl md:order-2">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4">Custom Aliases for Branding</h2>
                        <p className="text-gray-300">
                           Take control of your brand with custom aliases. Instead of a random string of characters, create a link that reflects your content. Transform a long URL into something like <code className="bg-black/30 p-1 rounded text-brand-primary">qlynk.vercel.app/my-event</code>. It's easier for your audience to remember and reinforces your brand identity.
                        </p>
                    </div>
                     <div className="flex justify-center md:order-1">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.0001 5.5L13.0001 18.5" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 9.5L5 12.5L8 15.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 9.5L19 12.5L16 15.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>
                
                 <div className="text-center">
                    <Link to="/shortener" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Shorten a Link Now
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ShortenerFeaturePage;