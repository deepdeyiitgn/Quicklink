// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   🛡️ Helper: Google Gemini & ChatGPT
//   🌐 WEBSITE: https://qlynk.vercel.app
//   📅 CREATED: 2025
//   🧠 DESCRIPTION:
//       This component displays a time-sensitive greeting to users returning
//       to the application after a certain interval, enhancing user engagement.
// ===================================================================================

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { XIcon } from './icons/IconComponents';

interface GreetingPopupProps {
  user: User;
  onClose: () => void;
}

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '😊' };
    if (hour < 20) return { text: 'Good Evening', emoji: '🌆' };
    return { text: 'Good Night', emoji: '🌙' };
};

const messages = [
    "Ready to create something amazing today? ✨",
    "Let's make some magic happen! 🚀",
    "Time to shorten some links and build great things! 💡",
    "Glad to see you back! What's on your mind? 🤔"
];

const GreetingPopup: React.FC<GreetingPopupProps> = ({ user, onClose }) => {
    const { text, emoji } = getGreeting();
    const [message] = useState(messages[Math.floor(Math.random() * messages.length)]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Stagger the animation for a smoother entry
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish
    };

    return (
        <div 
            className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-sm glass-card rounded-2xl p-6 shadow-2xl border-2 border-brand-primary/50">
                 <button onClick={handleClose} className="absolute top-3 right-3 p-1 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors" aria-label="Close greeting">
                    <XIcon className="h-5 w-5" />
                </button>
                <div className="text-center">
                    <p className="text-4xl mb-3 animate-pulse">{emoji}</p>
                    <h3 className="text-2xl font-bold text-white">
                        {text}, {user.name.split(' ')[0]}!
                    </h3>
                    <p className="text-gray-300 mt-2 text-sm">{message}</p>
                    <Link to="/tools" onClick={handleClose} className="mt-6 inline-block w-full px-6 py-2 bg-brand-primary text-brand-dark text-sm font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(0,229,255,0.6)]">
                        Go to Tools
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GreetingPopup;

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
// ===================================================================================