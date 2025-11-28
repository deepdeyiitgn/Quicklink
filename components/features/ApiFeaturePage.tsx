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
// FIX: Replaced missing ZapIcon and ScalingIcon with available icons.
import { ShieldCheckIcon,LightbulbIcon,ServerIcon } from '../icons/IconComponents';

const ApiFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Developer API | QuickLink Features</title>
                <meta name="description" content="Integrate QuickLink's URL shortening capabilities into your applications with our simple and powerful REST API. Get your API key and start building today." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Developer API</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Automate and integrate. Bring the power of QuickLink into your own applications.
                    </p>
                     <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Simple & Powerful</h2>
                        <p className="text-gray-300">
                            Our REST API is designed for developers who need a reliable and fast URL shortening service. With just a simple HTTP POST request, you can create short links programmatically, making it perfect for automating social media posts, email campaigns, or integrating into your own SaaS products.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 17.9295C8.98063 18.6542 10.4243 19.5 12 19.5C13.5757 19.5 15.0194 18.6542 16 17.9295" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M8.45568 14.3119C9.13109 14.8053 10.4627 15.5 12 15.5C13.5373 15.5 14.8689 14.8053 15.5443 14.3119" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M9.13313 10.4633C9.68331 10.8223 10.7556 11.5 12 11.5C13.2444 11.5 14.3167 10.8223 14.8669 10.4633" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M12 4.5V9.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                            <path d="M10.25 7.5L12 9.5L13.75 7.5" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>

                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Key Benefits</h2>
                     <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="bg-black/20 p-6 rounded-lg">
                            <LightbulbIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-lg">Automation</h3>
                            <p className="text-gray-400 text-sm mt-1">Generate thousands of links on the fly without manual work.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <ShieldCheckIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-lg">Integration</h3>
                            <p className="text-gray-400 text-sm mt-1">Seamlessly embed link shortening into your existing workflows and applications.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <ServerIcon className="h-10 w-10 mx-auto text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-lg">Scalability</h3>
                            <p className="text-gray-400 text-sm mt-1">Our robust infrastructure is built to handle high volumes of API requests reliably.</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-primary mb-6 text-center">How It Works: A 3-Step Workflow</h2>
                    <ol className="relative border-l border-gray-700 space-y-10 ml-4">
                        <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">1</span>
                            <h3 className="text-xl font-semibold text-white">Get Your API Key</h3>
                            <p className="text-gray-400">Sign up for a free QuickLink account and generate your unique API key from the API Access page in your dashboard. Your key authenticates your requests and links them to your account.</p>
                        </li>
                        <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">2</span>
                            <h3 className="text-xl font-semibold text-white">Make a POST Request</h3>
                            <p className="text-gray-400">Send a POST request to our simple API endpoint with your long URL and an optional custom alias in the JSON body. Remember to include your API key in the Authorization header as a Bearer token.</p>
                        </li>
                         <li className="ml-8">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-brand-secondary rounded-full -left-4 ring-4 ring-brand-dark">3</span>
                            <h3 className="text-xl font-semibold text-white">Receive Your Short Link</h3>
                            <p className="text-gray-400">The API will instantly respond with a JSON object containing your new short URL, ready to be used in your application. It's that simple!</p>
                        </li>
                    </ol>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>

                <div className="text-center">
                    <Link to="/api-access" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Get Your API Key
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>
            </div>
        </>
    );
};

export default ApiFeaturePage;