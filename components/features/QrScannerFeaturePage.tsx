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

const QrScannerFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>QR Code Scanner | QuickLink Features</title>
                <meta name="description" content="Instantly scan any QR code using your device's camera or by uploading an image. Our browser-based scanner is fast, private, and requires no app installation." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">QR Code Scanner</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Fast, private, and powerful QR code scanning, right in your browser.
                    </p>
                     <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Two Ways to Scan</h2>
                        <p className="text-gray-300">
                          Our scanner gives you the flexibility to read QR codes from any source, ensuring you can always get the information you need, when you need it.
                        </p>
                        <ul className="space-y-3 text-gray-300 list-disc list-inside mt-4">
                            <li><strong>Live Camera Scan:</strong> Simply point your device's camera at a QR code. Our scanner will automatically detect and decode it in real-time.</li>
                            <li><strong>Upload an Image:</strong> Have a QR code in a screenshot or a photo? Upload the image file, and our tool will find and read the code for you.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                         <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 3H4C3.44772 3 3 3.44772 3 4V7" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 3H20C20.5523 3 21 3.44772 21 4V7" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 21H4C3.44772 21 3 20.5523 3 20V17" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17 21H20C20.5523 21 21 20.5523 21 20V17" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 12H17" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
                
                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>
                
                <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-4 text-center">Intelligent & Robust</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto">
                       We've engineered our scanner to be smart and reliable. It automatically detects the type of data in the QR code—whether it's a URL, contact info, or Wi-Fi credentials—and presents it in a clear, readable format.
                    </p>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mt-4">
                        If our primary scanner fails, we have multiple fallback methods, including a powerful third-party API, to ensure the highest possible success rate, even with damaged or complex QR codes.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>

                <div className="text-center">
                    <Link to="/qr-scanner" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                       Try the Scanner
                    </Link>
                </div>
            </div>
        </>
    );
};

export default QrScannerFeaturePage;