import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { CheckIcon, XIcon } from './icons/IconComponents';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import { Link } from 'react-router-dom';

const Tick: React.FC = () => <CheckIcon className="h-6 w-6 text-green-400 mx-auto" />;
const Cross: React.FC = () => <XIcon className="h-6 w-6 text-red-400 mx-auto" />;

const PricingPage: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser, generateApiKey, openApiSubscriptionModal } = auth || {};

    const features = [
        { feature: 'URL Shortening', anonymous: <Tick />, free: <Tick />, premium: <Tick /> },
        { feature: 'Custom Alias', anonymous: <Tick />, free: <Tick />, premium: <Tick /> },
        { feature: 'QR Code Generator', anonymous: <Tick />, free: <Tick />, premium: <Tick /> },
        { feature: 'QR Code Scanner', anonymous: <Tick />, free: <Tick />, premium: <Tick /> },
        { feature: 'Link Expiration', anonymous: '24 Hours', free: '7 Days', premium: 'Up to 1 Year' },
        { feature: 'Link Creation Limit', anonymous: '10 (Total)', free: '50 (Total)', premium: 'By Credits' },
        { feature: 'Dashboard Access', anonymous: <Cross />, free: <Tick />, premium: <Tick /> },
        { feature: 'Link History', anonymous: <Cross />, free: <Tick />, premium: <Tick /> },
        { feature: 'Community Blog Access', anonymous: <Tick />, free: <Tick />, premium: <Tick /> },
        { feature: 'Create Blog Posts', anonymous: <Cross />, free: <Tick />, premium: <Tick /> },
        { feature: 'Developer API Access', anonymous: <Cross />, free: 'Free Trial', premium: 'Paid Plans' },
        { feature: 'Premium User Badge', anonymous: <Cross />, free: <Cross />, premium: <Tick /> },
        { feature: 'Customer Support', anonymous: <Cross />, free: 'Community', premium: 'Ticket System' },
        { feature: 'QuickChat Access', anonymous: <Cross />, free: <Tick />, premium: <Tick /> },
    ];
    
     const freeTiers = [
        { name: "Anonymous", details: ["🔗 10 Links (All-time limit per IP)", "⏱️ Link Expiry: 24 hours", "📱 Full QR Generator & Scanner access"], note: "*Ideal for quick, one-off use." },
        { name: "Signed Up", details: ["🔗 50 Links (All-time limit)", "⏱️ Link Expiry: 7 days", "📊 Basic link history dashboard"], note: "*Best for personal use and link management." }
    ];

    const premiumTiers = [
        { plan: "Monthly", price: "₹50", credits: "+200 Link Credits", duration: "1 Month" },
        { plan: "6 Months", price: "₹100", credits: "+500 Link Credits", duration: "6 Months" },
        { plan: "1 Year", price: "₹500", credits: "+2,500 Link Credits", duration: "12 Months" }
    ];

    const apiTiers = [
        { plan: "Free Trial", calls: "500 API Calls (All-time)", duration: "30 days" },
        { plan: "6 Months", price: "₹500", calls: "+2,000 API Calls" },
        { plan: "1 Year", price: "₹1000", calls: "+5,000 API Calls" }
    ];

    return (
        <>
            <Helmet>
                <title>Pricing & Plans | QuickLink</title>
                <meta name="description" content="Explore QuickLink's pricing plans. From our free tier for casual use to premium plans with extended features, find the right fit for you." />
                <meta name="keywords" content="pricing, plans, quicklink pricing, url shortener plans, free vs premium" />
            </Helmet>
            <div className="space-y-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-aurora">Pricing & Plans</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Simple, transparent pricing. Choose the plan that fits your needs.
                    </p>
                </div>

                {/* Plan Cards Section */}
                <div className="space-y-12">
                     {/* Free Tiers */}
                    <div>
                        <h3 className="text-3xl font-bold text-brand-primary mb-6 text-center">Free Tiers</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            {freeTiers.map(tier => (
                                <div key={tier.name} className="bg-black/20 border border-brand-primary/50 rounded-2xl p-6 flex flex-col">
                                    <h4 className="text-xl font-semibold text-brand-primary mb-4">{tier.name}</h4>
                                    <ul className="space-y-2 text-gray-300 flex-grow">
                                        {tier.details.map((d, i) => <li key={i}>{d}</li>)}
                                    </ul>
                                    <p className="text-gray-400 text-sm mt-4">{tier.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Premium Tiers */}
                    <div>
                        <h3 className="text-3xl font-bold text-brand-secondary mb-6 text-center">Premium Membership Plans</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {premiumTiers.map(p => (
                                <div key={p.plan} className="bg-black/20 border border-brand-secondary/50 rounded-2xl p-6 flex flex-col">
                                    <h4 className="text-xl font-semibold text-brand-secondary mb-2">{p.plan}</h4>
                                    <p className="text-gray-300 mb-1">🔗 <span className="font-medium text-white">{p.credits}</span></p>
                                    <p className="text-gray-300 mb-1">⏱️ Link validity: Up to <span className="font-medium text-white">{p.duration}</span></p>
                                    <p className="text-gray-300 mb-4 flex-grow">💸 Price: <span className="text-brand-primary font-semibold">{p.price}</span></p>
                                    <p className="text-gray-400 text-xs mt-2">*Purchasing again adds credits and extends duration from the current expiry date.</p>
                                </div>
                            ))}
                        </div>
                    </div>

                <div className="text-center">
                    <button onClick={() => auth.currentUser ? auth.openSubscriptionModal() : auth.openAuthModal('signup')} className="inline-block px-10 py-4 bg-brand-secondary text-white text-lg font-semibold rounded-lg hover:bg-brand-secondary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#846cff]">
                        {auth.currentUser ? 'Upgrade to Premium' : 'Sign Up for Free'}
                    </button>
                </div>
                    

                    {/* API Tiers */}
                    <div>
                        <h3 className="text-3xl font-bold text-green-400 mb-6 text-center">API Plans</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {apiTiers.map(p => (
                                <div key={p.plan} className="bg-black/20 border border-green-500/50 rounded-2xl p-6 flex flex-col">
                                    <h4 className="text-xl font-semibold text-green-400 mb-2">{p.plan}</h4>
                                    <p className="text-gray-300 mb-1">📡 <span className="font-medium text-white">{p.calls}</span></p>
                                    <p className="text-gray-300 mb-1 flex-grow">🔑 API Key validity: {p.duration}</p>
                                    {p.price && <p className="text-gray-300 mb-1">💸 Price: <span className="text-green-400 font-semibold">{p.price}</span></p>}
                                    {p.plan === "Free Trial" ? <p className="text-gray-400 text-xs mt-2">*Perfect for testing and small projects.</p> : <p className="text-gray-400 text-xs mt-2">*Renewals get a +1,000 call bonus.</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               
             
                           <div className="text-center">
                            <button onClick={() => openApiSubscriptionModal && openApiSubscriptionModal()} className="inline-block px-10 py-4 bg-brand-secondary text-white text-lg font-semibold rounded-lg hover:bg-brand-secondary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#846cff]">
                                Upgrade to Premium [API]
                            </button>
                    
                       </div>
                
                

                
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Feature Comparison</h2>
                    <div className="overflow-x-auto glass-card p-4 rounded-2xl">
                        <table className="min-w-full divide-y divide-white/10">
                            <thead className="bg-black/20">
                                <tr>
                                    <th scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Feature</th>
                                    <th scope="col" className="px-2 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Anonymous</th>
                                    <th scope="col" className="px-2 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Free User</th>
                                    <th scope="col" className="px-2 sm:px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {features.map((item, index) => (
                                    <tr key={index} className="hover:bg-black/10">
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.feature}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-400">{item.anonymous}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-center text-gray-400">{item.free}</td>
                                        <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-center font-semibold text-brand-primary">{item.premium}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                      <div id="razorpay-affordability-widget"> </div>
                </div>

                <div className="max-w-4xl mx-auto glass-card p-6 text-left text-gray-400 text-sm rounded-2xl">
                    <h3 className="text-lg font-semibold text-brand-light mb-2">Disclaimer & Terms</h3>
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
        </>
    );
};

export default PricingPage;
