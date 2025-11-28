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
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { CopyIcon, CheckIcon, LoadingIcon, EyeIcon, EyeSlashIcon } from './icons/IconComponents';
import DomainConfigGuide from './DomainConfigGuide';
import { AuthContextType } from '../types';
import { Helmet } from 'react-helmet';
// Imports End Here

// ApiAccessPage Component Definition Start Here
const ApiAccessPage: React.FC = () => {
    // State and Context Hooks Start Here
    const auth = useContext(AuthContext);
    const { currentUser, generateApiKey, openApiSubscriptionModal } = auth || {};
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
    const [isKeyVisible, setIsKeyVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'post' | 'get'>('post');
    // State and Context Hooks End Here

    // handleCopy Function Start Here
    const handleCopy = (key: string, textToCopy: string) => {
        navigator.clipboard.writeText(textToCopy);
        setCopiedStates(prev => ({ ...prev, [key]: true }));
        setTimeout(() => setCopiedStates(prev => ({ ...prev, [key]: false })), 2000);
    };
    // handleCopy Function End Here
    
    // handleGenerateKey Function Start Here
    const handleGenerateKey = async () => {
        setIsGenerating(true);
        if (generateApiKey) {
            await generateApiKey();
        }
        setIsGenerating(false);
    };
    // handleGenerateKey Function End Here
    
    // Not Logged In Render Start Here
    if (!currentUser) {
         return (
            <>
            <Helmet>
                <title>Developer API Access | QuickLink</title>
                <meta name="description" content="Log in to get your API key and integrate QuickLink's powerful URL shortening API into your applications. Free trial available." />
                <meta name="keywords" content="api access, developer api, url shortener api, get api key, link shortening api" />
            </Helmet>
            <div className="glass-card p-8 rounded-2xl text-center">
                <h2 className="text-2xl font-bold text-white">API Access</h2>
                <p className="text-gray-400 mt-2">Please <button onClick={() => auth?.openAuthModal('login')} className="text-brand-primary hover:underline">log in</button> to manage your API key.</p>
            </div>
            </>
        )
    }
    // Not Logged In Render End Here

    // API Endpoint and Curl Example Definition Start Here
    const endpoint = `${window.location.origin}/api/v1/st`;
    const apiKey = currentUser.apiAccess?.apiKey || 'YOUR_API_KEY';
    const postExample = `curl -X POST ${endpoint} \\\n     -H "Authorization: Bearer ${apiKey}" \\\n     -H "Content-Type: application/json" \\\n     -d '{\n          "longUrl": "https://example.com/very/long/url",\n          "alias": "custom-alias-optional"\n        }'`;
    const getExample = `${endpoint}?api=${apiKey}&url=https://example.com/another/long/url&alias=my-get-link`;
    // API Endpoint and Curl Example Definition End Here

    // Component Render Start Here
    return (
        <>
        <Helmet>
            <title>Developer API Access | QuickLink</title>
            <meta name="description" content="Manage your API key, view documentation, and integrate QuickLink's powerful URL shortening API into your applications." />
            <meta name="keywords" content="api access, developer api, url shortener api, api documentation, quicklink api" />
            <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div className="space-y-8">
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">Developer API Access</h2>
                    <p className="text-gray-400 mt-2">Integrate QuickLink into your own applications.</p>
                </div>
                
                <div className="p-6 bg-black/30 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-lg text-white mb-2">Your API Key</h3>
                    {currentUser.apiAccess ? (
                        <>
                            <div className="flex items-center gap-2 bg-black/40 p-3 rounded-md">
                                <input
                                    type={isKeyVisible ? 'text' : 'password'}
                                    readOnly
                                    value={currentUser.apiAccess.apiKey}
                                    className="flex-grow font-mono text-gray-400 bg-transparent border-none focus:ring-0 p-0"
                                    aria-label="Your API Key"
                                />
                                <button 
                                    onClick={() => setIsKeyVisible(!isKeyVisible)} 
                                    className="flex-shrink-0 p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/10"
                                    aria-label={isKeyVisible ? 'Hide API Key' : 'Show API Key'}
                                >
                                    {isKeyVisible ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                                </button>
                                <button 
                                    onClick={() => handleCopy('apiKey', currentUser.apiAccess?.apiKey || '')} 
                                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 text-sm bg-white/10 rounded-md hover:bg-white/20"
                                >
                                    {copiedStates['apiKey'] ? <CheckIcon className="h-4 w-4 text-green-400"/> : <CopyIcon className="h-4 w-4"/>}
                                    {copiedStates['apiKey'] ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                            <p className="text-sm text-gray-400 mt-4">Your current plan: <span className="font-bold text-brand-primary capitalize">{currentUser.apiAccess.subscription.planId}</span></p>
                            <p className="text-xs text-gray-500">Expires on: {new Date(currentUser.apiAccess.subscription.expiresAt).toLocaleDateString()}</p>
                            <button onClick={() => openApiSubscriptionModal && openApiSubscriptionModal()} className="mt-4 text-sm font-semibold text-green-400 hover:underline">
                                Upgrade Plan
                            </button>
                        </>
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-gray-400 mb-4">You have not generated an API key yet. Get a free 1-month trial key now.</p>
                            <button onClick={handleGenerateKey} disabled={isGenerating} className="px-6 py-3 text-sm font-semibold text-brand-dark bg-brand-primary rounded-md hover:bg-brand-primary/80 transition-colors disabled:opacity-50 shadow-[0_0_10px_#00e5ff]">
                                {isGenerating ? <LoadingIcon className="h-5 w-5 animate-spin"/> : 'Generate Free Trial Key'}
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">API Documentation</h3>
                    <div className="p-6 bg-black/30 rounded-lg border border-white/10">
                        <div className="mb-4">
                            <p className="font-semibold text-gray-300">Endpoint:</p>
                            <code className="block bg-black/40 p-2 rounded-md text-brand-secondary font-mono mt-1 text-sm">
                                GET / POST {endpoint}
                            </code>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold text-gray-300">Authentication:</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Provide your API key in the <code className="bg-black/40 p-1 rounded text-xs">Authorization</code> header as a Bearer token. For GET requests, you can also pass it as a query parameter: <code className="bg-black/40 p-1 rounded text-xs">?api=YOUR_API_KEY</code>.
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <p className="font-semibold text-gray-300 mb-2">Smart Response:</p>
                             <p className="text-sm text-gray-400">The API intelligently detects the client. Requests from scripts (like cURL) receive a <code className="bg-black/40 p-1 rounded text-xs">JSON</code> response, while requests from a browser are automatically <code className="bg-black/40 p-1 rounded text-xs">redirected</code> to the new short link for easy testing.</p>
                        </div>
                        
                        <div>
                             <h4 className="font-semibold text-white mb-2">Example Requests</h4>
                             <div className="flex border-b border-white/20 mb-3">
                                <button onClick={() => setActiveTab('post')} className={`px-4 py-2 text-sm ${activeTab === 'post' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}>POST (cURL)</button>
                                <button onClick={() => setActiveTab('get')} className={`px-4 py-2 text-sm ${activeTab === 'get' ? 'text-brand-primary border-b-2 border-brand-primary' : 'text-gray-400'}`}>GET (URL)</button>
                            </div>
                            
                            {activeTab === 'post' && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-2">Recommended for applications. Send a JSON body with your link details.</p>
                                    <pre className="relative bg-black/40 p-4 rounded-md text-sm text-gray-300 font-mono overflow-x-auto">
                                        <button onClick={() => handleCopy('postExample', postExample)} className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 text-xs bg-white/10 rounded hover:bg-white/20">
                                            {copiedStates['postExample'] ? <CheckIcon className="h-3 w-3 text-green-400"/> : <CopyIcon className="h-3 w-3"/>}
                                            Copy
                                        </button>
                                        <code>{postExample}</code>
                                    </pre>
                                </div>
                            )}

                             {activeTab === 'get' && (
                                <div>
                                    <p className="text-xs text-gray-400 mb-2">Useful for simple scripts or testing directly in your browser. Pass data as query parameters.</p>
                                     <pre className="relative bg-black/40 p-4 rounded-md text-sm text-gray-300 font-mono overflow-x-auto">
                                        <button onClick={() => handleCopy('getExample', getExample)} className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 text-xs bg-white/10 rounded hover:bg-white/20">
                                            {copiedStates['getExample'] ? <CheckIcon className="h-3 w-3 text-green-400"/> : <CopyIcon className="h-3 w-3"/>}
                                            Copy
                                        </button>
                                        <code className="break-all">{getExample}</code>
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <DomainConfigGuide />
        </div>
        </>
    );
    // Component Render End Here
};
// ApiAccessPage Component Definition End Here

// Default Export Start Here
export default ApiAccessPage;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================