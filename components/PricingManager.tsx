import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import { PricingInfo } from '../types';
import { LoadingIcon, CheckIcon } from './icons/IconComponents';

const PricingManager: React.FC = () => {
    const auth = useContext(AuthContext);
    const [prices, setPrices] = useState<PricingInfo | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        api.getPricing()
            .then(data => {
                setPrices(data);
                setStatus('idle');
            })
            .catch(() => {
                setError('Failed to load current prices.');
                setStatus('error');
            });
    }, []);

    const handlePriceChange = (category: 'subscription' | 'api', plan: string, value: string) => {
        if (!prices) return;
        const newPrices = { ...prices };
        (newPrices[category] as any)[plan].price = Number(value);
        setPrices(newPrices);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prices || !auth?.currentUser) return;
        
        setStatus('saving');
        setError('');
        try {
            await api.updatePricing(prices, auth.currentUser.id);
            setStatus('success');
            setTimeout(() => setStatus('idle'), 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to save prices.');
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto" /></div>;
    }

    if (!prices) {
        return <p className="text-center text-red-400">{error || 'Could not load pricing data.'}</p>;
    }

    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-4">Manage Plan Pricing</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <h4 className="font-semibold text-brand-primary mb-2">Subscription Plans</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(prices.subscription).map(([planId, data]) => (
                            <div key={planId}>
                                <label className="block text-sm text-gray-400 capitalize mb-1">{planId.replace('-', ' ')} Price (₹)</label>
                                <input 
                                    type="number" 
                                    // FIX: Cast `data` to the correct type to resolve property access error.
                                    value={(data as { price: number }).price}
                                    onChange={e => handlePriceChange('subscription', planId, e.target.value)}
                                    className="w-full bg-black/40 rounded-md border-white/20"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                 <div>
                    <h4 className="font-semibold text-brand-secondary mb-2">API Plans</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {Object.entries(prices.api).map(([planId, data]) => (
                            <div key={planId}>
                                <label className="block text-sm text-gray-400 capitalize mb-1">{planId} Price (₹)</label>
                                <input 
                                    type="number" 
                                    // FIX: Cast `data` to the correct type to resolve property access error.
                                    value={(data as { price: number }).price}
                                    onChange={e => handlePriceChange('api', planId, e.target.value)}
                                    className="w-full bg-black/40 rounded-md border-white/20"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={status === 'saving'} className="w-full sm:w-auto flex justify-center items-center gap-2 rounded-md bg-brand-primary px-6 py-2 text-sm font-semibold text-brand-dark hover:bg-brand-primary/80 disabled:opacity-50">
                    {status === 'saving' && <LoadingIcon className="animate-spin h-5 w-5" />}
                    {status === 'success' && <CheckIcon className="h-5 w-5" />}
                    {status === 'saving' ? 'Saving...' : status === 'success' ? 'Saved!' : 'Save All Prices'}
                </button>
            </form>
        </div>
    );
};

export default PricingManager;
