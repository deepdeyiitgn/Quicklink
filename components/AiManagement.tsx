// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
// ===================================================================================

import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types';
import { LoadingIcon, SparklesIcon } from './icons/IconComponents';

const AiManagement: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { aiSettings, aiUsageStats, updateAiSettings, loading } = auth;

    if (loading || !aiSettings || !aiUsageStats) {
        return <div className="text-center py-10"><LoadingIcon className="h-8 w-8 animate-spin mx-auto text-brand-primary" /></div>;
    }
    
    // 🟢 Fixed: Variable name match kar diya
    const dailyAiLimit = 800;
    const dailyUsage = aiUsageStats.dailyRequestCount || 0;
    // 🟢 Fixed: Yahan 'dailyLimit' ki jagah 'dailyAiLimit' use kiya
    const usagePercentage = Math.min((dailyUsage / dailyAiLimit) * 100, 100);

    const handleToggle = (key: 'isBubbleAiEnabled' | 'isContactAiEnabled') => {
        if (updateAiSettings) {
            updateAiSettings({ [key]: !aiSettings[key] });
        }
    };

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <SparklesIcon className="h-6 w-6 text-brand-primary" />
                AI Assistant Management
            </h3>

            {/* Toggles */}
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg flex items-center justify-between">
                    <label htmlFor="bubble-toggle" className="font-semibold text-white">Floating AI Bubble</label>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="bubble-toggle" checked={aiSettings.isBubbleAiEnabled} onChange={() => handleToggle('isBubbleAiEnabled')} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                    </label>
                </div>
                <div className="bg-black/30 p-4 rounded-lg flex items-center justify-between">
                    <label htmlFor="contact-toggle" className="font-semibold text-white">Contact Page AI</label>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="contact-toggle" checked={aiSettings.isContactAiEnabled} onChange={() => handleToggle('isContactAiEnabled')} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                    </label>
                </div>
            </div>

            {/* Daily Usage */}
            <div>
                <h4 className="font-semibold text-white mb-2">Daily API Usage</h4>
                <div className="bg-black/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-gray-300">Daily Requests</span>
                        {/* 🟢 Fixed: Yahan bhi 'dailyAiLimit' update kiya */}
                        <span className="font-semibold text-white">{dailyUsage} / {dailyAiLimit}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-brand-primary h-2.5 rounded-full" style={{ width: `${usagePercentage}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Per User Usage */}
            <div>
                <h4 className="font-semibold text-white mb-2">Usage by User</h4>
                <div className="bg-black/30 rounded-lg max-h-60 overflow-y-auto">
                    <table className="min-w-full text-sm">
                        <thead className="sticky top-0 bg-brand-dark/80 backdrop-blur-sm">
                            <tr>
                                <th className="text-left font-semibold p-2 text-gray-400">User</th>
                                <th className="text-right font-semibold p-2 text-gray-400">Requests</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {aiUsageStats.userUsage.length > 0 ? (
                                aiUsageStats.userUsage.sort((a,b) => b.count - a.count).map(usage => (
                                    <tr key={usage.userId}>
                                        <td className="p-2 text-gray-300">{usage.name} <span className="text-gray-500 text-xs">({usage.userId})</span></td>
                                        <td className="p-2 text-right text-white font-mono">{usage.count}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="p-4 text-center text-gray-500">No user-specific usage recorded today.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default AiManagement;
// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
// ===================================================================================
