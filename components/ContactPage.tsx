import React, { useState, useContext, useRef, useEffect } from 'react';
import { LoadingIcon, CheckIcon, SparklesIcon, ArrowUpIcon } from './icons/IconComponents';
import SocialLinks from './SocialLinks';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import { AuthContextType, ChatMessage } from '../types';

const AiTicketAssistant: React.FC<{
    setSubject: (s: string) => void;
    setMessage: (m: string) => void;
}> = ({ setSubject, setMessage }) => {
    const auth = useContext(AuthContext) as AuthContextType;
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(history.length === 0) {
            setHistory([{
                role: 'model',
                parts: [{ text: "Hello! I can help you create a support ticket. Please describe your issue in detail, and I will draft a ticket for you to review and submit." }]
            }]);
        }
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage || isThinking) return;

        setInput('');
        setIsThinking(true);
        const newHistory: ChatMessage[] = [...history, { role: 'user', parts: [{ text: userMessage }] }];
        setHistory(newHistory);
        
        try {
            // Use the centralized API call, which sends full history for context
            const data = await api.aiChat(newHistory, 'contact', auth?.currentUser?.id);

            if (data.subject && data.message) {
                // AI returned JSON, so it's a drafted ticket
                setSubject(data.subject);
                setMessage(data.message);
                setHistory(prev => [...prev, { role: 'model', parts: [{ text: `I've drafted the ticket for you. Please review and submit it using the manual form below.` }] }]);
            } else {
                // AI returned a normal text response
                setHistory(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
            }
            
        } catch (error) {
            console.error("AI chat error:", error);
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: "I'm sorry, I'm having trouble connecting right now. Please use the manual form below." }] }]);
        } finally {
            setIsThinking(false);
        }
    };
    
    return (
        <div className="glass-card p-6 md:p-8 rounded-2xl h-[70vh] flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-brand-primary" />
                AI-Powered Ticket Creation
            </h3>
             <div className="flex-grow p-4 -mx-4 overflow-y-auto space-y-4" style={{ backgroundImage: 'url(/chat-bg.svg)', backgroundSize: '150px' }}>
                {history.map((msg, index) => (
                     <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#182533] text-white' : 'bg-white/90 text-brand-dark'}`}>
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.parts[0].text.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="flex justify-start">
                        <div className="p-3 rounded-lg bg-white/90 text-brand-dark flex items-center gap-2">
                           <LoadingIcon className="h-4 w-4 animate-spin"/>
                           <span className="text-sm">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="mt-4 flex items-center gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Describe your issue..." className="contact-input flex-grow" disabled={isThinking} />
                <button type="submit" disabled={isThinking || !input.trim()} className="w-12 h-12 flex-shrink-0 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark disabled:opacity-50">
                    <ArrowUpIcon className="h-6 w-6" />
                </button>
            </form>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { currentUser, aiSettings } = auth || {};

    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setError('');
        try {
            await api.createTicket({
                userId: currentUser ? currentUser.id : null,
                userName: name,
                userEmail: email,
                subject: subject,
                message: message
            });
            setStatus('success');
            if (!currentUser) {
              setName('');
              setEmail('');
            }
            setSubject('');
            setMessage('');
        } catch (error: any) {
            setStatus('error');
            setError(error.message || 'An unknown error occurred while creating the ticket.');
        }
    };

    if (auth?.loading) {
        return (
            <div className="text-center py-20">
                <LoadingIcon className="h-12 w-12 animate-spin text-brand-primary mx-auto" />
            </div>
        );
    }


    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-aurora">Get in Touch</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    {aiSettings?.isContactAiEnabled ? 'Describe your issue to our AI assistant for a faster resolution, or fill out the form manually.' : 'Have a question or feedback? Fill out the form below to create a support ticket.'}
                </p>
            </div>
            <div className={`grid ${aiSettings?.isContactAiEnabled ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-12 items-start max-w-6xl mx-auto`}>
                {aiSettings?.isContactAiEnabled && (
                    <AiTicketAssistant setSubject={setSubject} setMessage={setMessage} />
                )}

                <div className={`space-y-8 ${!aiSettings?.isContactAiEnabled ? 'max-w-2xl mx-auto' : ''}`}>
                    <div className="glass-card p-6 md:p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Or, Create a Ticket Manually</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required disabled={!!currentUser} className="contact-input disabled:bg-black/50 disabled:text-gray-400" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={!!currentUser} className="contact-input disabled:bg-black/50 disabled:text-gray-400" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                <input type="text" id="subject" value={subject} onChange={e => setSubject(e.target.value)} required className="contact-input" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} required className="contact-input"></textarea>
                            </div>
                            <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center gap-2 rounded-md bg-brand-primary px-3 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_15px_rgba(0,229,255,0.5)] hover:bg-brand-primary/80 disabled:opacity-50">
                                {status === 'loading' && <LoadingIcon className="animate-spin h-5 w-5" />}
                                {status === 'success' && <CheckIcon className="h-5 w-5" />}
                                {status === 'success' ? 'Ticket Sent!' : 'Send Ticket'}
                            </button>
                            {status === 'error' && <p className="text-red-400 text-sm text-center">{error}</p>}
                        </form>
                    </div>

                    <div className="text-center md:text-left space-y-4">
                        <h2 className="text-2xl font-bold text-white">Connect with Us</h2>
                        <p className="text-gray-400">
                            For a faster response, you can also reach out to us on our social media platforms.
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
