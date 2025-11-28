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

const FounderFeaturePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>About the Founder | QuickLink Features</title>
                <meta name="description" content="Meet Deep Dey, the student developer and creator of QuickLink. Learn about the story, vision, and philosophy behind the project." />
            </Helmet>

            <div className="space-y-12">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 animate-aurora">About the Founder</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        The Story Behind QuickLink.
                    </p>
                    <Link to="/features" className="text-brand-primary hover:underline mt-4 inline-block">&larr; Back to All Features</Link>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="flex-shrink-0 text-center">
                             <img
                                src="https://i.postimg.cc/Ss0GyCZ5/Ufffffffffntitled-design.png"
                                alt="Deep Dey"
                                className="w-48 h-48 rounded-full object-cover border-4 border-brand-secondary shadow-lg mx-auto"
                            />
                             <h2 className="text-3xl font-bold text-white mt-4">Deep Dey</h2>
                             <p className="text-brand-secondary font-semibold">Creator of QuickLink</p>
                        </div>
                        <div className="text-gray-300 space-y-4">
                            <p>
                                I’m Deep Dey, a Class 11 student from Tripura, India, with a passion for technology and a dream of studying Computer Science at an IIT. QuickLink wasn’t born from a business plan—it was born from a personal need and a deep curiosity for how the web works.
                            </p>
                            <p>
                                As a student preparing for competitive exams like the JEE, I'm constantly sharing notes, resources, and links. I was frustrated with long, messy URLs and existing services that were either too complex or lacked the features I needed. So, I decided to build my own solution.
                            </p>
                            <p>
                                This project is a testament to the power of self-learning, persistence, and the incredible tools we have at our disposal today, especially AI.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="in-feed" />
                </div>

                 <div className="grid md:grid-cols-2 gap-8 items-start">
                     <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-primary mb-4">The Vision of a Student Developer</h2>
                        <p className="text-gray-300">
                           My goal was to create a tool that was not only functional but also beautiful and intuitive. I wanted a platform that I would genuinely enjoy using every day. This philosophy drives every feature in QuickLink, from the clean UI to the powerful customization options. It's built by a user, for users.
                        </p>
                    </div>
                     <div className="glass-card p-8 rounded-2xl">
                        <h2 className="text-3xl font-bold text-brand-secondary mb-4">Building with AI as a Partner</h2>
                        <p className="text-gray-300">
                           I see myself not as a traditional programmer but as an AI-native creator. Tools like Google's Gemini have been invaluable partners in this journey, helping me debug complex problems, generate creative solutions, and accelerate the development process. QuickLink is a product of human vision and AI collaboration.
                        </p>
                    </div>
                </div>
                 
                 <div className="max-w-4xl mx-auto my-8">
                     <AdComponent type="display" />
                </div>
                
                 <div className="text-center">
                    <Link to="/wiki" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Learn More About Our Founder
                    </Link>
                </div>
            </div>
        </>
    );
};

export default FounderFeaturePage;