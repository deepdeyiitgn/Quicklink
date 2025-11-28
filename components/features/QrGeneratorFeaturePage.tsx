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
import { VCardIcon, WifiIcon, CalendarIcon, UpiIcon } from '../icons/IconComponents';

const QrGeneratorFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>QR Code Generator | QuickLink Features</title>
                <meta name="description" content="Create dynamic and custom QR codes for URLs, Wi-Fi, vCards, events, and more. Customize colors and add your logo to make your QR code stand out." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">QR Code Generator</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Bridge the physical and digital worlds with custom, high-quality QR codes.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">More Than Just Links</h2>
                        <p className="text-gray-300">
                           Our QR Code Generator is a versatile suite that goes beyond simple website links. Create codes for a wide variety of actions to make life easier for your audience.
                        </p>
                         <ul className="space-y-2 text-gray-300 list-disc list-inside mt-4">
                            <li>Instantly share Wi-Fi credentials.</li>
                            <li>Provide your contact details with a vCard.</li>
                            <li>Create pre-filled emails, SMS, or WhatsApp messages.</li>
                            <li>Set up calendar events or share geographic locations.</li>
                            <li>Facilitate crypto or UPI payments.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                         <svg width="250" height="250" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100" height="100" rx="10" fill="#0a0a1a"/>
                            <rect x="20" y="20" width="25" height="25" rx="3" fill="#00e5ff"/>
                            <rect x="55" y="20" width="25" height="25" rx="3" fill="#846cff"/>
                            <rect x="20" y="55" width="25" height="25" rx="3" fill="#846cff"/>
                            <rect x="62" y="62" width="8" height="8" rx="1" fill="#00e5ff"/>
                            <rect x="55" y="77" width="8" height="8" rx="1" fill="#00e5ff"/>
                            <rect x="77" y="55" width="8" height="8" rx="1" fill="#00e5ff"/>
                        </svg>
                    </div>
                </div>
                
                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>

                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-primary mb-6 text-center">Use Cases for Every Need</h2>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="bg-black/20 p-4 rounded-lg">
                            <VCardIcon className="h-8 w-8 mx-auto text-brand-primary mb-2"/>
                            <h3 className="font-semibold text-white">Business Cards</h3>
                            <p className="text-gray-400 text-xs mt-1">Share contact info instantly.</p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg">
                            <WifiIcon className="h-8 w-8 mx-auto text-brand-primary mb-2"/>
                            <h3 className="font-semibold text-white">Guest Wi-Fi</h3>
                            <p className="text-gray-400 text-xs mt-1">Allow guests to connect without typing passwords.</p>
                        </div>
                         <div className="bg-black/20 p-4 rounded-lg">
                            <CalendarIcon className="h-8 w-8 mx-auto text-brand-primary mb-2"/>
                            <h3 className="font-semibold text-white">Event Invites</h3>
                            <p className="text-gray-400 text-xs mt-1">Let users add your event to their calendar with one scan.</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-lg">
                            <UpiIcon className="h-8 w-8 mx-auto text-brand-primary mb-2"/>
                            <h3 className="font-semibold text-white">Payments</h3>
                            <p className="text-gray-400 text-xs mt-1">Accept UPI or crypto payments effortlessly.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                     <div className="glass-card p-8 rounded-2xl md:order-2">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4">Customize Your Brand</h2>
                        <p className="text-gray-300">
                           Make your QR codes an extension of your brand identity. Our customization options allow you to stand out from the crowd.
                        </p>
                         <ul className="space-y-2 text-gray-300 list-disc list-inside mt-4">
                            <li><strong>Color Palette:</strong> Change the color of the QR code dots and background to match your brand's colors.</li>
                            <li><strong>Add Your Logo:</strong> Upload your company or personal logo to be placed in the center of the QR code.</li>
                             <li><strong>High-Resolution Download:</strong> Download your final creation as a high-quality PNG, ready for print or digital use.</li>
                        </ul>
                    </div>
                     <div className="flex justify-center md:order-1">
                        <svg width="250" height="250" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="#846cff" strokeWidth="4"/>
                            <path d="M50 30C61.0457 30 70 38.9543 70 50" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round">
                                <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="2s" repeatCount="indefinite"/>
                            </path>
                            <circle cx="50" cy="50" r="10" fill="#00e5ff"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>
                
                 <div className="text-center">
                    <Link to="/qr-generator" className="inline-block px-10 py-4 bg-brand-secondary text-white text-lg font-semibold rounded-lg hover:bg-brand-secondary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#846cff]">
                        Create Your QR Code
                    </Link>
                </div>
            </div>
        </>
    );
};

export default QrGeneratorFeaturePage;