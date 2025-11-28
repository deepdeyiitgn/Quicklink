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

// About Component Definition Start Here
const About: React.FC = () => {
  return (
    <>
    <Helmet>
        <title>About QuickLink URL Shortener</title>
        <meta name="description" content="QuickLink is a simple and powerful tool to transform long, messy URLs into short, memorable, and shareable links that runs entirely in your browser." />
        <meta name="keywords" content="about quicklink, url shortener, how it works, private url shortener" />
    </Helmet>
    <InfoCard title="What is This?">
        <div className="space-y-4 text-gray-300">
          <p>
            QuickLink is a simple and powerful tool to transform long, messy URLs into short, memorable, and shareable links.
          </p>
          <p>
            Whether you're sharing a link in a social media post or a presentation, a short link is easier to manage and looks cleaner. This app runs entirely in your browser, providing a fast and private experience.
          </p>
        </div>
    </InfoCard>
    </>
  );
};
// About Component Definition End Here

// Default Export Start Here
export default About;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================