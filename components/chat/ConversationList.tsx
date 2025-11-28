import React, { useState, useContext, useEffect } from 'react';
import { Conversation, User, AuthContextType } from '../../types';
import { AuthContext } from '../../contexts/AuthContext';
import { LoadingIcon } from '../icons/IconComponents';
import { api } from '../../api';

interface ConversationListProps {
    conversations: (Conversation & { otherUser?: User })[];
    onSelectConversation: (conversation: Conversation) => void;
    onStartConversation: (user: Pick<User, 'id' | 'name' | 'chatUsername'>) => void;
    onConversationUpdate: (conversation: Conversation) => void;
    isLoading: boolean;
}

const ConversationListItem: React.FC<{ user: User, onClick: () => void }> = ({ user, onClick }) => {
    const showPicture = user.profilePictureUrl && user.chatProfilePictureVisibility === 'visible';
    
    return (
        <button onClick={onClick} className="w-full text-left p-3 hover:bg-white/10 rounded-md flex items-center gap-3">
            {showPicture ? (
                <img src={user.profilePictureUrl} alt={user.name} className="h-10 w-10 rounded-full object-cover flex-shrink-0" />
            ) : (
                <div className="h-10 w-10 rounded-full bg-brand-secondary flex-shrink-0 flex items-center justify-center font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            )}
            <div>
                <p className="font-semibold text-white">{user.name}</p>
                {user.chatUsername && <p className="text-xs text-gray-400">@{user.chatUsername}</p>}
            </div>
        </button>
    );
};


const ConversationList: React.FC<ConversationListProps> = ({ conversations, onSelectConversation, onStartConversation, onConversationUpdate, isLoading }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Pick<User, 'id' | 'name' | 'chatUsername'>[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (searchQuery.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        const debounce = setTimeout(() => {
            api.searchUsersForChat(searchQuery).then(results => {
                setSearchResults(results);
                setIsSearching(false);
            });
        }, 300);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleStatusUpdate = async (conversationId: string, status: 'accepted' | 'declined') => {
        const updated = await api.updateConversationStatus(conversationId, status);
        onConversationUpdate(updated);
    }
    
    const pendingRequests = conversations.filter(c => c.status === 'pending' && c.initiatedBy !== auth.currentUser?.id);
    const acceptedChats = conversations.filter(c => c.status === 'accepted');

    const existingChatUserIds = conversations.map(c => c.otherUser?.id);
    const suggestedUsers = auth.users
        .filter(u => 
            u.id !== auth.currentUser?.id && 
            !existingChatUserIds.includes(u.id) && 
            u.canChat &&
            u.isVisibleInSuggestions &&
            u.chatUsername
        )
        .slice(0, 5);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="p-3 border-b border-white/10">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search users to chat..."
                    className="w-full bg-black/30 rounded-md border-white/20 text-white text-sm focus:ring-brand-primary"
                />
            </div>

            <div className="flex-grow overflow-y-auto">
                {isLoading ? <div className="p-4 text-center text-gray-400"><LoadingIcon className="h-6 w-6 animate-spin mx-auto"/></div> : (
                    <>
                        {searchQuery.length > 0 ? (
                            <>
                                {isSearching && <div className="p-4 text-center text-gray-400">Searching...</div>}
                                {searchResults.map(user => (
                                    <button key={user.id} onClick={() => { onStartConversation(user); setSearchQuery(''); }} className="w-full text-left p-3 hover:bg-white/10 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center font-bold text-white">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{user.name}</p>
                                            {user.chatUsername && <p className="text-xs text-gray-400">@{user.chatUsername}</p>}
                                        </div>
                                    </button>
                                ))}
                                {!isSearching && searchResults.length === 0 && searchQuery.length >= 2 && <p className="p-4 text-center text-gray-500 text-sm">No users found.</p>}
                            </>
                        ) : (
                            <>
                                {pendingRequests.length > 0 && (
                                    <div className="p-3 border-b border-white/10">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Requests</h4>
                                        {pendingRequests.map(convo => (
                                            <div key={convo._id} className="p-3 bg-black/20 rounded-lg">
                                                <p className="text-sm text-white">{convo.otherUser?.name || '...'} wants to chat.</p>
                                                <div className="flex gap-2 mt-2">
                                                    <button onClick={() => handleStatusUpdate(convo._id, 'accepted')} className="text-xs px-3 py-1 bg-green-500 text-white rounded">Accept</button>
                                                    <button onClick={() => handleStatusUpdate(convo._id, 'declined')} className="text-xs px-3 py-1 bg-red-500 text-white rounded">Decline</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="p-3 border-b border-white/10">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Chats</h4>
                                     {acceptedChats.map(convo => convo.otherUser ? (
                                         <ConversationListItem key={convo._id} user={convo.otherUser} onClick={() => onSelectConversation(convo)} />
                                     ) : null)}
                                     {acceptedChats.length === 0 && <p className="text-center text-sm text-gray-500 py-4">No active chats.</p>}
                                </div>

                                 <div className="p-3">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Suggestions</h4>
                                     {suggestedUsers.map(user => (
                                        <button key={user.id} onClick={() => onStartConversation(user)} className="w-full text-left p-3 hover:bg-white/10 rounded-md flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center font-bold text-white">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">{user.name}</p>
                                                {user.chatUsername && <p className="text-xs text-gray-400">@{user.chatUsername}</p>}
                                            </div>
                                        </button>
                                     ))}
                                     {suggestedUsers.length === 0 && <p className="text-center text-sm text-gray-500 py-4">No new users to suggest.</p>}
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ConversationList;