import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// Note: Agar tune 'react-helmet' install kiya hai toh 'async' hata dena. 
// Par main suggest karunga 'npm install react-helmet-async' use kar, woh better hai.
import { LinkIcon, QrCodeScannerIcon, QrGeneratorIcon } from './icons/IconComponents';

const ToolSelectionPage: React.FC = () => {
    return (
        <div className="text-center animate-fade-in">
            {/* 🔽 YAHAN PASTE KAR HELMET CODE KO 🔽 */}
            <Helmet>
                <title>Tools & Pricing - QuickLink | URL Shortener, QR Generator & Scanner</title>
                <meta 
                    name="description" 
                    content="Access QuickLink's powerful tools: URL Shortener, QR Code Generator, and Scanner. Explore flexible free and premium plans starting at just ₹50/month." 
                />
                <meta 
                    name="keywords" 
                    content="URL Shortener, QR Code Generator, QR Scanner, QuickLink Pricing, Custom Links, API Plans, Cheap Link Shortener India" 
                />
            </Helmet>
            {/* 🔼 YAHAN KHATAM 🔼 */}
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Tool</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
                Select one of our powerful tools to get started.
            </p>

            {/* 🔧 Existing Tools */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Link to="/shortener" className="tool-card">
                    <LinkIcon className="h-16 w-16 text-brand-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">URL Shortener</h3>
                    <p className="text-gray-400">Create short, custom, and shareable links from long URLs in seconds.</p>
                </Link>
                <Link to="/qr-generator" className="tool-card">
                    <QrGeneratorIcon className="h-16 w-16 text-brand-secondary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">QR Generator</h3>
                    <p className="text-gray-400">Generate custom QR codes for websites, Wi-Fi, contacts, and more.</p>
                </Link>
                <Link to="/qr-scanner" className="tool-card">
                    <QrCodeScannerIcon className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">QR Scanner</h3>
                    <p className="text-gray-400">Instantly scan and decode any QR code using your camera or an image file.</p>
                </Link>
            </div>

            {/* ---------- New Pricing & Plans Section ---------- */}

            <div className="max-w-6xl mx-auto mt-20 text-left">
                <h3 className="text-3xl font-bold text-brand-primary mb-8 text-center">Plans & Pricing</h3>
                
                {/* Free Plans */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-black/20 border border-brand-primary/50 rounded-2xl p-6">
                        <h4 className="text-xl font-semibold text-brand-primary mb-2">Free Tier (Anonymous)</h4>
                        <p className="text-gray-300 mb-1">🔗 <span className="text-brand-secondary font-medium">10 Links</span> (All-time limit per IP)</p>
                        <p className="text-gray-300 mb-1">⏱️ Link Expiry: <span className="text-brand-secondary font-medium">24 hours</span></p>
                        <p className="text-gray-300 mb-1">📱 Full QR Generator & Scanner access</p>
                        <p className="text-gray-400 text-sm mt-2">*Ideal for quick, one-off use.</p>
                    </div>

                    <div className="bg-black/20 border border-brand-secondary/50 rounded-2xl p-6">
                        <h4 className="text-xl font-semibold text-brand-secondary mb-2">Free Tier (Signed Up)</h4>
                        <p className="text-gray-300 mb-1">🔗 <span className="text-brand-secondary font-medium">50 Links</span> (All-time limit)</p>
                        <p className="text-gray-300 mb-1">⏱️ Link Expiry: <span className="text-brand-secondary font-medium">7 days</span></p>
                        <p className="text-gray-300 mb-1">📊 Basic link history dashboard</p>
                        <p className="text-gray-400 text-sm mt-2">*Best for personal use and link management.</p>
                    </div>
                </div>

                {/* Premium Plans */}
                <h4 className="text-2xl font-bold text-brand-secondary mb-6 text-center">Premium Membership Plans</h4>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { plan: "Monthly", price: "₹50", credits: "+200 Link Credits", duration: "1 Month" },
                        { plan: "6 Months", price: "₹100", credits: "+500 Link Credits", duration: "6 Months" },
                        { plan: "1 Year", price: "₹500", credits: "+2,500 Link Credits", duration: "12 Months" }
                    ].map((p, i) => (
                        <div key={i} className="bg-black/20 border border-brand-secondary/50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-brand-secondary mb-2">{p.plan}</h4>
                            <p className="text-gray-300 mb-1">🔗 <span className="font-medium text-white">{p.credits}</span></p>
                            <p className="text-gray-300 mb-1">⏱️ Link validity: Up to <span className="font-medium text-white">{p.duration}</span></p>
                            <p className="text-gray-300 mb-1">💸 Price: <span className="text-brand-primary font-semibold">{p.price}</span></p>
                            <p className="text-gray-400 text-sm mt-2">*Purchasing again adds credits to your account.</p>
                        </div>
                    ))}
                </div>

                {/* API Plans */}
                <h4 className="text-2xl font-bold text-green-400 mt-12 mb-6 text-center">API Plans</h4>
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-black/20 border border-green-500/50 rounded-2xl p-6">
                        <h4 className="text-xl font-semibold text-green-400 mb-2">Free Trial</h4>
                        <p className="text-gray-300 mb-1">📡 <span className="font-medium text-white">500 API Calls</span> (All-time)</p>
                        <p className="text-gray-300 mb-1">🔑 API Key validity: 30 days</p>
                        <p className="text-gray-400 text-sm mt-2">*Perfect for testing and small projects.</p>
                    </div>
                    {[
                        { plan: "6 Months", price: "₹500", calls: "+2,000 API Calls" },
                        { plan: "1 Year", price: "₹1000", calls: "+5,000 API Calls" }
                    ].map((p, i) => (
                        <div key={i} className="bg-black/20 border border-green-500/50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-green-400 mb-2">{p.plan}</h4>
                            <p className="text-gray-300 mb-1">📡 <span className="font-medium text-white">{p.calls}</span></p>
                            <p className="text-gray-300 mb-1">🔑 API Key validity: {p.plan}</p>
                            <p className="text-gray-300 mb-1">💸 Price: <span className="text-green-400 font-semibold">{p.price}</span></p>
                        </div>
                    ))}
                </div>
                <p className="text-gray-400 text-sm mt-4 text-center">
                    🔸 Re-purchasing any premium API plan adds an additional <span className="font-semibold text-white">1,000 API calls</span> to your account.
                </p>
            </div>

            <div className="max-w-4xl mx-auto mt-16 glass-card p-8 text-left text-gray-400 text-sm">
                <h3 className="text-xl font-semibold text-brand-light mb-2">Disclaimer & Terms</h3>
                <p className="mb-2">
                    All users agree that QuickLink reserves the right to manage link and account activity. Services, validity, and pricing are subject to change.
                </p>
                <p>
                    For detailed policies, please visit our footer links for{" "}
                    <Link to="/terms" className="text-brand-primary underline">Terms</Link>,{" "}
                    <Link to="/privacy" className="text-brand-primary underline">Privacy</Link>, and{" "}
                    <Link to="/cancellation" className="text-brand-primary underline">Cancellation</Link>.
                </p>
            </div>
        </div>
    );
};

export default ToolSelectionPage;
