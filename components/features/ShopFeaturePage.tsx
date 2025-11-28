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

const ShopFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Shop & Subscriptions | QuickLink Features</title>
                <meta name="description" content="Upgrade your QuickLink experience with premium plans and digital products. Learn about one-time payments, our advanced coupon system, and secure payment processing." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Shop & Subscriptions</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Unlock Premium Features and Support QuickLink.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Why Go Premium?</h2>
                        <p className="text-gray-300">
                           While our core tools are free, a premium subscription unlocks the full potential of QuickLink and helps support its continued development. Premium benefits are activated through simple, one-time payments.
                        </p>
                        <ul className="space-y-2 text-gray-300 list-disc list-inside mt-4">
                            <li><strong>Longer Link Expiry:</strong> Get links that last for months or up to a full year.</li>
                            <li><strong>More URL Credits:</strong> Receive a generous bundle of URL creation credits with your purchase.</li>
                            <li><strong>Premium Badge:</strong> Stand out in the community with a premium badge on your blog posts and comments.</li>
                            <li><strong>Support the Project:</strong> Your purchase directly funds server costs and new feature development.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 15L15 12L12 9" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 12H15" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Flexible & Secure E-commerce</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-6">
                        Our shop is designed to be straightforward and secure, giving you control over your purchases.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">One-Time Payments</h3>
                            <p className="text-gray-400 text-sm">No hidden fees or recurring subscriptions. Every purchase in our shop is a one-time transaction. Your benefits are active for the specified duration, and you can choose to extend them whenever you like.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Advanced Coupon System</h3>
                            <p className="text-gray-400 text-sm">Admins can create and manage a variety of discount coupons (percentage or flat-rate) with limits on expiration, quantity, and usage per user. Keep an eye out for special promotions!</p>
                        </div>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>

                <div className="text-center">
                    <Link to="/shop" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Visit the Shop
                    </Link>
                </div>
            </div>
        </>
    );
};

export default ShopFeaturePage;