// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
// ===================================================================================

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import { LoadingIcon, XIcon } from './icons/IconComponents';

const TwoFactorAuthModal: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { is2FAModalOpen, close2FAModal, complete2FALogin } = auth;

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!is2FAModalOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await complete2FALogin(otp);
        } catch (err: any) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={close2FAModal}
        >
            <div 
                className="relative w-full max-w-sm glass-card rounded-2xl p-8"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={close2FAModal} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                    <XIcon className="h-6 w-6"/>
                </button>

                <h2 className="text-2xl font-bold text-center text-white mb-4">Two-Factor Authentication</h2>
                <p className="text-center text-gray-400 mb-6">
                    Enter the 6-digit code from your authenticator app to complete sign-in.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="sr-only">Authentication Code</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                            required
                            maxLength={6}
                            placeholder="_ _ _ _ _ _"
                            className="w-full bg-black/30 rounded-md border-white/20 text-white text-center text-3xl tracking-[0.5em] font-mono focus:ring-brand-primary"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    
                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80 disabled:opacity-50 transition-all"
                    >
                        {isLoading ? <LoadingIcon className="animate-spin h-5 w-5" /> : 'Verify & Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TwoFactorAuthModal;