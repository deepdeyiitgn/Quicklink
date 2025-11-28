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
import React from "react";
import { LinkIcon, QrCodeScannerIcon, ShieldCheckIcon } from "./icons/IconComponents";
import { Helmet } from "react-helmet";
// Imports End Here

// AboutPage Component Definition Start Here
const AboutPage: React.FC = () => {
  // Component Render Start
  return (
    <>
    <Helmet>
        <title>About QuickLink | Our Mission & Features</title>
        <meta name="description" content="Learn about the mission, features, and creator of QuickLink. An all-in-one solution for smart, shareable links and QR codes, built for the modern web." />
        <meta name="keywords" content="about quicklink, deep dey, url shortener story, qr code generator mission, quicklink features" />
    </Helmet>
    <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in space-y-12">
      {/* --- Header --- */}
      <header className="text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white animate-aurora">
          About QuickLink
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          An all-in-one solution for smart, shareable links and QR codes,
          built for the modern web.
        </p>
      </header>

      {/* --- Mission & Philosophy --- */}
      <section className="space-y-8 text-gray-300 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-3">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed">
            In a digital world overflowing with information, clarity and
            simplicity are paramount. Long, cumbersome URLs create friction for users and dilute brand identity. QuickLink was born from a simple yet
            powerful idea: to make sharing information as seamless, secure, and
            efficient as possible for everyone.
          </p>
        </div>
        <div>
            <h2 className="text-2xl font-semibold text-brand-secondary mb-3">Our Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-white">User Experience</h3>
                    <p className="text-sm text-gray-400 mt-1">Every feature is designed to be intuitive, fast, and accessible, ensuring a frictionless experience from start to finish.</p>
                </div>
                 <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-white">Security First</h3>
                    <p className="text-sm text-gray-400 mt-1">We prioritize your safety with features like 2FA, secure payment processing, and proactive content moderation.</p>
                </div>
                 <div className="bg-black/20 p-4 rounded-lg">
                    <h3 className="font-bold text-white">Value for All</h3>
                    <p className="text-sm text-gray-400 mt-1">Our core tools will always be free, supported by optional premium features for those who need more power.</p>
                </div>
            </div>
        </div>
      </section>

       {/* --- What We Offer --- */}
      <section>
          <h2 className="text-2xl font-semibold text-brand-primary mb-4 text-center">What We Offer</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <LinkIcon className="h-10 w-10 text-brand-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-xl">
                  Powerful URL Shortening
                </h4>
                <p className="text-gray-400">Instantly convert any long link into a short, manageable one with custom aliases, link expiration, and a secure redirect system.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <QrCodeScannerIcon className="h-10 w-10 text-brand-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-xl">
                  Comprehensive QR Code Suite
                </h4>
                <p className="text-gray-400">Generate and customize QR codes for websites, Wi-Fi, vCards, events, and payments, then scan any code with our integrated browser-based scanner.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheckIcon className="h-10 w-10 text-brand-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-white text-xl">
                  A Complete Platform
                </h4>
                <p className="text-gray-400">Sign up to access a personal dashboard, link history, a community blog, private chat, developer API, and a full support ticket system.</p>
              </div>
            </div>
          </div>
      </section>

      {/* --- Author --- */}
      <div className="border-t border-gray-700 pt-10">
        <h2 className="text-2xl font-semibold text-brand-primary mb-4">
          About the Author
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src="https://i.postimg.cc/Ss0GyCZ5/Ufffffffffntitled-design.png"
            alt="Deep Dey - Founder of QuickLink"
            className="w-40 h-40 rounded-full object-cover border-2 border-brand-secondary shadow-md"
          />
          <div className="text-gray-300 text-lg leading-relaxed">
            <p className="mb-3">
              <strong>Deep Dey</strong> — the creator and visionary mind behind{" "}
              <strong>QuickLink</strong>. A student and JEE aspirant driven by
              curiosity and the belief that small ideas can grow
              into impactful tools.
            </p>
            <p className="mb-3">
              Starting as a small experiment, QuickLink evolved into a full-fledged platform. Every feature reflects a single question: <em>“How can sharing information feel effortless and smart at the same time?”</em>
            </p>
            <p>
              When not writing code, Deep spends time learning AI, building projects, and motivating others chasing their own IIT or tech dreams. QuickLink is proof that persistence can turn an idea into something real.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
  // Component Render End
};
// AboutPage Component Definition End Here

// Default Export Start Here
export default AboutPage;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================
