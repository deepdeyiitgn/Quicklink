import React, { useEffect, useState, useContext, useRef } from 'react';
import { LinkIcon, CameraIcon, UploadIcon, LoadingIcon } from './icons/IconComponents';
import { QrContext } from '../contexts/QrContext';
import { AuthContext } from '../contexts/AuthContext';
import DecodedQrResult from './DecodedQrResult';

declare const Html5Qrcode: any;
declare const jsQR: (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null;

const QrCodeScanner: React.FC = () => {
    const qrContext = useContext(QrContext);
    const auth = useContext(AuthContext);
    
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isFileProcessing, setIsFileProcessing] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [showFallbackModal, setShowFallbackModal] = useState(false);
    const [failedFile, setFailedFile] = useState<File | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const html5QrCode = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const stopScanner = async () => {
        if (html5QrCode.current && html5QrCode.current.isScanning) {
            try {
                await html5QrCode.current.stop();
                html5QrCode.current.clear();
            } catch (err) {
                console.error("Failed to stop scanner gracefully:", err);
            }
        }
        html5QrCode.current = null;
        setIsScanning(false);
    };

    const onScanSuccess = (decodedText: string) => {
        setScanResult(decodedText);
        setShowDetails(false); // Reset details view on new scan
        qrContext?.addScan({
            userId: auth?.currentUser?.id || null,
            content: decodedText
        });
        stopScanner();
        setIsFileProcessing(false);
    };

    const processFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setScanError('Please drop an image file.');
            return;
        }
        setIsFileProcessing(true);
        setScanError(null);
        setScanResult(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

        try {
            const fileScanner = new Html5Qrcode("reader-file", { verbose: false });
            const decodedText = await fileScanner.scanFile(file, false);
            onScanSuccess(decodedText);
        } catch (err) {
            console.warn("Primary scanner (html5-qrcode) failed, trying secondary client-side scanner (jsQR)...");
            tryJsqrScan(file);
        }
    };

    // ✨ UPDATED: Simple & Robust Camera Logic
    const startScanner = () => {
        if (isScanning) return;

        setScanError(null);
        setScanResult(null);
        setIsScanning(true);

        // Small timeout ensures the DOM element 'reader' is rendered
        setTimeout(() => {
            const html5QrCodeScanner = new Html5Qrcode("reader");
            html5QrCode.current = html5QrCodeScanner;

            const config = { 
                fps: 10, 
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0 
            };

            // "environment" forces back camera on mobile
            html5QrCodeScanner.start(
                { facingMode: "environment" }, 
                config, 
                onScanSuccess, 
                (errorMessage: any) => {
                    // Scanning fails frame by frame, which is normal. Do nothing here.
                }
            ).catch((err: any) => {
                console.error("Error starting scanner", err);
                let errorMessage = 'Unable to access camera.';
                if (err.name === 'NotAllowedError') errorMessage = 'Camera permission denied.';
                else if (err.name === 'NotFoundError') errorMessage = 'No camera found.';
                else if (err.name === 'NotReadableError') errorMessage = 'Camera is in use by another app.';
                
                setScanError(errorMessage);
                setIsScanning(false);
            });
        }, 100);
    };

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (html5QrCode.current) {
                if (html5QrCode.current.isScanning) {
                    html5QrCode.current.stop().catch((e: any) => console.error(e));
                }
                html5QrCode.current.clear();
            }
        };
    }, []);

    const tryJsqrScan = (file: File) => {
        const reader = new FileReader();
        const triggerExternalFallback = () => {
            setFailedFile(file);
            setShowFallbackModal(true);
            setIsFileProcessing(false);
        };

        reader.onload = (e) => {
            if (!e.target?.result) {
                triggerExternalFallback();
                return;
            }
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current;
                if (!canvas) { triggerExternalFallback(); return; }
                const ctx = canvas.getContext('2d');
                if (!ctx) { triggerExternalFallback(); return; }

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                
                try {
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code && code.data) {
                        onScanSuccess(code.data);
                    } else {
                        triggerExternalFallback();
                    }
                } catch (jsqrError) {
                    console.error("jsQR error:", jsqrError);
                    triggerExternalFallback();
                }
            };
            img.onerror = triggerExternalFallback;
            img.src = e.target.result as string;
        };
        reader.onerror = triggerExternalFallback;
        reader.readAsDataURL(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            processFile(event.target.files[0]);
        }
    };

    const handleFallbackScan = async () => {
        if (!failedFile) return;

        setShowFallbackModal(false);
        setIsFileProcessing(true);
        setScanError(null);

        const formData = new FormData();
        formData.append('file', failedFile);

        try {
            const response = await fetch('https://api.qrserver.com/v1/read-qr-code/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            const data = await response.json();
            const decodedText = data[0]?.symbol[0]?.data;

            if (decodedText) {
                onScanSuccess(decodedText);
            } else {
                throw new Error("API could not decode the QR code.");
            }
        } catch (err) {
            setScanError("We're sorry, but both our scanner and our partner's scanner were unable to read this QR code. Please try with a clearer image.");
        } finally {
            setIsFileProcessing(false);
            setFailedFile(null);
        }
    };

    const resetScanner = () => {
        stopScanner();
        setScanResult(null);
        setScanError(null);
        setShowDetails(false);
    };

    const isUrl = (text: string): boolean => {
        try {
            new URL(text);
            return text.startsWith('http://') || text.startsWith('https://');
        } catch (_) {
            return false;
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!isScanning && !scanResult && !isFileProcessing) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (isScanning || scanResult || isFileProcessing) return;

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const FallbackModal = () => (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="relative w-full max-w-lg glass-card rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Scan Failed</h3>
                <p className="text-gray-300 mb-6">
                    Our built-in scanners couldn't read this QR code. Would you like to try again using our powerful third-party scanning partner, <code className="bg-black/30 p-1 rounded text-brand-secondary">api.qrserver.com</code>?
                    <br />
                    <span className="text-xs text-gray-500">Your image will be sent to their server for processing.</span>
                </p>
                <div className="flex gap-4 justify-center">
                    <button 
                        onClick={() => { setShowFallbackModal(false); setFailedFile(null); }}
                        className="px-6 py-2 text-sm font-semibold text-white bg-white/10 rounded-md hover:bg-white/20"
                    >
                        No, Thanks
                    </button>
                    <button 
                        onClick={handleFallbackScan}
                        className="px-6 py-2 text-sm font-semibold text-brand-dark bg-brand-primary rounded-md hover:bg-brand-primary/80"
                    >
                        Yes, Try Again
                    </button>
                </div>
            </div>
        </div>
    );
    
    if (scanResult) {
        return (
            <div className="text-center animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Scan Successful!</h3>
                <div className="p-4 bg-black/30 border border-brand-primary/30 rounded-lg">
                    <p className="font-mono text-brand-light break-all mb-4">{scanResult}</p>
                    <div className="flex justify-center items-center gap-4">
                        {isUrl(scanResult) && (
                            <a href={scanResult} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80 transition-all">
                                <LinkIcon className="h-4 w-4" />
                                Open Link
                            </a>
                        )}
                        <button onClick={() => setShowDetails(true)} className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors">
                            View Details
                        </button>
                    </div>
                </div>

                {showDetails && <DecodedQrResult data={scanResult} />}

                <button onClick={resetScanner} className="mt-6 text-brand-primary hover:underline">Scan another code</button>
            </div>
        );
    }
    
    return (
        <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`mt-6 transition-all duration-300 p-2 rounded-lg ${isDragging ? 'bg-brand-primary/20 border-2 border-dashed border-brand-primary' : 'border-2 border-transparent'}`}
        >
            {showFallbackModal && <FallbackModal />}

            {isScanning ? (
                 <div className="animate-fade-in">
                    <div className="w-full max-w-sm mx-auto">
                        <div id="reader" className="bg-brand-dark rounded-lg overflow-hidden border-2 border-dashed border-white/20"></div>
                        <p className="text-xs text-gray-500 text-center mt-2">Point your camera at a QR code</p>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={stopScanner} className="text-gray-400 hover:text-white">Cancel</button>
                    </div>
                </div>
            ) : isFileProcessing ? (
                 <div className="text-center animate-fade-in flex flex-col items-center justify-center h-48">
                    <LoadingIcon className="h-8 w-8 animate-spin text-brand-primary" />
                    <p className="mt-4 text-gray-400">Processing image... ~a scanner by <span className="font-semibold text-gray-300">Deep Dey 🩷</span></p>
                </div>
            ) : (
                 <div className="text-center animate-fade-in min-h-[200px] flex flex-col justify-center">
                    {isDragging ? (
                        <div className="flex flex-col items-center justify-center h-48 pointer-events-none">
                            <UploadIcon className="h-12 w-12 text-brand-primary animate-bounce" />
                            <p className="mt-4 text-white font-semibold text-lg">Drop your image here to scan ~a scanner by <span className="font-semibold text-gray-300">Deep Dey 🩷</span></p>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-400 mb-6 max-w-lg mx-auto">Our powerful scanner can read even damaged or low-quality QR codes. <span className="font-semibold text-gray-300">Drag & drop</span> an image file here or use the buttons below.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button onClick={startScanner} className="flex-1 inline-flex items-center justify-center gap-3 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-dark shadow-[0_0_10px_#00e5ff] hover:bg-brand-primary/80 transition-all">
                                    <CameraIcon className="h-6 w-6" />
                                    Use Camera
                                </button>
                                <button onClick={() => fileInputRef.current?.click()} className="flex-1 inline-flex items-center justify-center gap-3 rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition-all">
                                    <UploadIcon className="h-6 w-6" />
                                    Upload Image
                                </button>
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                            </div>
                            {scanError && <p className="mt-4 text-sm text-red-400">{scanError}</p>}
                        </>
                    )}
                </div>
            )}
            
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div id="reader-file" className="hidden"></div>
        </div>
    );
};

export default QrCodeScanner;
