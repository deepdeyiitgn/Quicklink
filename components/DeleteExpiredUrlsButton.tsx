import React, { useState, useContext, useEffect } from 'react';
import { UrlContext } from '../contexts/UrlContext';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import { LoadingIcon, TrashIcon, CheckIcon } from './icons/IconComponents';

const DeleteExpiredUrlsButton: React.FC = () => {
    const urlContext = useContext(UrlContext);
    const auth = useContext(AuthContext);
    const [status, setStatus] = useState<'idle' | 'confirm' | 'deleting' | 'done'>('idle');
    const [result, setResult] = useState<{ deletedCount: number; sizeFreed: number } | null>(null);
    const [progress, setProgress] = useState(0);

    const expiredCount = urlContext?.expiredUrls.length || 0;

    useEffect(() => {
        let timer: number;
        if (status === 'deleting') {
            setProgress(0);
            // Simulate progress while waiting for the API call
            timer = window.setInterval(() => {
                setProgress(p => (p < 95 ? p + 5 : p));
            }, 200);
        }
        return () => clearInterval(timer);
    }, [status]);

    const handleDelete = async () => {
        if (!auth?.currentUser?.isAdmin || !urlContext) return;
        setStatus('deleting');
        try {
            const res = await api.deleteExpiredUrls(auth.currentUser.id);
            setResult(res);
            setProgress(100);
            setTimeout(() => {
                setStatus('done');
                urlContext.refreshUrls(); // Refresh context data
            }, 500);
        } catch (error) {
            console.error(error);
            alert('Failed to delete expired URLs.');
            setStatus('idle');
        }
    };

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            <button
                onClick={() => setStatus('confirm')}
                disabled={expiredCount === 0}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <TrashIcon className="h-5 w-5" />
                Delete All Expired URLs ({expiredCount})
            </button>

            {(status === 'confirm' || status === 'deleting' || status === 'done') && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative w-full max-w-md glass-card rounded-2xl p-8 text-center">
                        {status === 'confirm' && (
                            <>
                                <h3 className="text-xl font-bold text-white">Are you sure?</h3>
                                <p className="text-gray-400 my-4">
                                    You are about to permanently delete <span className="font-bold text-red-400">{expiredCount}</span> expired links. This action cannot be undone.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <button onClick={() => setStatus('idle')} className="px-6 py-2 bg-white/10 rounded-md">Cancel</button>
                                    <button onClick={handleDelete} className="px-6 py-2 bg-red-600 text-white rounded-md">Confirm & Delete</button>
                                </div>
                            </>
                        )}
                        {status === 'deleting' && (
                            <>
                                <LoadingIcon className="h-10 w-10 mx-auto text-brand-primary animate-spin" />
                                <h3 className="text-xl font-bold text-white mt-4">Deleting Expired Links...</h3>
                                <p className="text-gray-400 my-2">Processing {expiredCount.toLocaleString()} links.</p>
                                <div className="w-full bg-black/30 rounded-full h-2.5 mt-4">
                                    <div className="bg-brand-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                                </div>
                            </>
                        )}
                        {status === 'done' && (
                            <>
                                <CheckIcon className="h-12 w-12 mx-auto text-green-400" />
                                <h3 className="text-xl font-bold text-white mt-4">Deletion Complete</h3>
                                <p className="text-gray-300 my-2">
                                    Successfully deleted <span className="font-bold text-green-400">{result?.deletedCount.toLocaleString() || 0}</span> links.
                                </p>
                                <p className="text-sm text-gray-500">
                                    Estimated space freed: {formatBytes(result?.sizeFreed || 0)}
                                </p>
                                <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 bg-brand-primary text-brand-dark rounded-md">Close</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteExpiredUrlsButton;