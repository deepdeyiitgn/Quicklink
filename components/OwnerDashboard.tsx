import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { UrlContext } from '../contexts/UrlContext';
import { User, AuthContextType, Ticket, BlockedWords, Conversation } from '../types';
import { LoadingIcon, WarningIcon, ShieldCheckIcon, TrashIcon } from './icons/IconComponents';
import UserProfileModal from './UserProfileModal';
import { api } from '../api';
import { timeAgo } from '../utils/time';
import TicketConversation from './TicketConversation';
import NotificationCreator from './NotificationCreator';
import ProductManager from './ProductManager';
import CouponManager from './CouponManager';
import LiveActivityDashboard from './LiveActivityDashboard';
import LinkHistory from './LinkHistory';
import PricingManager from './PricingManager';
import DeleteExpiredUrlsButton from './DeleteExpiredUrlsButton';
import MessageWindow from './chat/MessageWindow';
import AiManagement from './AiManagement';

const TICKET_STATUS_STYLES: Record<Ticket['status'], string> = {
    open: 'bg-green-500/20 text-green-300',
    'in-progress': 'bg-blue-500/20 text-blue-300',
    closed: 'bg-red-500/20 text-red-300',
};

const TwoFactorManagement: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { users, updateUserData, getAllUsers } = auth;
    const [adminData, setAdminData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchAdminData = async () => {
        if (!auth.currentUser) return;
        try {
            const data = await api.getAdminDashboardData(auth.currentUser.id);
            setAdminData(data);
        } catch (error) {
            console.error("Failed to fetch admin data for 2FA", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAdminData();
        const interval = setInterval(fetchAdminData, 6000); // Refresh OTPs
        return () => clearInterval(interval);
    }, [auth.currentUser?.id]);

    const handleDisable2FA = async (userId: string) => {
        if (!window.confirm("Are you sure you want to disable 2FA for this user? This should only be done if they are locked out.")) return;
        try {
            await api.adminDisable2FA(userId);
            await getAllUsers(); // Refresh user list
            await fetchAdminData(); // Refresh 2FA list
        } catch (error: any) {
            alert("Failed to disable 2FA: " + error.message);
        }
    };
    
    const usersWith2FA = adminData?.allUsers.filter((u: User) => u.twoFactorEnabled) || [];

    if(loading) return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto text-brand-primary" /></div>;

    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-4">2FA Management</h3>
            {usersWith2FA.length === 0 ? (
                <p className="text-gray-400">No users have enabled 2FA yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="text-gray-400">
                            <tr>
                                <th className="text-left font-semibold p-2">User</th>
                                <th className="text-center font-semibold p-2">Live OTP</th>
                                <th className="text-center font-semibold p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {usersWith2FA.map((user: User & { currentOtp: string }) => (
                                <tr key={user.id}>
                                    <td className="p-2">
                                        <p className="font-semibold text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </td>
                                    <td className="p-2 text-center font-mono text-xl text-brand-primary tracking-widest">
                                        {user.currentOtp || '...'}
                                    </td>
                                    <td className="p-2 text-center">
                                        <button onClick={() => handleDisable2FA(user.id)} className="text-xs font-semibold text-red-400 hover:underline">
                                            Disable 2FA
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

const ChatManagement: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [blockedWords, setBlockedWords] = useState<string[]>([]);
    const [newWord, setNewWord] = useState('');
    const [conversations, setConversations] = useState<(Conversation & { userNames: string[] })[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<(Conversation & { userNames: string[] }) | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [wordsData, convosData] = await Promise.all([
                api.getBlockedWords(),
                api.adminGetConversations()
            ]);
            setBlockedWords(wordsData.words);
            
            const usersMap = new Map(auth.users.map(u => [u.id, u.name]));
            const convosWithNames = convosData.map((convo: Conversation) => ({
                ...convo,
                userNames: convo.participants.map(pId => usersMap.get(pId) || 'Unknown User')
            }));
            setConversations(convosWithNames);

        } catch (error) {
            console.error("Failed to load chat admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth.users.length > 0) {
            fetchData();
        }
    }, [auth.users]);

    const handleAddWord = async () => {
        if (!newWord.trim()) return;
        const updatedWords = [...blockedWords, newWord.trim().toLowerCase()];
        await api.updateBlockedWords(updatedWords);
        setBlockedWords(updatedWords);
        setNewWord('');
    };

    const handleRemoveWord = async (wordToRemove: string) => {
        const updatedWords = blockedWords.filter(w => w !== wordToRemove);
        await api.updateBlockedWords(updatedWords);
        setBlockedWords(updatedWords);
    };

    const toggleUserChat = async (userId: string) => {
        const user = auth.users.find(u => u.id === userId);
        if (!user) return;
        const newCanChat = !(user.canChat ?? true); // Default to true if undefined
        if(window.confirm(`Are you sure you want to ${newCanChat ? 'enable' : 'disable'} chat for ${user.name}?`)) {
            await auth.updateUserData(userId, { canChat: newCanChat });
        }
    }
    
    if (loading) return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto" /></div>;

    if (selectedConversation) {
        return (
            <div>
                 <MessageWindow 
                    conversation={selectedConversation} 
                    isAdminView={true} 
                    onBack={() => setSelectedConversation(null)} 
                 />
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <h4 className="font-semibold text-white">All Conversations</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {conversations.map(convo => (
                        <button key={convo._id} onClick={() => setSelectedConversation(convo)} className="w-full text-left p-3 bg-black/30 rounded-lg hover:bg-black/40">
                           <p className="font-semibold text-white truncate">{convo.userNames.join(' & ')}</p>
                           <p className="text-xs text-gray-400">Status: <span className={convo.status === 'accepted' ? 'text-green-400' : 'text-yellow-400'}>{convo.status}</span></p>
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-4">
                 <h4 className="font-semibold text-white">Censored Words</h4>
                 <div className="flex gap-2">
                     <input type="text" value={newWord} onChange={e => setNewWord(e.target.value)} placeholder="Add word" className="w-full bg-black/40 rounded-md text-sm" />
                     <button onClick={handleAddWord} className="px-3 bg-brand-primary text-brand-dark rounded-md font-semibold text-sm">Add</button>
                 </div>
                 <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                     {blockedWords.map(word => (
                         <span key={word} className="bg-red-900/50 text-red-300 text-xs px-2 py-1 rounded flex items-center gap-1.5">
                             {word}
                             <button onClick={() => handleRemoveWord(word)} className="font-bold">&times;</button>
                         </span>
                     ))}
                 </div>
                 <h4 className="font-semibold text-white pt-4 border-t border-white/10">User Chat Permissions</h4>
                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                     {auth.users.filter(u => !u.isAdmin).map(user => (
                         <div key={user.id} className="p-2 bg-black/30 rounded flex justify-between items-center">
                            <p className="text-sm">{user.name}</p>
                            <button onClick={() => toggleUserChat(user.id)} className={`text-xs font-semibold px-2 py-0.5 rounded ${user.canChat ?? true ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
                                {user.canChat ?? true ? 'Enabled' : 'Disabled'}
                            </button>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    )
};


const UserManagement: React.FC = () => {
    const auth = useContext(AuthContext);
    const urlContext = useContext(UrlContext);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    if (!auth || !urlContext) return null;

    const { users, updateUserData } = auth;
    const { deleteUrlsByUserId } = urlContext;

    const handleRoleChange = async (userId: string, role: keyof User, value: boolean) => {
        try {
            await updateUserData(userId, { [role]: value } as Partial<User>);
        } catch (error: any) {
            alert(`Error: ${error.message}`);
        }
    };
    
    const handleStatusChange = async (userId: string, currentStatus: User['status']) => {
        const newStatus = currentStatus === 'active' ? 'banned' : 'active';
        if (window.confirm(`Are you sure you want to ${newStatus === 'banned' ? 'block' : 'unblock'} this user?`)) {
            try {
                await updateUserData(userId, { status: newStatus });
            } catch (error: any) {
                alert(`Error: ${error.message}`);
            }
        }
    };

// ... (UserManagement component ke andar)

    return (
        <div>
            <h3 className="text-xl font-bold text-white mb-4">User Management</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm">
                    <thead className="text-gray-400">
                        <tr>
                            <th className="text-left font-semibold px-1 sm:px-2 py-2">User</th>
                            <th className="text-center font-semibold px-1 sm:px-2 py-2">Status</th>
                            <th className="text-center font-semibold px-1 sm:px-2 py-2">Admin</th>
                            <th className="text-center font-semibold px-1 sm:px-2 py-2">Moderator</th>
                            {/* 🟢 NEW COLUMN ADDED */}
                            <th className="text-center font-semibold px-1 sm:px-2 py-2">Custom Expiry</th> 
                            <th className="text-center font-semibold px-1 sm:px-2 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {users.map(user => (
                            <tr key={user.id} className="text-gray-300">
                                <td className="px-1 sm:px-2 py-2">
                                    <button onClick={() => setSelectedUser(user)} className="hover:underline text-left">
                                        <p className="font-semibold text-white">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </button>
                                </td>
                                <td className="px-1 sm:px-2 py-2 text-center">
                                    <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : user.status === 'banned' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-1 sm:px-2 py-2 text-center">
                                    <input type="checkbox" checked={user.isAdmin} onChange={(e) => handleRoleChange(user.id, 'isAdmin', e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-brand-secondary focus:ring-brand-secondary" />
                                </td>
                                <td className="px-1 sm:px-2 py-2 text-center">
                                    <input type="checkbox" checked={user.canModerate} onChange={(e) => handleRoleChange(user.id, 'canModerate', e.target.checked)} className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-blue-400 focus:ring-blue-400" />
                                </td>
                                
                                {/* 🟢 NEW CHECKBOX ADDED */}
                                <td className="px-1 sm:px-2 py-2 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={user.canSetCustomExpiry} 
                                        onChange={(e) => handleRoleChange(user.id, 'canSetCustomExpiry', e.target.checked)} 
                                        className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-purple-400 focus:ring-purple-400" 
                                        title="Enable Permanent Links"
                                    />
                                </td>

                                <td className="px-1 sm:px-2 py-2 text-center space-x-2">
                                    <button onClick={() => handleStatusChange(user.id, user.status)} className={`text-xs font-semibold ${user.status === 'active' ? 'text-red-400 hover:underline' : 'text-green-400 hover:underline'}`}>
                                        {user.status === 'active' ? 'Block' : 'Unblock'}
                                    </button>
                                    <button onClick={() => { if(window.confirm(`Are you sure you want to delete all URLs for ${user.name}?`)) deleteUrlsByUserId?.(user.id) }} className="text-red-500 hover:underline text-xs">Delete URLs</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {selectedUser && <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
    );
};

const TicketManagement: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [filter, setFilter] = useState<'all' | Ticket['status']>('all');
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth?.currentUser?.isAdmin) {
            api.getAllTickets(auth.currentUser.id).then(allTickets => {
                setTickets(allTickets);
                setLoading(false);
            }).catch(err => {
                console.error("Failed to fetch admin tickets:", err);
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

    const filteredTickets = tickets.filter(t => filter === 'all' || t.status === filter);

    if (loading) {
        return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto" /></div>;
    }

    if (selectedTicket) {
        return <TicketConversation ticket={selectedTicket} onBack={() => setSelectedTicket(null)} onUpdate={handleTicketUpdate} isAdminView />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">All Support Tickets</h3>
                <select value={filter} onChange={e => setFilter(e.target.value as any)} className="bg-black/30 rounded-md border-white/20 text-white text-sm focus:ring-brand-primary">
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>
            {filteredTickets.length > 0 ? (
                <div className="space-y-3">
                    {filteredTickets.map(ticket => (
                        <button key={ticket.id} onClick={() => setSelectedTicket(ticket)} className="w-full text-left p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white">{ticket.subject}</p>
                                <p className="text-xs text-gray-400">From: {ticket.userName} ({ticket.userEmail})</p>
                                <p className="text-xs text-gray-500">Last updated: {timeAgo(ticket.replies[ticket.replies.length - 1]?.createdAt || ticket.createdAt)}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${TICKET_STATUS_STYLES[ticket.status]}`}>
                                {ticket.status.replace('-', ' ')}
                            </span>
                        </button>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 text-center py-8">No tickets match the current filter.</p>
            )}
        </div>
    );
};


const OwnerDashboard: React.FC = () => {
    const auth = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('live');
    
    if (!auth || !auth.currentUser?.isAdmin) {
        return null;
    }

    const renderContent = () => {
        switch(activeTab) {
            case 'live': return <LiveActivityDashboard />;
            case 'history': return <LinkHistory scope="admin" />;
            case 'shop': return <ProductManager />;
            case 'coupons': return <CouponManager />;
            case 'pricing': return <PricingManager />;
            case 'tickets': return <TicketManagement />;
            case 'notifications': return <NotificationCreator />;
            case '2fa': return <TwoFactorManagement />;
            case 'chats': return <ChatManagement />;
            case 'ai': return <AiManagement />;
            case 'users': default: return <UserManagement />;
        }
    };
    
    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl mt-12 border-2 border-brand-secondary/50">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                 <h2 className="text-3xl font-bold text-brand-secondary flex items-center gap-2">
                    <WarningIcon className="h-8 w-8" />
                    Admin Panel
                </h2>
                <div className="p-1 rounded-lg bg-black/30 flex flex-wrap items-center gap-1">
                     <button onClick={() => setActiveTab('live')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'live' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Live</button>
                     <button onClick={() => setActiveTab('users')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'users' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Users</button>
                     <button onClick={() => setActiveTab('ai')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'ai' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>AI</button>
                     <button onClick={() => setActiveTab('2fa')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === '2fa' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>2FA</button>
                     <button onClick={() => setActiveTab('chats')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'chats' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Chats</button>
                    <button onClick={() => setActiveTab('history')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'history' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>History</button>
                    <button onClick={() => setActiveTab('shop')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'shop' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Shop</button>
                    <button onClick={() => setActiveTab('coupons')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'coupons' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Coupons</button>
                     <button onClick={() => setActiveTab('pricing')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'pricing' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Pricing</button>
                     <button onClick={() => setActiveTab('tickets')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'tickets' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Tickets</button>
                    <button onClick={() => setActiveTab('notifications')} className={`py-1.5 px-3 text-sm font-semibold rounded-md transition-colors ${activeTab === 'notifications' ? 'bg-brand-secondary/80 text-white' : 'text-gray-400 hover:bg-white/10'}`}>Notify</button>
                </div>
            </div>
            
            {renderContent()}

            <div className="mt-8 pt-6 border-t border-white/20">
                <h3 className="text-xl font-bold text-white mb-4">Project Management</h3>
                <div className="flex flex-wrap items-center gap-4">
                    <a 
                        href="https://github.com/deepdeyiitgn/QuickLink-URL-Shortener/archive/refs/heads/main.zip" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-6 py-3 text-sm font-semibold text-brand-dark bg-gray-300 rounded-md hover:bg-white transition-colors"
                    >
                        Download Project Source (ZIP)
                    </a>
                    <DeleteExpiredUrlsButton />
                </div>
                <p className="text-xs text-gray-500 mt-2">This will take you to the project's GitHub repository where you can download the latest source code as a zip file.</p>
            </div>
        </div>
    );
};

export default OwnerDashboard;
