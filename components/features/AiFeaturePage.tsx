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

// Vercel Serverless Function: /api/status
// This endpoint provides a comprehensive health check for all critical services.

// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   🧠 AI ENGINE: Google Gemini (TITAN Hybrid Logic - Leveraging 1000+ line KB)
// ===================================================================================

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom";
// AdComponent retained for monetization
import AdComponent from '../AdComponent'; 
// Valid Icons from IconComponents.tsx file:
import { 
    SparklesIcon, LifeBuoyIcon, NewspaperIcon, WarningIcon, UserIcon, AppsIcon, 
    RefreshCwIcon, ServerIcon, LightbulbIcon, ShieldCheckIcon, CopyIcon, LinkIcon, 
    DownloadIcon, MaximizeIcon, MinimizeIcon 
    // Note: LayersIcon, ZapIcon, TargetIcon, CodeIcon were replaced with available icons.
} from '../icons/IconComponents';

const AiFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                {/* ✅ SEO OPTIMIZATION: World's best and most advanced AI engine */}
                <title>QuickLink AI TITAN ⚡ | The World's Most Advanced Hybrid Support Engine</title>
                <meta name="description" content="QuickLink AI is the ultimate support engine built on Gemini, featuring Hybrid Logic, Founder Persona Modeling, and unparalleled context depth for seamless user support. Built by JEE Aspirant Deep Dey." />
                <meta name="keywords" content="Gemini AI, URL Shortener, QR Code, AI Support, Deep Dey, IITGN, Hybrid AI, Vercel, Full Stack Support" />
            </Helmet>

            <div className="space-y-16 py-10">
                <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-white mb-4 animate-shine tracking-tight">
                        QuickLink AI <span className="text-brand-primary">TITAN</span> Engine
                    </h1>
                    <p className="text-xl text-gray-300 max-w-4xl mx-auto font-medium">
                        Engineered by Founder Deep Dey with **Hybrid Titan Logic**, challenging industry standards for support and intelligence.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:text-white transition-colors mt-4 inline-block text-lg font-medium">&larr; Back to All Features</Link>
                </div>

                {/* --- 1. HYBRID INTELLIGENCE SYSTEM (THE CORE) --- */}
                <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-900/60 p-12 rounded-3xl shadow-xl border border-brand-primary/30 transform hover:scale-[1.01] transition-transform">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4 flex items-center gap-2">
                             <AppsIcon className="h-8 w-8 text-brand-primary" /> Hybrid Intelligence System
                        </h2>
                        <p className="text-gray-300 mb-4 text-lg">
                           QuickLink AI operates in a smart, two-stage process that prioritizes speed and cost-efficiency while delivering **Gemini-level accuracy**:
                        </p>
                        <ul className="list-disc list-inside text-gray-400 space-y-2 text-base">
                             <li>**Simple Mode (Local Bot):** Instantly handles 90% of queries (Zero API cost) using the massive **+1000 line Knowledge Base** logic. (Fast and reliable, uses no paid API calls)</li>
                             <li>**AI Mode (Gemini Activation):** Activates the powerful Gemini model only for complex, unsolved, or creative questions, ensuring premium response quality where it matters most.</li>
                        </ul>
                    </div>
                    <div className="flex justify-center order-1 md:order-2">
                         <div className="relative">
                            {/* Replaced LayersIcon with generic ServerIcon + Sparkles for visualization */}
                            <ServerIcon className="h-56 w-56 text-brand-secondary/30" /> 
                            <SparklesIcon className="h-24 w-24 text-brand-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
                        </div>
                    </div>
                </div>

                 {/* --- ADS CONTAINER 1: IN-FEED (Monetization) --- */}
                 <div className="max-w-4xl mx-auto my-12">
                     <AdComponent type="in-feed" />
                </div>
                
                {/* --- 2. ADVANCED CAPABILITIES GRID (3x3) --- */}
                 <div className="glass-card p-10 rounded-3xl shadow-2xl border border-brand-secondary/20">
                    <h2 className="text-4xl font-extrabold text-brand-primary mb-10 text-center">9 Pillars of Titan Logic 🧠</h2>
                    <p className="text-sm text-gray-500 text-center mb-8">
                       (This engine leverages **Function Calling** and **Deep Knowledge Parsing** for complex tasks.)
                    </p>
                     <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 text-left">
                        
                        {/* FEATURE 1: Deep Context (Server Icon used for Data Storage) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-brand-primary/80 hover:bg-black/50 transition-colors shadow-md">
                            <ServerIcon className="h-10 w-10 text-brand-primary mb-3"/> 
                            <h3 className="font-semibold text-white text-xl">Deep Context Retention</h3>
                            <p className="text-gray-400 text-sm mt-1">The AI stores the entire conversation stack, maintaining continuity across Simple and AI modes. It leverages past input for better personalized responses.</p>
                        </div>
                         
                        {/* FEATURE 2: Policy & Data Parsing (ShieldCheckIcon for Verification) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-accent/80 hover:bg-black/50 transition-colors shadow-md">
                            <ShieldCheckIcon className="h-10 w-10 text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Policy & Data Parsing</h3>
                            <p className="text-gray-400 text-sm mt-1">Instantly pulls specific, verifiable facts (like **Razorpay Rules**, **Plan Limits**, and **Founder Details**) from the structured database for guaranteed accuracy.</p>
                        </div>
                         
                        {/* FEATURE 3: Smart Ticket Drafting (Function Calling) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-brand-primary/80 hover:bg-black/50 transition-colors shadow-md">
                            <NewspaperIcon className="h-10 w-10 text-brand-primary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Smart Ticket Drafting (Function)</h3>
                            <p className="text-gray-400 text-sm mt-1">This uses **Function Calling** logic. It analyzes your issue and automatically drafts a concise, actionable support ticket (Subject and Body) for **human agent** review.</p>
                        </div>

                        {/* FEATURE 4: Self-Correction (RefreshCwIcon for Loop) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-accent/80 hover:bg-black/50 transition-colors shadow-md">
                            <RefreshCwIcon className="h-10 w-10 text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Self-Correction & Escalation</h3>
                            <p className="text-gray-400 text-sm mt-1">Uses **Yes/No feedback buttons**. If unhelpful, it instantly escalates the exact query to the powerful Gemini model for a deeper, nuanced reply.</p>
                        </div>

                         {/* FEATURE 5: Founder Persona (UserIcon for Personal touch) */}
                         <div className="bg-black/30 p-6 rounded-xl border-l-4 border-brand-primary/80 hover:bg-black/50 transition-colors shadow-md">
                            <UserIcon className="h-10 w-10 text-brand-primary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Founder Persona Modeling</h3>
                            <p className="text-gray-400 text-sm mt-1">Trained on **Deep Dey's personal voice, philosophy, and interests** (IITGN goals, gaming history) to make the support personal and motivational.</p>
                        </div>
                         
                        {/* FEATURE 6: Cost Efficiency (ShieldCheckIcon for Stability) */}
                         <div className="bg-black/30 p-6 rounded-xl border-l-4 border-accent/80 hover:bg-black/50 transition-colors shadow-md">
                            <ShieldCheckIcon className="h-10 w-10 text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Secure & High Availability</h3>
                            <p className="text-gray-400 text-sm mt-1">Minimizes expensive API calls using local logic, ensuring stable, affordable service and high availability (99.9% uptime) for all users worldwide.</p>
                        </div>

                        {/* FEATURE 7: Style Guidance (SparklesIcon for Polish) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-brand-primary/80 hover:bg-black/50 transition-colors shadow-md">
                            <SparklesIcon className="h-10 w-10 text-brand-primary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Output Formatting Engine</h3>
                            <p className="text-gray-400 text-sm mt-1">Strictly adheres to **Markdown** (Bold, Lists) and Line Break instructions, guaranteeing clean, readable, and perfectly formatted responses in the chat bubble UI.</p>
                        </div>

                        {/* FEATURE 8: Error Code Parsing (WarningIcon for Diagnosis) */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-accent/80 hover:bg-black/50 transition-colors shadow-md">
                            <WarningIcon className="h-10 w-10 text-brand-secondary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">API Error Code Diagnosis</h3>
                            <p className="text-gray-400 text-sm mt-1">Instantly interprets technical API errors (e.g., '409 Conflict', '429 Quota') into plain language solutions, speeding up developer troubleshooting.</p>
                        </div>

                        {/* FEATURE 9: Knowledge Expansion & Caution */}
                        <div className="bg-black/30 p-6 rounded-xl border-l-4 border-brand-primary/80 hover:bg-black/50 transition-colors shadow-md">
                            <LightbulbIcon className="h-10 w-10 text-brand-primary mb-3"/>
                            <h3 className="font-semibold text-white text-xl">Knowledge Expansion & Caution</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Our Knowledge Base is constantly growing to be more accurate. **However, AI responses can sometimes be inaccurate.** Please cross-check important information on official pages (e.g., /pricing, /legal). If the issue persists, please use the **<Link to="/contact" className="text-brand-accent hover:underline">/contact page</Link>** to reach a human agent.
                            </p>
                        </div>

                    </div>
                </div>

                {/* --- ADS CONTAINER 2: DISPLAY (Monetization) --- */}
                <div className="max-w-4xl mx-auto my-12">
                     <AdComponent type="display" />
                </div>
            </div>
        </>
    );
};

export default AiFeaturePage;
// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
// ===================================================================================
// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
// ===================================================================================

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================
