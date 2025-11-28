import React, { useState, useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, Conversation, User } from '../../types';
import { api } from '../../api';
import ConversationList from './ConversationList';
import MessageWindow from './MessageWindow';
import { LoadingIcon, SettingsIcon } from '../icons/IconComponents';
import { Helmet } from 'react-helmet';
import ChatSettingsModal from './ChatSettingsModal';

const ChatPage: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser, users } = auth;
    
    const [conversations, setConversations] = useState<(Conversation & { otherUser?: User })[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation & { otherUser?: User } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const fetchConversations = useCallback(async () => {
        if (!currentUser) return;
        try {
            const convos = await api.getConversations();
            const convosWithUsers = convos.map(convo => {
                const otherUserId = convo.participants.find(pId => pId !== currentUser.id);
                const otherUser = users.find(u => u.id === otherUserId);
                return { ...convo, otherUser };
            }).sort((a,b) => b.createdAt - a.createdAt);
            setConversations(convosWithUsers);
        } catch (error) {
            console.error("Failed to fetch conversations", error);
        } finally {
            setIsLoading(false);
        }
    }, [currentUser, users]);
    
    useEffect(() => {
        if (users.length > 0) {
            fetchConversations();
        }
    }, [fetchConversations, users]);

    const handleStartConversation = (recipient: Pick<User, 'id' | 'name'>) => {
        const existing = conversations.find(c => c.otherUser?.id === recipient.id);
        if (existing) {
            setActiveConversation(existing);
        } else {
             api.startConversation(recipient.id).then(newConvo => {
                const convoWithUser = { ...newConvo, otherUser: { id: recipient.id, name: recipient.name } as User };
                setConversations(prev => [convoWithUser, ...prev]);
                setActiveConversation(convoWithUser);
            });
        }
    };
    
    const handleConversationUpdate = (updatedConvo: Conversation) => {
        const otherUserId = updatedConvo.participants.find(pId => pId !== currentUser?.id);
        const otherUser = users.find(u => u.id === otherUserId);
        
        setConversations(prev => prev.map(c => c._id === updatedConvo._id ? { ...c, ...updatedConvo, otherUser } : c));
        if (activeConversation?._id === updatedConvo._id) {
            setActiveConversation(prev => ({ ...prev!, ...updatedConvo, otherUser }));
        }
    };

    if (!currentUser) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-white">Access Denied</h1>
                <p className="text-gray-400 mt-2">Please <button onClick={() => auth?.openAuthModal('login')} className="text-brand-primary hover:underline">log in</button> to use QuickChat.</p>
            </div>
        );
    }
    
    if (!currentUser.canChat) {
         return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-white">Chat Disabled</h1>
                <p className="text-gray-400 mt-2">Your chat privileges have been disabled by an administrator.</p>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>QuickChat | Private Messaging</title>
                <meta name="description" content="Connect with other QuickLink users through our private and secure messaging platform." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div className="glass-card rounded-2xl h-[75vh] flex flex-col md:flex-row overflow-hidden">
                <div className={`
                    w-full md:w-1/3 md:flex flex-col border-r border-white/10
                    ${activeConversation ? 'hidden' : 'flex'}
                `}>
                     <div className="p-3 border-b border-white/10 flex justify-between items-center">
                        <h3 className="font-bold text-white text-lg">QuickChat</h3>
                        <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10" aria-label="Chat Settings">
                            <SettingsIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <ConversationList
                        conversations={conversations}
                        onSelectConversation={setActiveConversation}
                        onStartConversation={handleStartConversation}
                        onConversationUpdate={handleConversationUpdate}
                        isLoading={isLoading}
                    />
                </div>
                 <div className={`
                    w-full md:w-2/3 md:flex flex-col
                    ${activeConversation ? 'flex' : 'hidden'}
                 `}>
                    {activeConversation ? (
                        <MessageWindow 
                            conversation={activeConversation} 
                            onBack={() => setActiveConversation(null)} 
                        />
                    ) : (
                        <div className="h-full flex-col items-center justify-center text-center hidden md:flex">
                           <p className="text-lg font-semibold text-gray-300">Select a conversation</p>
                           <p className="text-sm text-gray-500">or start a new one by searching for a user.</p>
                        </div>
                    )}
                </div>
            </div>
            {isSettingsOpen && <ChatSettingsModal onClose={() => setIsSettingsOpen(false)} />}
        </>
    );
};

export default ChatPage;