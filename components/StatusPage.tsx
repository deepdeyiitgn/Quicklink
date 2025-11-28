import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../contexts/AuthContext';
import { UrlContext } from '../contexts/UrlContext';
import { LoadingIcon } from './icons/IconComponents';
import { api } from '../api';
import type { AiUsageStats } from '../types';

interface ServiceStatus {
    db: { status: 'ok' | 'error'; message: string; dbName: string; };
    auth: { status: 'ok' | 'error'; message: string; };
    urls: { status: 'ok' | 'error'; message: string; };
    payments: { status: 'ok' | 'degraded'; message: string; };
    system?: { 
        ip: string;
        cpu: number;
        memory: number;
        ping: number;
    };
}

const StatCard: React.FC<{ title: string; value: string | number; description: string; }> = ({ title, value, description }) => (
    <div className="bg-black/30 p-6 rounded-xl border border-white/10 transition-all duration-300 hover:bg-black/40">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-4xl font-bold text-brand-primary mt-2">{value.toLocaleString()}</p>
        <p className="text-gray-500 text-xs mt-1">{description}</p>
    </div>
);

const StatusIndicator: React.FC<{ label: string; status: 'Operational' | 'Degraded' | 'Offline' }> = ({ label, status }) => {
    const color = status === 'Operational' ? 'bg-green-500' : status === 'Degraded' ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg border border-white/10">
            <span className="text-gray-300">{label}</span>
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color} animate-pulse`}></div>
                <span className={`${color.replace('bg-', 'text-')}`}>{status}</span>
            </div>
        </div>
    )
};

const StatusPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const urlContext = useContext(UrlContext);

    const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
    const [aiStats, setAiStats] = useState<Pick<AiUsageStats, 'dailyRequestCount' | 'minuteRequestCount'> | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false); // To show small indicator

    // 🔄 Function to Fetch Data (Reusable)
// 🔄 Function to Fetch Data (Updated for REAL PING)
    const fetchData = async (silent = false) => {
        if (!silent) setIsRefreshing(true);
        try {
            // ⏱️ STOPWATCH START
            const startTime = Date.now();

            const statusData = await api.getSystemStatus();
            const aiData = await api.getPublicAiStatus();

            // ⏱️ STOPWATCH END
            const endTime = Date.now();
            
            // 🧮 Calculate Real Network Ping
            const realNetworkPing = endTime - startTime;

            // 🔄 Override the server "processing time" with "real network ping"
            if (statusData && statusData.system) {
                statusData.system.ping = realNetworkPing;
            }

            setServiceStatus(statusData as ServiceStatus);
            setAiStats(aiData);
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            if (!silent) setIsRefreshing(false);
        }
    };

    useEffect(() => {
        // 1. Initial Load (Turant dikhao)
        fetchData();

        // 2. Smart Polling Logic
        const intervalId = setInterval(() => {
            // 🛑 MAGIC LINE: Agar user tab par nahi hai, toh request MAT bhejo
            if (document.visibilityState === 'hidden') {
                return; 
            }
            
            // Agar user dekh raha hai, tabhi update karo
            fetchData(true); 
        }, 30000); // 🕒 Change 10000 (10s) to 30000 (30s) - Battery & Server Saver!

        // Cleanup
        return () => clearInterval(intervalId);
    }, []);

    if (urlContext?.loading || !serviceStatus) {
         return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-white p-4">
                <LoadingIcon className="h-12 w-12 animate-spin text-brand-primary mb-4" />
                <p className="text-xl">Loading System Status...</p>
            </div>
        );
    }

     // 🔴 PURANA (Bug wala):
    // const allSystemsOperational = Object.values(serviceStatus).every(s => (s as { status: string }).status === 'ok');

    // 🟢 NAYA (Fixed):
    // Hum explicitly check karenge ki sirf services 'ok' hain ya nahi.
    const allSystemsOperational = 
        serviceStatus.db.status === 'ok' && 
        serviceStatus.auth.status === 'ok' && 
        serviceStatus.urls.status === 'ok' && 
        serviceStatus.payments.status === 'ok';
    const dbStatus = serviceStatus.db;
    
    const dbServiceStatus = dbStatus.status === 'ok' ? 'Operational' : 'Offline';
    const authServiceStatus = serviceStatus.auth.status === 'ok' ? 'Operational' : 'Offline';
    const urlServiceStatus = serviceStatus.urls.status === 'ok' ? 'Operational' : 'Offline';
    const paymentServiceStatus = serviceStatus.payments.status === 'ok' ? 'Operational' : 'Degraded';

    const dailyAiLimit = 800;
    const dailyAiUsage = aiStats?.dailyRequestCount || 0;
    const aiUsagePercentage = Math.min((dailyAiUsage / dailyAiLimit) * 100, 100);

    // Color Logics
    let aiBarColor = 'bg-blue-500';
    if (aiUsagePercentage >= 100) aiBarColor = 'bg-red-500';
    else if (aiUsagePercentage >= 80) aiBarColor = 'bg-yellow-500';
    else if (aiUsagePercentage >= 50) aiBarColor = 'bg-green-500';

    const pingValue = serviceStatus.system?.ping || 0;
    let pingColorClass = 'text-brand-primary';
    if (pingValue < 50) pingColorClass = 'text-blue-400';
    else if (pingValue < 150) pingColorClass = 'text-green-400';
    else if (pingValue < 300) pingColorClass = 'text-yellow-400';
    else pingColorClass = 'text-red-400';

    return (
        <>
            <Helmet>
                <title>System Status | QuickLink</title>
                <meta name="description" content="Live operational status of QuickLink services." />
            </Helmet>
            
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in space-y-8 relative overflow-hidden">
                
                {/* 🟢 Live Indicator Badge (Top Right) */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">
                        Live Updating {isRefreshing && '...'}
                    </span>
                </div>

                {/* User IP Container */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl backdrop-blur-sm mt-4">
                    <div className="flex items-center gap-3 mb-2 md:mb-0">
                        <div className="p-2 bg-blue-500/20 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-gray-300 text-sm font-medium">Your Connection IP</h3>
                            <p className="text-white font-mono text-lg font-bold tracking-wide">{serviceStatus.system?.ip || 'Detecting...'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-green-400 text-xs uppercase font-bold tracking-wider">Connected securely</span>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white">System Status</h2>
                    <p className="text-gray-400 mt-2">Live metrics and operational status of all QuickLink services.</p>
                </div>

                {/* Overall Status */}
                 <div className={`p-4 rounded-lg text-center transition-colors duration-500 ${allSystemsOperational ? 'bg-green-900/30 border border-green-500/50' : 'bg-yellow-900/30 border border-yellow-500/50'}`}>
                     <p className={`font-semibold text-lg ${allSystemsOperational ? 'text-green-300' : 'text-yellow-300'}`}>
                        {allSystemsOperational ? 'All Systems Operational' : 'Some Systems are Experiencing Issues'}
                     </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard title="Total Links Created" value={urlContext?.allUrls.length || 0} description="Includes active and expired links." />
                    <StatCard title="Active Links" value={urlContext?.activeUrls.length || 0} description="Currently redirecting." />
                    <StatCard title="Total Users" value={auth?.users.length || 0} description="Registered users in the system." />
                </div>
                
                 {/* AI Service Status */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">AI Service Status</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <StatCard title="Daily AI Requests" value={`${dailyAiUsage.toLocaleString()} / ${dailyAiLimit.toLocaleString()}`} description="Resets every 24 hours." />
                        <div className="bg-black/30 p-6 rounded-xl border border-white/10 flex flex-col justify-center">
                            <h3 className="text-gray-400 text-sm font-medium">Daily Usage Bar</h3>
                            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2 overflow-hidden">
                                <div className={`${aiBarColor} h-2.5 rounded-full transition-all duration-1000 ease-in-out`} style={{ width: `${aiUsagePercentage}%` }}></div>
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                                <span>0%</span>
                                <span>50%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Server Infrastructure Health */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Server Infrastructure Health</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Ping / Latency */}
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center transition-all hover:bg-black/50">
                            <span className="text-gray-400 text-xs uppercase mb-1">Server Latency</span>
                            <span className={`text-2xl font-bold font-mono transition-colors duration-500 ${pingColorClass}`}>
                                {serviceStatus.system?.ping || 0} ms
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1">Real-time Ping</span>
                        </div>

                        {/* RAM / Memory */}
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                            <span className="text-gray-400 text-xs uppercase mb-1">Memory Usage</span>
                            <span className="text-2xl font-bold text-purple-400 font-mono">
                                {serviceStatus.system?.memory || 0} MB
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1">Process Heap</span>
                        </div>

                        {/* CPU Load */}
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                            <span className="text-gray-400 text-xs uppercase mb-1">CPU Load</span>
                            <span className="text-2xl font-bold text-cyan-400 font-mono">
                                {(serviceStatus.system?.cpu || 0).toFixed(2)}%
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1">System Load Avg</span>
                        </div>

                        {/* ROM / Storage */}
                        <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center">
                            <span className="text-gray-400 text-xs uppercase mb-1">ROM / Storage</span>
                            <span className="text-2xl font-bold text-green-400 font-mono">
                                OK
                            </span>
                            <span className="text-[10px] text-gray-500 mt-1">Ephemeral Status</span>
                        </div>
                    </div>
                </div>

                {/* Service Breakdown */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Service Breakdown</h3>
                    <div className="space-y-3">
                        <StatusIndicator label="Database Connection" status={dbServiceStatus} />
                         {dbStatus.status === 'error' && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm">
                                <p className="font-bold text-red-300">Database Error Details:</p>
                                <p className="text-red-400 mt-1">Attempted to connect to database: <code className="font-mono bg-black/30 p-1 rounded">{dbStatus.dbName}</code></p>
                                <p className="text-red-400 mt-1 break-all">Error: <span className="font-mono">{dbStatus.message}</span></p>
                            </div>
                        )}
                        <StatusIndicator label="User Authentication" status={authServiceStatus} />
                        <StatusIndicator label="URL Shortening & Redirection" status={urlServiceStatus} />
                        <StatusIndicator label="Payment Gateway" status={paymentServiceStatus} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StatusPage;
