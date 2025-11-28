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
import { Link } from 'react-router-dom';
import AdComponent from '../AdComponent';

const VisionFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Our Vision | QuickLink Features</title>
                <meta name="description" content="Discover the mission and philosophy of QuickLink—to make information sharing seamless, secure, and efficient for everyone, from casual users to developers." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Our Vision</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Making Information Sharing Seamless, Secure, and Efficient.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">The Core Mission</h2>
                        <p className="text-gray-300">
                           In a digital world overflowing with information, clarity and simplicity are paramount. Long, cumbersome URLs create friction for users and dilute brand identity. QuickLink's mission is to solve this problem by providing a fast, reliable, and feature-rich platform to make sharing information as seamless, secure, and efficient as possible for everyone.
                        </p>
                    </div>
                     <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="9" stroke="#846cff" strokeWidth="1.5"/>
                            <path d="M12 5V12L16 14" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">A Tool for Everyone</h2>
                    <p className="text-gray-300 text-center max-w-3xl mx-auto mb-6">
                        Our platform is designed to be versatile for a wide range of users, ensuring that anyone can benefit from smarter link management.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-black/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-white">Marketers</h3>
                            <p className="text-gray-400 text-sm mt-1">Create branded links and track performance.</p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-white">Creators</h3>
                            <p className="text-gray-400 text-sm mt-1">Simplify links in bios, descriptions, and posts.</p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-white">Businesses</h3>
                            <p className="text-gray-400 text-sm mt-1">Share menus, contacts, or Wi-Fi with QR codes.</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg">
                            <h3 className="font-semibold text-white">Developers</h3>
                            <p className="text-gray-400 text-sm mt-1">Automate link creation with our simple API.</p>
                        </div>
                    </div>
                </div>

                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>

                 <div className="text-center">
                    <Link to="/about" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Learn More About the Project
                    </Link>
                </div>                
                
                 <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Commitment to Free Access</h2>
                        <p className="text-gray-300">
                           We firmly believe that essential tools should be accessible to everyone. That's why the core features of QuickLink—URL shortening and QR code generation—will always be free. The project is supported by non-intrusive ads and optional premium features for power users, ensuring the platform remains sustainable and available for all.
                        </p>
                    </div>
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4">The Future of QuickLink</h2>
                        <p className="text-gray-300">
                           This is just the beginning. We are constantly working on new features and improvements to make QuickLink even more powerful. Our roadmap includes deeper analytics for links, team collaboration features, more advanced QR code types, and further enhancements to the developer API. We're excited to build the future of link management with our community.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisionFeaturePage;
