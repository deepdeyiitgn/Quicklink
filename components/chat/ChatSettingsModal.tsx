import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType } from '../../types';
import { XIcon, LoadingIcon, CheckIcon } from '../icons/IconComponents';

interface ChatSettingsModalProps {
    onClose: () => void;
}

const ChatSettingsModal: React.FC<ChatSettingsModalProps> = ({ onClose }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser, updateUserProfile } = auth;

    const [username, setUsername] = useState(currentUser?.chatUsername || '');
    const [welcomeMessage, setWelcomeMessage] = useState(currentUser?.chatWelcomeMessage || '');
    const [visibility, setVisibility] = useState(currentUser?.chatProfilePictureVisibility || 'hidden');
    const [isVisibleInSuggestions, setIsVisibleInSuggestions] = useState(currentUser?.isVisibleInSuggestions || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setIsSuccess(false);

        try {
            await updateUserProfile({
                chatUsername: username,
                chatWelcomeMessage: welcomeMessage,
                chatProfilePictureVisibility: visibility as 'visible' | 'hidden',
                isVisibleInSuggestions: isVisibleInSuggestions
            });
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to save settings.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-md glass-card rounded-2xl p-8" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><XIcon className="h-6 w-6"/></button>
                <h2 className="text-2xl font-bold text-white mb-6">Chat Settings</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="chat-username" className="block text-sm font-medium text-gray-300 mb-1">Chat Username</label>
                        <input type="text" id="chat-username" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary" placeholder="e.g., tech_guru" />
                        <p className="text-xs text-gray-500 mt-1">This will be your unique name in chats.</p>
                    </div>
                    <div>
                        <label htmlFor="chat-welcome" className="block text-sm font-medium text-gray-300 mb-1">Welcome Message</label>
                        <textarea id="chat-welcome" value={welcomeMessage} onChange={e => setWelcomeMessage(e.target.value)} rows={2} className="w-full bg-black/30 rounded-md border-white/20 text-white focus:ring-brand-primary" placeholder="Hi there! What's on your mind?" />
                        <p className="text-xs text-gray-500 mt-1">This message will be shown to users when they start a chat with you.</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture Visibility</label>
                         <div className="flex items-center justify-between bg-black/30 p-3 rounded-md">
                            <span className="text-gray-300">Show to accepted chats</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={visibility === 'visible'} onChange={e => setVisibility(e.target.checked ? 'visible' : 'hidden')} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Discoverability</label>
                         <div className="flex items-center justify-between bg-black/30 p-3 rounded-md">
                            <span className="text-gray-300">Appear in chat suggestions</span>
                             <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isVisibleInSuggestions} onChange={e => setIsVisibleInSuggestions(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                            </label>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-primary/80 disabled:opacity-50">
                        {isLoading ? <LoadingIcon className="animate-spin h-5 w-5"/> : (isSuccess ? <CheckIcon className="h-5 w-5"/> : 'Save Settings')}
                    </button>
                </form>
            </div>
         </div>
    );
};

export default ChatSettingsModal;