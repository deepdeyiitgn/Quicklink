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
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { RazorpayOrder, RazorpaySuccessResponse, AuthContextType, PricingInfo } from '../types';
import { XIcon, LoadingIcon, CheckIcon, WarningIcon } from './icons/IconComponents';
import CouponInput from './CouponInput';
import { api } from '../api';

interface ApiSubscriptionModalProps {
    onClose: () => void;
}

type PlanId = 'basic' | 'pro';

const API_PLAN_DETAILS: Record<PlanId, { days: number; label: string; description: string, calls: number, bonus: number }> = {
    'basic': { days: 180, label: 'Basic', description: '+2,000 API Calls', calls: 2000, bonus: 1000 },
    'pro': { days: 365, label: 'Pro', description: '+5,000 API Calls', calls: 5000, bonus: 1000 },
};

const ApiSubscriptionModal: React.FC<ApiSubscriptionModalProps> = ({ onClose }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser } = auth;
    const [selectedPlan, setSelectedPlan] = useState<PlanId>('pro');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [view, setView] = useState<'selection' | 'success' | 'failed' | 'cancelled'>('selection');
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | null>(null);

    const [couponCode, setCouponCode] = useState<string>('');
    const [discountAmount, setDiscountAmount] = useState(0);

    const [pricing, setPricing] = useState<PricingInfo | null>(null);

    useEffect(() => {
        api.getPricing().then(setPricing);
    }, []);

    if (!currentUser) {
        return null;
    }

    if (!pricing) {
        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="relative w-full max-w-2xl glass-card rounded-2xl p-8 my-8 text-center">
                    <LoadingIcon className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-4">Loading pricing...</p>
                </div>
            </div>
        );
    }
    
    const isRenewal = currentUser.apiAccess && currentUser.apiAccess.apiKey;
    const planDetails = {
        ...API_PLAN_DETAILS[selectedPlan],
        price: pricing.api[selectedPlan].price,
    };
    const finalPrice = Math.max(0, planDetails.price - discountAmount);
    
    const handleApplyCoupon = async (code: string) => {
        try {
            const response = await fetch(`/api/shop?type=coupon&action=verify&code=${code}&userId=${currentUser.id}&basePrice=${planDetails.price}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Invalid coupon.');

            setDiscountAmount(data.discountAmount);
            setCouponCode(data.isValid ? code : '');
            return { isValid: data.isValid, message: data.message, discountAmount: data.discountAmount };

        } catch (err: any) {
            setDiscountAmount(0);
            setCouponCode('');
            return { isValid: false, message: err.message, discountAmount: 0 };
        }
    };

    const handleRazorpayPayment = async () => {
        setIsLoading(true);
        setError('');
        setPaymentMethod('razorpay');
        
        try {
            const orderResponse = await api.createPaymentOrder({
                provider: 'razorpay',
                amount: planDetails.price,
                currency: 'INR',
                userId: currentUser.id,
                couponCode
            });

            const order: RazorpayOrder = orderResponse;

            const options = {
                key: (import.meta as any).env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'QuickLink API Subscription',
                description: `${planDetails.label} API Plan`,
                order_id: order.id,
                handler: async function (response: RazorpaySuccessResponse) {
                    setIsLoading(true);
                    try {
                        // The backend will generate the key if it doesn't exist
                        await api.fulfillPurchase({
                            userId: currentUser.id,
                            productId: `API_PLAN_${selectedPlan.toUpperCase()}`,
                            paymentId: response.razorpay_payment_id,
                            couponCode: couponCode || undefined
                        });
                        setView('success');
                    } catch (updateError: any) {
                        setError(`Payment was successful, but failed to update subscription. Please contact support. Error: ${updateError.message}`);
                        setView('failed');
                    } finally {
                        setIsLoading(false);
                        setPaymentMethod(null);
                    }
                },
                prefill: { name: currentUser.name, email: currentUser.email },
                theme: { color: '#846cff' },
                modal: { ondismiss: () => { if (view === 'selection') { setView('cancelled'); setIsLoading(false); setPaymentMethod(null); } } }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setIsLoading(false);

        } catch (err: any) {
            console.error("Payment failed:", err);
            setError(`Payment failed: ${err.message}`);
            setView('failed');
            setIsLoading(false);
            setPaymentMethod(null);
        }
    };
    
    const renderContent = () => {
        switch (view) {
            case 'success': return (<div className="text-center p-8"><CheckIcon className="mx-auto h-16 w-16 text-green-500 animate-check-pop" /><h2 className="text-3xl font-bold text-white mt-4">Thank You!</h2><p className="text-gray-400 my-4">Your API subscription is now active. You can find your key in the API Access page.</p><button onClick={onClose} className="w-full max-w-xs mx-auto rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark">Close</button></div>);
            case 'failed': return (<div className="text-center p-8"><XIcon className="mx-auto h-16 w-16 text-red-500" /><h2 className="text-3xl font-bold text-white mt-4">Payment Failed</h2><p className="text-gray-400 my-4 break-words">{error}</p><button onClick={onClose} className="w-full max-w-xs mx-auto rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark">Close</button></div>);
            case 'cancelled': return (<div className="text-center p-8"><WarningIcon className="mx-auto h-16 w-16 text-yellow-500" /><h2 className="text-3xl font-bold text-white mt-4">Payment Cancelled</h2><p className="text-gray-400 my-4">Your transaction was cancelled.</p><button onClick={() => setView('selection')} className="w-full max-w-xs mx-auto rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark">Try Again</button></div>);
            default: return (
                <>
                    <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h2 id="api-sub-modal-title" className="text-3xl font-bold text-white mt-4">API Access Plans</h2>
                        <p className="text-gray-400 mb-8">Unlock the power of QuickLink with our developer-friendly API.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        {Object.entries(API_PLAN_DETAILS).map(([id, plan]) => (
                            <button key={id} onClick={() => setSelectedPlan(id as PlanId)} className={`p-6 rounded-lg border-2 text-left transition-all ${selectedPlan === id ? 'border-brand-secondary bg-brand-secondary/10 scale-105' : 'border-white/20 bg-black/30 hover:border-white/30'}`}>
                                <h3 className="text-xl font-bold text-white">{plan.label}</h3>
                                <p className="text-3xl font-bold text-brand-secondary my-2">₹{pricing.api[id as PlanId].price}</p>
                                <p className="text-sm text-gray-400 mb-1 font-semibold">{plan.description}</p>
                                <p className="text-xs text-gray-500">Key valid for {plan.days} Days</p>
                                {isRenewal && <p className="text-xs text-green-400 font-semibold mt-2">+ {plan.bonus} bonus calls for renewing!</p>}
                                {selectedPlan === id && <CheckIcon className="h-6 w-6 text-brand-secondary mt-4" />}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 my-4 bg-black/30 rounded-lg space-y-2">
                        <div className="flex justify-between text-gray-400 text-sm"><span>Base Price:</span><span>₹{planDetails.price.toFixed(2)}</span></div>
                        {discountAmount > 0 && <div className="flex justify-between text-green-400 text-sm"><span>Coupon Discount:</span><span>- ₹{discountAmount.toFixed(2)}</span></div>}
                        <div className="flex justify-between text-white font-bold text-lg border-t border-white/20 pt-2 mt-2"><span>Final Price:</span><span>₹{finalPrice.toFixed(2)}</span></div>
                    </div>

                    <div className="my-6">
                        <CouponInput onApply={handleApplyCoupon} />
                    </div>

                    <div className="mt-4">
                        <button onClick={handleRazorpayPayment} disabled={isLoading} className="w-full flex justify-center items-center gap-2 rounded-md bg-green-500 px-3 py-3 text-base font-semibold text-brand-dark shadow-sm hover:bg-green-400 disabled:opacity-50">
                            {isLoading && paymentMethod === 'razorpay' ? <LoadingIcon className="animate-spin h-5 w-5" /> : `Pay ₹${finalPrice.toFixed(2)} with Razorpay`}
                        </button>
                    </div>
                </>
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="api-sub-modal-title">
            <div className="relative w-full max-w-2xl glass-card rounded-2xl p-8 my-8" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white" aria-label="Close API subscription modal">
                    <XIcon className="h-6 w-6"/>
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default ApiSubscriptionModal;
