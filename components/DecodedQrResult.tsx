import React from 'react';
import { parseQrData } from '../utils/qrParser';

interface DecodedQrResultProps {
    data: string;
}

const DetailRow: React.FC<{ label: string, value: React.ReactNode }> = ({ label, value }) => (
    <div className="py-2 border-b border-white/10 text-left">
        <p className="text-xs font-semibold text-gray-500 uppercase">{label}</p>
        <p className="text-gray-200 break-words">{value || <span className="italic text-gray-600">Not provided</span>}</p>
    </div>
);

const DecodedQrResult: React.FC<DecodedQrResultProps> = ({ data }) => {
    const parsedData = parseQrData(data);

    if (!parsedData) {
        return (
            <div className="mt-4 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-center">
                <p className="font-semibold text-yellow-300">Could Not Decode</p>
                <p className="text-sm text-yellow-400">The data is not in a standard format we can recognize.</p>
            </div>
        );
    }
    
    return (
        <div className="mt-4 p-4 bg-black/30 border border-brand-secondary/30 rounded-lg animate-fade-in">
            <h4 className="font-bold text-lg text-brand-secondary mb-2 text-center">{parsedData.type} Details</h4>
            <div className="space-y-2">
                {Object.entries(parsedData.details).map(([key, value]) => (
                    <DetailRow key={key} label={key} value={value} />
                ))}
            </div>
        </div>
    );
};

export default DecodedQrResult;