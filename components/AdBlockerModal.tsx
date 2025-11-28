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

// Imports Start Here
import React, { useState, useEffect } from 'react';
import { XIcon } from './icons/IconComponents';
// Imports End Here

// Interface Definition Start Here
interface AdBlockerModalProps {
    onClose: () => void;
}
// Interface Definition End Here

// AdBlockerModal Component Definition Start Here
const AdBlockerModal: React.FC<AdBlockerModalProps> = ({ onClose }) => {
    // State Hooks Start Here
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [activeTab, setActiveTab] = useState<'chrome' | 'edge' | 'extensions'>('chrome');
    // State Hooks End Here

    // useEffect for Close Button Timer Start Here
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCloseButton(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer);
    }, []);
    // useEffect for Close Button Timer End Here

    // Component Render Start Here
    return (
        <div className="fixed inset-0 bg-blue-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
            <div className="relative w-full max-w-2xl bg-brand-dark/80 border border-brand-primary/50 rounded-2xl p-8 text-center shadow-2xl">
                {showCloseButton && (
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                        <XIcon className="h-6 w-6" />
                    </button>
                )}

                <h1 className="text-4xl font-bold text-brand-primary mb-4 animate-aurora">Please support us!</h1>
                <p className="text-gray-300 mb-6">
                    We noticed you're using an adblocker. QuickLink is a free service maintained by a solo developer, and advertisements are our primary way of covering server costs and continuing development.
                </p>
                <p className="text-gray-300 mb-8">
                    To help us keep this service running, please consider disabling your adblocker for our site.
                </p>

                <div className="bg-black/30 p-4 rounded-lg text-left">
                    <h3 className="font-semibold text-white mb-3">How to Disable Your Adblocker</h3>
                    <div className="flex border-b border-white/20 mb-3">
                        <button onClick={() => setActiveTab('chrome')} className={`px-4 py-2 text-sm ${activeTab === 'chrome' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}>Chrome</button>
                        <button onClick={() => setActiveTab('edge')} className={`px-4 py-2 text-sm ${activeTab === 'edge' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}>Edge</button>
                        <button onClick={() => setActiveTab('extensions')} className={`px-4 py-2 text-sm ${activeTab === 'extensions' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}>Extensions</button>
                    </div>
                    <div className="text-xs text-gray-400 space-y-2">
                        {activeTab === 'chrome' && (
                            <ol className="list-decimal list-inside">
                                <li>Click the three dots in the top-right corner.</li>
                                <li>Go to <strong>Settings &rarr; Privacy and security &rarr; Site Settings</strong>.</li>
                                <li>Scroll down to <strong>Additional content settings &rarr; Ads</strong>.</li>
                                <li>Under "Allowed to show ads," click "Add" and enter our site's URL.</li>
                            </ol>
                        )}
                        {activeTab === 'edge' && (
                             <ol className="list-decimal list-inside">
                                <li>Click the three dots in the top-right corner.</li>
                                <li>Go to <strong>Settings &rarr; Cookies and site permissions</strong>.</li>
                                <li>Scroll down to <strong>Ads</strong> and click it.</li>
                                <li>Under the "Allow" section, click "Add" and enter our site's URL.</li>
                            </ol>
                        )}
                        {activeTab === 'extensions' && (
                            <ol className="list-decimal list-inside">
                                <li>Click the puzzle piece icon (Extensions) in your browser's toolbar.</li>
                                <li>Find your adblocker (e.g., AdBlock, uBlock Origin).</li>
                                <li>Click the three dots next to it and find an option like "Pause on this site" or "Don't run on pages on this site."</li>
                            </ol>
                        )}
                    </div>
                </div>

                 {!showCloseButton && (
                    <p className="text-xs text-gray-500 mt-6 animate-pulse">
                        You can close this window in a few seconds...
                    </p>
                )}
            </div>
        </div>
    );
    // Component Render End Here
};
// AdBlockerModal Component Definition End Here

// Default Export Start Here
export default AdBlockerModal;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================