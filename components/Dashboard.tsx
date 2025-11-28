import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ProfileSettings from './ProfileSettings';
import SubscriptionStatus from './SubscriptionStatus';
import OwnerDashboard from './OwnerDashboard';
import { AuthContextType, Ticket } from '../types';
import { api } from '../api';
import TicketModal from './TicketModal';
import TicketConversation from './TicketConversation';
// FIX: Removed unused 'QrCodeIcon' which is not an exported member.
import { LoadingIcon, ShieldCheckIcon, CheckIcon, XIcon } from './icons/IconComponents';
import AboutDashboard from './AboutDashboard';
import HowToUseDashboard from './HowToUseDashboard';
import LinkHistory from './LinkHistory'; // The new component for link history
import QRCodeStyling from 'qr-code-styling';


// 2FA Setup Component (defined inside Dashboard.tsx)
const TwoFactorAuthSetup: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser, updateUserProfile } = auth;
    const [step, setStep] = useState<'start' | 'password' | 'qr' | 'verify' | 'done'>('start');
    const [password, setPassword] = useState('');
    const [tempToken, setTempToken] = useState('');
    const [secret, setSecret] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const qrRef = useRef<HTMLDivElement>(null);
    const qrCodeInstance = useRef<QRCodeStyling | null>(null);

    useEffect(() => {
        if (step === 'qr' && qrCodeUrl && qrRef.current) {
            if (!qrCodeInstance.current) {
                qrCodeInstance.current = new QRCodeStyling({
                    width: 256,
                    height: 256,
                    type: 'svg',
                    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 5 },
                    dotsOptions: { color: '#00e5ff', type: 'rounded' },
                    backgroundOptions: { color: '#0a0a0a' },
                });
                qrCodeInstance.current.append(qrRef.current);
            }
            qrCodeInstance.current.update({ data: qrCodeUrl });
        }
    }, [step, qrCodeUrl]);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            if (!currentUser) throw new Error("User not found");
            const res = await api.verifyPasswordFor2FA(currentUser.id, password);
            setTempToken(res.tempToken);
            setStep('qr');
            generateSecret(res.tempToken);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const generateSecret = async (token: string) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await api.generate2FASecret(token);
            setSecret(res.secret);
            setQrCodeUrl(res.qrCodeUrl);
        } catch (err: any) {
            setError(err.message);
            setStep('password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await api.enable2FA(tempToken, otp);
            if(currentUser && updateUserProfile) {
                await updateUserProfile({ ...currentUser, twoFactorEnabled: true });
            }
            setStep('done');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisable = async () => {
        if (!currentUser || !window.confirm("Are you sure you want to disable 2FA? You will need your password and current OTP.")) return;
        
        const currentPassword = prompt("Please enter your current password to continue:");
        if (!currentPassword) return;
        
        const currentOtp = prompt("Please enter a valid 6-digit code from your authenticator app:");
        if (!currentOtp) return;
        
        setIsLoading(true);
        setError('');
        try {
            await api.disable2FA(currentUser.id, currentPassword, currentOtp);
            if (updateUserProfile) {
                await updateUserProfile({ ...currentUser, twoFactorEnabled: false, twoFactorSecret: undefined });
            }
            setStep('start');
        } catch (err: any) {
            setError(err.message);
            alert(`Failed to disable 2FA: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    if (!currentUser) return null;

    if (currentUser.twoFactorEnabled) {
        return (
            <div className="text-center">
                <ShieldCheckIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">Two-Factor Authentication is Active</h3>
                <p className="text-gray-400 mt-2">Your account is protected with an additional layer of security.</p>
                <button onClick={handleDisable} disabled={isLoading} className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-red-600/80 rounded-md hover:bg-red-600 disabled:opacity-50">
                    {isLoading ? <LoadingIcon className="animate-spin h-5 w-5"/> : 'Disable 2FA'}
                </button>
            </div>
        )
    }

    const renderStep = () => {
        switch (step) {
            case 'start':
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-white">Secure Your Account</h3>
                        <p className="text-gray-400 mt-2">Add an extra layer of security with Two-Factor Authentication (2FA).</p>
                        <button onClick={() => setStep('password')} className="mt-6 px-6 py-3 text-sm font-semibold text-brand-dark bg-brand-primary rounded-md hover:bg-brand-primary/80 transition-colors shadow-[0_0_10px_#00e5ff]">
                            Enable 2FA
                        </button>
                    </div>
                );
            case 'password':
                return (
                    <form onSubmit={handlePasswordSubmit}>
                        <h3 className="text-lg font-semibold text-white mb-2">Verify Your Identity</h3>
                        <p className="text-sm text-gray-400 mb-4">Please enter your current password to continue.</p>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Current Password" className="w-full bg-black/40 rounded-md" />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        <button type="submit" disabled={isLoading} className="mt-4 w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-2 text-sm font-semibold text-brand-dark disabled:opacity-50">
                            {isLoading ? <LoadingIcon className="animate-spin h-5 w-5"/> : 'Verify'}
                        </button>
                    </form>
                );
            case 'qr':
                return (
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Set Up Your Authenticator App</h3>
                        {isLoading ? <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto"/></div> :
                        <>
                            <p className="text-sm text-gray-400 mb-4">1. Scan the QR code below with an authenticator app like Google Authenticator.</p>
                            <div ref={qrRef} className="mx-auto my-4 border-8 border-white rounded-lg shadow-lg w-[272px] h-[272px]"></div>
                            <p className="text-sm text-gray-400 mb-4">2. If you can't scan, manually enter this secret key:</p>
                            <code className="block text-center bg-black/40 p-3 rounded-md text-brand-secondary font-mono break-all">{secret}</code>
                            <button onClick={() => setStep('verify')} className="mt-6 w-full py-2 bg-brand-secondary rounded-md">Next</button>
                        </>
                        }
                    </div>
                );
            case 'verify':
                return (
                    <form onSubmit={handleVerifyOtp}>
                        <h3 className="text-lg font-semibold text-white mb-2">Verify & Activate</h3>
                        <p className="text-sm text-gray-400 mb-4">Enter the 6-digit code from your authenticator app to complete the setup.</p>
                        <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6} placeholder="_ _ _ _ _ _" className="w-full bg-black/40 rounded-md text-center text-2xl tracking-[0.5em]" />
                        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                        <button type="submit" disabled={isLoading} className="mt-4 w-full flex justify-center items-center gap-2 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white disabled:opacity-50">
                            {isLoading ? <LoadingIcon className="animate-spin h-5 w-5"/> : 'Activate 2FA'}
                        </button>
                    </form>
                );
            case 'done':
                 return (
                    <div className="text-center">
                        <CheckIcon className="h-12 w-12 text-green-400 mx-auto mb-4 animate-check-pop" />
                        <h3 className="text-xl font-bold text-white">Success!</h3>
                        <p className="text-gray-400 mt-2">2FA has been successfully enabled on your account.</p>
                    </div>
                );
        }
    };
    
    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl">
            {renderStep()}
        </div>
    )
};


const MyTickets: React.FC = () => {
    const auth = useContext(AuthContext);
    const [isTicketModalOpen, setTicketModalOpen] = useState(false);
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    React.useEffect(() => {
        if (auth?.currentUser) {
            api.getUserTickets(auth.currentUser.id).then(userTickets => {
                setTickets(userTickets);
                setLoading(false);
            }).catch(err => {
                console.error("Failed to load tickets:", err);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [auth?.currentUser]);

    const handleTicketUpdate = (updatedTicket: Ticket) => {
        setTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
        setSelectedTicket(updatedTicket);
    };

    if (loading) return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto text-brand-primary" /></div>;
    
    if (selectedTicket) {
        return <TicketConversation ticket={selectedTicket} onBack={() => setSelectedTicket(null)} onUpdate={handleTicketUpdate} isAdminView={false} />;
    }

    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-white">My Support Tickets</h2>
                <button onClick={() => setTicketModalOpen(true)} className="px-4 py-2 text-sm font-semibold text-brand-dark bg-brand-primary rounded-md hover:bg-brand-primary/80">
                    New Ticket
                </button>
            </div>
            {tickets.length > 0 ? (
                <div className="space-y-3">
                    {tickets.map(ticket => (
                        <button key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="w-full text-left p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors">
                            <p className="font-semibold text-white">{ticket.subject}</p>
                            <p className={`text-xs capitalize ${ticket.status === 'open' ? 'text-green-400' : 'text-gray-400'}`}>Status: {ticket.status}</p>
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-8">You have not submitted any support tickets yet.</p>
            )}
            {isTicketModalOpen && <TicketModal onClose={() => setTicketModalOpen(false)} />}
        </div>
    );
};

const UserCredits: React.FC = () => {
    const auth = useContext(AuthContext);
    if(!auth?.currentUser) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-brand-primary">{auth.currentUser.urlCredit.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Remaining Link Credits</p>
            </div>
            <div className="glass-card p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-brand-secondary">{auth.currentUser.apiCallCredit.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Remaining API Call Credits</p>
            </div>
        </div>
    )
}

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const auth = useContext(AuthContext);

    if (auth?.loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <LoadingIcon className="h-12 w-12 animate-spin text-brand-primary" />
            </div>
        );
    }

    if (!auth?.currentUser) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-white">Access Denied</h1>
                <p className="text-gray-400 mt-2">Please log in to view your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-aurora">Dashboard</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">Manage your account, links, and subscriptions.</p>
            </div>

            <div className="flex justify-center p-1 rounded-lg bg-black/30 w-full max-w-xl mx-auto flex-wrap">
                <button onClick={() => setActiveTab('profile')} className={`flex-1 min-w-[120px] py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'profile' ? 'bg-brand-primary text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}>
                    Profile
                </button>
                <button onClick={() => setActiveTab('history')} className={`flex-1 min-w-[120px] py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'history' ? 'bg-brand-primary text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}>
                    Link History
                </button>
                <button onClick={() => setActiveTab('security')} className={`flex-1 min-w-[120px] py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'security' ? 'bg-brand-primary text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}>
                    Security
                </button>
                <button onClick={() => setActiveTab('tickets')} className={`flex-1 min-w-[120px] py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'tickets' ? 'bg-brand-primary text-brand-dark' : 'text-gray-300 hover:bg-white/10'}`}>
                    My Tickets
                </button>
            </div>
            
            {activeTab === 'profile' && (
                <div className="space-y-8">
                    <UserCredits />
                    <ProfileSettings />
                    <SubscriptionStatus />
                </div>
            )}
            
            {activeTab === 'history' && <LinkHistory scope="user" />}

            {activeTab === 'security' && <TwoFactorAuthSetup />}

            {activeTab === 'tickets' && <MyTickets />}
            
            {auth?.currentUser?.isAdmin && <OwnerDashboard />}

            <div className="mt-16 grid gap-12 md:grid-cols-2">
                <AboutDashboard />
                <HowToUseDashboard />
            </div>
        </div>
    );
};

export default Dashboard;