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

const BlogFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Community Blog | QuickLink Features</title>
                <meta name="description" content="Share your voice, connect with creators, and engage with the QuickLink community. Learn how to create posts with rich content, interact with others, and earn recognition." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">Community Blog</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Share Your Voice, Connect with Creators.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">A Space for Everyone</h2>
                        <p className="text-gray-300">
                            The QuickLink Community Blog is a user-driven platform for sharing stories, updates, tutorials, and ideas. It's a place for our users, creators, and the QuickLink team to connect and share valuable content. Whether it's a guide on digital marketing, a creative project, or an announcement about a new feature, this is the place to be.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17C19.2091 17 21 15.2091 21 13C21 10.7909 19.2091 9 17 9C16.8423 9 16.6883 9.01123 16.5372 9.03225C15.9815 6.74149 13.9235 5 11.5 5C9.07653 5 7.01851 6.74149 6.46275 9.03225C6.31171 9.01123 6.15772 9 6 9C3.79086 9 2 10.7909 2 13C2 15.2091 3.79086 17 6 17H7" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 14V21M12 21L15 18M12 21L9 18" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>
                
                 <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Rich Content Creation</h2>
                    <p className="text-gray-300 text-center max-w-2xl mx-auto mb-6">
                        We provide flexible tools to help you express your ideas exactly how you want.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Text & HTML</h3>
                            <p className="text-gray-400 text-sm">Choose between a simple text editor for quick posts or a full HTML mode for custom layouts, embedded content, and advanced formatting.</p>
                        </div>
                         <div className="bg-black/20 p-6 rounded-lg">
                            <h3 className="font-semibold text-white text-lg mb-2">Multimedia</h3>
                            <p className="text-gray-400 text-sm">Enrich your posts by uploading up to two images or a single audio file. Perfect for tutorials, podcasts, or showcasing your work.</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center">
                       <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.5L10.5 15L16 9" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C13.8214 2 15.5291 2.48797 17 3.33782" stroke="#846cff" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                    </div>
                     <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">Engage & Be Recognized</h2>
                        <ul className="space-y-3 text-gray-300 list-disc list-inside">
                            <li><strong>Interact:</strong> Show your appreciation by liking posts and share your thoughts by leaving comments.</li>
                            <li><strong>User Badges:</strong> A dynamic badge system (Normal, Premium, Moderator, Owner) displays on all your content, recognizing your status within the community.</li>
                            <li><strong>Content Moderation:</strong> To ensure a safe and positive environment, all posts are reviewed by our team. Admins can approve or pin posts to feature high-quality content.</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="multiplex" />
                </div>

                <div className="text-center">
                    <Link to="/blog/create" className="inline-block px-10 py-4 bg-brand-secondary text-white text-lg font-semibold rounded-lg hover:bg-brand-secondary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#846cff]">
                        Write Your First Post
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogFeaturePage;