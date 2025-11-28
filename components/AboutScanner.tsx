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

// AboutScanner Component Definition Start Here
const AboutScanner: React.FC = () => {
  return (
    <>
      <Helmet>
          <title>About the QR Code Scanner | QuickLink</title>
          <meta name="description" content="The QuickLink QR Scanner is a powerful, browser-based tool designed to instantly read and decode any QR code you encounter, with no app needed." />
          <meta name="keywords" content="qr code scanner, scan qr code, read qr code, online qr scanner" />
      </Helmet>
      <InfoCard title="What is This?">
          <div className="space-y-4 text-gray-300">
            <p>
              The QuickLink QR Scanner is a powerful, browser-based tool designed to instantly read and decode any QR code you encounter.
            </p>
            <p>
              Whether you're scanning a code from a product, a poster, or a friend's phone, this tool provides a fast and secure way to access the information without needing a separate app. It handles all types of QR data, from website links to contact cards and Wi-Fi credentials.
            </p>
          </div>
      </InfoCard>
    </>
  );
};
// AboutScanner Component Definition End Here

// Default Export Start Here
export default AboutScanner;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================