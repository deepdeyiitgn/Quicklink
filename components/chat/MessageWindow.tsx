import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Conversation, Message, User, AuthContextType } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../api';
import { LoadingIcon, ArrowLeftIcon, RefreshCwIcon, BadgeCheckIcon } from '../icons/IconComponents';
import { timeAgo } from '../../utils/time';

interface MessageWindowProps {
    conversation: Conversation & { otherUser?: User };
    onBack: () => void;
    isAdminView?: boolean;
}

const emojis = ['😊', '😂', '❤️', '👍', '🙏', '🎉', '🔥', '🚀', '💡', '💯'];

const MessageWindow: React.FC<MessageWindowProps> = ({ conversation, onBack, isAdminView = false }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser } = auth;
    
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(async (manual = false) => {
        if (manual) setIsRefreshing(true);
        try {
            const fetchedMessages = await api.getMessages(conversation._id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        } finally {
            if (manual) setIsRefreshing(false);
        }
    }, [conversation._id]);

    useEffect(() => {
        setIsLoading(true);
        api.getMessages(conversation._id)
            .then(setMessages)
            .finally(() => setIsLoading(false));
        
        const interval = setInterval(() => fetchMessages(false), 15000);
        return () => clearInterval(interval);
    }, [conversation._id, fetchMessages]);

    useEffect(() => {
        // Only scroll on initial load.
        if (!isLoading) {
            const container = messagesContainerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;
        
        setIsSending(true);
        const senderId = isAdminView ? 'Quicklink Team' : currentUser.id;
        
        try {
            const sentMessage = await api.sendMessage(conversation._id, newMessage, senderId);
            setMessages(prev => [...prev, sentMessage]);
            setNewMessage('');
            // Scroll to bottom after sending a message
            setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setIsSending(false);
        }
    };
    
    const otherUser = conversation.otherUser;

    return (
        <div className="w-full h-full flex flex-col">
            <header className="flex items-center gap-3 p-3 border-b border-white/10 flex-shrink-0">
                <button onClick={onBack} className="p-1 text-gray-400 hover:text-white md:hidden"><ArrowLeftIcon className="h-6 w-6" /></button>
                {otherUser && (
                    <>
                        {otherUser.profilePictureUrl && otherUser.chatProfilePictureVisibility === 'visible' && conversation.status === 'accepted' ? (
                            <img src={otherUser.profilePictureUrl} alt={otherUser.name} className="h-10 w-10 rounded-full object-cover" />
                        ) : (
                             <div className="h-10 w-10 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center font-bold text-white">
                                {otherUser.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div>
                             <h3 className="font-bold text-white truncate">{otherUser.name}</h3>
                             {otherUser.chatUsername && <p className="text-xs text-gray-400">@{otherUser.chatUsername}</p>}
                        </div>
                    </>
                )}
                <button onClick={() => fetchMessages(true)} className="ml-auto p-1 text-gray-400 hover:text-white"><RefreshCwIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /></button>
            </header>

            <div ref={messagesContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                {isLoading ? <div className="text-center text-gray-400"><LoadingIcon className="h-6 w-6 animate-spin mx-auto"/></div> :
                    messages.length === 0 ? (
                        <div className="text-center text-gray-400 p-8">
                            <p className="font-semibold">This is the beginning of your conversation.</p>
                            {otherUser?.chatWelcomeMessage && (
                                <p className="mt-4 text-sm italic bg-black/20 p-3 rounded-lg">"{otherUser.chatWelcomeMessage}"</p>
                            )}
                        </div>
                    ) : (
                        messages.map(msg => {
                            const isCurrentUser = msg.senderId === currentUser?.id;
                            const isAdminMsg = msg.isAdminMessage;
                            const displayName = isAdminMsg ? 'Quicklink Team' : isCurrentUser ? 'You' : otherUser?.name;
    
                            return (
                                <div key={msg._id} className={`flex flex-col ${isCurrentUser || isAdminMsg ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-xs p-3 rounded-lg ${isAdminMsg ? 'bg-blue-800/80' : isCurrentUser ? 'bg-brand-primary/80 text-brand-dark' : 'bg-white/20'}`}>
                                        <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                                            <span className={isAdminMsg ? 'text-blue-300' : 'text-gray-400'}>{displayName}</span>
                                            {isAdminMsg && <BadgeCheckIcon className="h-3 w-3 text-blue-300" />}
                                        </div>
                                        <p className="text-sm break-words">{msg.content}</p>
                                        <p className="text-xs text-right mt-1 opacity-60">{timeAgo(msg.timestamp)}</p>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                     <div className="dropdown dropdown-top">
                        <button tabIndex={0} className="p-2 bg-white/10 rounded-full">😊</button>
                        <div tabIndex={0} className="dropdown-content grid grid-cols-5 gap-1 p-2 shadow bg-black/50 rounded-box w-52 mb-2">
                             {emojis.map(emoji => <button key={emoji} onClick={() => setNewMessage(prev => prev + emoji)} className="p-1 text-2xl rounded hover:bg-white/20">{emoji}</button>)}
                        </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="flex-grow flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            disabled={isSending}
                            className="w-full bg-black/30 rounded-full border-white/20 text-white text-sm px-4 py-2 focus:ring-brand-primary"
                        />
                        <button type="submit" disabled={isSending || !newMessage.trim()} className="px-4 py-2 text-sm font-semibold text-brand-dark bg-brand-primary rounded-full disabled:opacity-50">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessageWindow;