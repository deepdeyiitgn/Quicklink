import React from 'react';
import { Link } from "react-router-dom";
import { LinkIcon, QrCodeScannerIcon, QrGeneratorIcon } from './icons/IconComponents';

const ToolSelectionPage: React.FC = () => {
    return (
        <div className="text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Tool</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-12">
                Select one of our powerful tools to get started.
            </p>

            {/* 🔧 Existing Tools */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Link to="/shortener" className="tool-card">
                    <LinkIcon className="h-16 w-16 text-brand-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">URL Shortener</h3>
                    <p className="text-gray-400">Create short, custom, and shareable links from long URLs in seconds.</p>
                </Link>
                <Link to="/qr-generator" className="tool-card">
                    <QrGeneratorIcon className="h-16 w-16 text-brand-secondary mb-4" />
                    <h3 className="text-2xl font-bold mb-2">QR Generator</h3>
                    <p className="text-gray-400">Generate custom QR codes for websites, Wi-Fi, contacts, and more.</p>
                </Link>
                <Link to="/qr-scanner" className="tool-card">
                    <QrCodeScannerIcon className="h-16 w-16 text-green-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">QR Scanner</h3>
                    <p className="text-gray-400">Instantly scan and decode any QR code using your camera or an image file.</p>
                </Link>
            </div>

            {/* ---------- New Containers Start Here ---------- */}

            {/* 🆓 Free Plans Section */}
            <div className="max-w-6xl mx-auto mt-16 text-left">
                <h3 className="text-3xl font-bold text-brand-primary mb-8 text-center">Free Plans</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Without Login */}
                    <div className="bg-gray-900/60 border border-brand-primary rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-brand-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <h4 className="text-xl font-semibold text-brand-primary mb-2">Without Login</h4>
                        <p className="text-gray-300 mb-1">✅ Unlimited URL creation</p>
                        <p className="text-gray-300 mb-1">⏱️ Each link expires after <span className="text-brand-secondary font-medium">24 hours</span></p>
                        <p className="text-gray-300 mb-1">📱 QR generation & scanning enabled</p>
                        <p className="text-gray-400 text-sm mt-2">*Links may be deleted anytime for inactive or abusive use.</p>
                    </div>

                    {/* With Login */}
                    <div className="bg-gray-900/60 border border-brand-secondary rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-brand-secondary hover:shadow-[0_0_15px_rgba(147,197,253,0.5)]">
                        <h4 className="text-xl font-semibold text-brand-secondary mb-2">With Login</h4>
                        <p className="text-gray-300 mb-1">✅ Unlimited URL creation</p>
                        <p className="text-gray-300 mb-1">⏱️ Each link valid for <span className="text-brand-secondary font-medium">7 days</span></p>
                        <p className="text-gray-300 mb-1">📱 QR generation & scanning enabled</p>
                        <p className="text-gray-400 text-sm mt-2">*Inactive accounts may be deleted with prior email notice.</p>
                    </div>

                    {/* Free API */}
                    <div className="bg-gray-900/60 border border-green-500 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.5)]">
                        <h4 className="text-xl font-semibold text-green-400 mb-2">Free API</h4>
                        <p className="text-gray-300 mb-1">🔑 API key valid for 30 days</p>
                        <p className="text-gray-300 mb-1">📡 Unlimited API calls allowed</p>
                        <p className="text-gray-300 mb-1">⏱️ Each URL expires when API key expires</p>
                    </div>
                </div>
            </div>

            {/* 💎 Paid Membership Plans */}
            <div className="max-w-6xl mx-auto mt-16 text-left">
                <h3 className="text-3xl font-bold text-brand-secondary mb-8 text-center">Paid Membership Plans</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { plan: "Monthly", duration: "1 Month", price: "₹50", best: "Short-term projects" },
                        { plan: "6 Months", duration: "6 Months", price: "₹100", best: "Regular users" },
                        { plan: "1 Year", duration: "12 Months", price: "₹500", best: "Set & forget" }
                    ].map((p, i) => (
                        <div key={i} className="bg-gray-900/60 border border-brand-secondary rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-brand-secondary hover:shadow-[0_0_20px_rgba(147,197,253,0.5)]">
                            <h4 className="text-xl font-semibold text-brand-secondary mb-2">{p.plan}</h4>
                            <p className="text-gray-300 mb-1">🕓 Duration: {p.duration}</p>
                            <p className="text-gray-300 mb-1">🔁 Link validity: Dynamic — valid till plan expiry</p>
                            <p className="text-gray-300 mb-1">💸 Price: <span className="text-brand-primary font-semibold">{p.price}</span></p>
                            <p className="text-gray-300 mb-1">🎯 Best for: {p.best}</p>
                        </div>
                    ))}
                </div>

                <p className="text-gray-400 text-sm mt-4 text-center">
                    🔸 Each link remains active until your subscription period ends.  
                    Newer links expire based on remaining days in your plan.
                </p>
            </div>

            {/* 🧠 API Premium Section */}
            <div className="max-w-4xl mx-auto mt-16 text-left">
                <h3 className="text-3xl font-bold text-green-400 mb-8 text-center">API Premium Plans</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { plan: "6 Months", price: "₹500", desc: "For developers & mid-sized projects" },
                        { plan: "1 Year", price: "₹1000", desc: "For advanced integrations & business users" }
                    ].map((p, i) => (
                        <div key={i} className="bg-gray-900/60 border border-green-500 rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)]">
                            <h4 className="text-xl font-semibold text-green-400 mb-2">{p.plan}</h4>
                            <p className="text-gray-300 mb-1">🔑 API key validity: {p.plan}</p>
                            <p className="text-gray-300 mb-1">🔁 Link validity: Dynamic — valid till plan expiry</p>
                            <p className="text-gray-300 mb-1">💸 Price: <span className="text-green-400 font-semibold">{p.price}</span></p>
                            <p className="text-gray-300 mb-1">🎯 {p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ⚠️ Disclaimer Section */}
            <div className="max-w-4xl mx-auto mt-16 glass-card p-8 text-left text-gray-400 text-sm">
                <h3 className="text-xl font-semibold text-brand-light mb-2">Disclaimer & Terms</h3>
                <p className="mb-2">
                    Free and paid users agree that QuickLink reserves rights to remove expired links or inactive accounts.  
                    Services, validity, or pricing may change without prior notice.
                </p>
                <p>
                    For detailed policies, visit our{" "}
                    <Link to="/terms" className="text-brand-primary underline">Terms</Link>,{" "}
                    <Link to="/privacy" className="text-brand-primary underline">Privacy Policy</Link>,{" "}
                    <Link to="/cancellation" className="text-brand-primary underline">Cancellation Policy</Link>,{" "}
                    or other footer links.
                </p>
            </div>

            {/* 📊 Summary Table */}
            <div className="max-w-6xl mx-auto mt-16 text-left">
                <h3 className="text-2xl font-bold text-brand-light mb-4 text-center">Plan Summary</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-gray-200 border border-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-brand-dark text-brand-light">
                            <tr>
                                <th className="p-3 text-left">Plan Type</th>
                                <th className="p-3 text-left">Duration</th>
                                <th className="p-3 text-left">URL Validity</th>
                                <th className="p-3 text-left">API Access</th>
                                <th className="p-3 text-left">Price</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900/50">
                            <tr><td className="p-3">Free (No Login)</td><td className="p-3">—</td><td className="p-3">24 hours</td><td className="p-3">No</td><td className="p-3">Free</td></tr>
                            <tr><td className="p-3">Free (Login)</td><td className="p-3">—</td><td className="p-3">7 days</td><td className="p-3">No</td><td className="p-3">Free</td></tr>
                            <tr><td className="p-3">Free API</td><td className="p-3">30 days</td><td className="p-3">Till key expiry</td><td className="p-3">Yes</td><td className="p-3">Free</td></tr>
                            <tr><td className="p-3">Paid</td><td className="p-3">1–12 months</td><td className="p-3">Dynamic (till plan expiry)</td><td className="p-3">Optional</td><td className="p-3">₹50–₹500</td></tr>
                            <tr><td className="p-3">API Premium</td><td className="p-3">6–12 months</td><td className="p-3">Dynamic (till plan expiry)</td><td className="p-3">Yes</td><td className="p-3">₹500–₹1000</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ---------- New Containers End Here ---------- */}
        </div>
    );
};

export default ToolSelectionPage;
