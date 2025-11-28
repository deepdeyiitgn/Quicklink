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

// React Import Start Here
import React from 'react';
import { Helmet } from 'react-helmet';
// React Import End Here

// InfoCard Component Definition Start Here
const InfoCard: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
    <div className="glass-card p-6 rounded-2xl h-full">
        <h3 className="text-2xl font-bold text-brand-primary mb-4">{title}</h3>
        {children}
    </div>
);
// InfoCard Component Definition End Here

// AboutFaq Component Definition Start Here
const AboutFaq: React.FC = () => {
  return (
    <>
      <Helmet>
          <title>About the FAQ Page | QuickLink</title>
          <meta name="description" content="Our Frequently Asked Questions (FAQ) page provides clear, concise answers to help you get the most out of our service." />
          <meta name="keywords" content="faq, frequently asked questions, quicklink help" />
      </Helmet>
      <InfoCard title="What is this?">
          <div className="space-y-4 text-gray-300">
            <p>
              This is our Frequently Asked Questions (FAQ) page. We've compiled a list of the most common questions our users have about QuickLink's features, usage, and policies.
            </p>
            <p>
              Our goal is to provide clear, concise answers to help you get the most out of our service. If you have a question, there's a good chance you'll find the answer right here.
            </p>
          </div>
      </InfoCard>
    </>
  );
};
// AboutFaq Component Definition End Here

// Default Export Start Here
export default AboutFaq;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================