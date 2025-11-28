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
import React, { useEffect, useState } from 'react';
import { XIcon } from './icons/IconComponents';
// Imports End Here

// Interface Definition Start Here
interface AdComponentProps {
    type: 'display' | 'multiplex' | 'in-feed';
}
// Interface Definition End Here

// AdComponent Definition Start Here
const AdComponent: React.FC<AdComponentProps> = ({ type }) => {
    // State Hooks Start Here
    const [isVisible, setIsVisible] = useState(true);
    // State Hooks End Here

    // useEffect for AdSense Script Start Here
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, [type]);
    // useEffect for AdSense Script End Here

    // Visibility Check Start Here
    if (!isVisible) {
        return null;
    }
    // Visibility Check End Here

    // Ad Slot Configuration Start Here
    const adSlots = {
        display: "3287928373",
        multiplex: "6337597697",
        'in-feed': "2859525296",
    };
    // Ad Slot Configuration End Here

    // getAdContent Function Start Here
    const getAdContent = () => {
        switch (type) {
            case 'display':
                return (
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-client="ca-pub-2533086861741403"
                         data-ad-slot={adSlots.display}
                         data-ad-format="auto"
                         data-full-width-responsive="true"></ins>
                );
            case 'multiplex':
                return (
                    <ins className="adsbygoogle"
                         style={{ display: 'block' }}
                         data-ad-format="autorelaxed"
                         data-ad-client="ca-pub-2533086861741403"
                         data-ad-slot={adSlots.multiplex}></ins>
                );
            case 'in-feed':
                return (
                    <ins className="adsbygoogle"
                         style={{ display: 'block', width: '100%', height: '90px' }}
                         data-ad-client="ca-pub-2533086861741403"
                         data-ad-slot={adSlots['in-feed']}></ins>
                );
            default:
                return null;
        }
    };
    // getAdContent Function End Here
    
    // Component Render Start Here
    return (
        <div className="relative bg-black/20 p-2 rounded-lg border border-white/10 text-center">
            <div className="absolute top-0 left-1 text-xs text-gray-600 font-semibold select-none">Ad</div>
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-1 right-1 p-1 text-gray-600 hover:text-white rounded-full hover:bg-white/10"
                aria-label="Close ad"
            >
                <XIcon className="h-3 w-3" />
            </button>
            {getAdContent()}
        </div>
    );
    // Component Render End Here
};
// AdComponent Definition End Here

// Default Export Start Here
export default AdComponent;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================