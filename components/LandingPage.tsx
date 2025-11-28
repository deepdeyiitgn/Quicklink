import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { LinkIcon, QrCodeScannerIcon, QrGeneratorIcon } from './icons/IconComponents';
import AdComponent from './AdComponent';

// ✨ 1. YE RAHA CUSTOM COUNTER COMPONENT (Isko delete mat karna!)
const AnimatedCounter = ({ end, duration, label }: { end: number, duration: number, label: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Run only once
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function for smooth effect (Ease Out Quart)
            const ease = 1 - Math.pow(1 - percentage, 4);
            
            setCount(Math.floor(end * ease));

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return (
        <div ref={countRef} className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all transform hover:scale-105 duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)] min-w-[250px]">
            <div className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400 mb-2">
                {count.toLocaleString()}+
            </div>
            <div className="text-gray-300 font-medium text-lg tracking-wide uppercase">{label}</div>
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.FC<any>; title: string; children: React.ReactNode }> = ({ icon: Icon, title, children }) => (
    <div className="glass-card p-6 rounded-2xl text-center flex flex-col items-center">
        <Icon className="h-12 w-12 text-brand-secondary mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{children}</p>
    </div>
);

const LandingPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>QuickLink - Fast & Secure URL Shortener, QR Generator & API by Deep Dey</title>
                <meta name="description" content="QuickLink is a fast, secure, and developer-friendly platform for URL shortening and QR code generation. Use our powerful API to integrate link shortening into your apps and websites. Designed by Deep Dey for simplicity, performance, and reliability." />
                <meta name="keywords" content="url shortener, qr generator, qr scanner, short link api, quicklink, free url shortener, fast link shortener, deep dey, link management, qr code maker, api url shortener, bitly alternative, best url shortener, url shortener for developers, secure short links, shorten url online, qr generator api, shorturl, qlynk, deep dey jee, deep dey, deep dey official" />
            </Helmet>
            <div className="space-y-24">
                {/* Hero Section */}
                <div className="text-center pt-16 pb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-down">
                        Shorten URLs, Create QR Codes, <span className="animate-aurora">Share Instantly</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 animate-fade-in-up">
                        The ultimate all-in-one platform for creating short, custom links and dynamic QR codes. Fast, free, and powerful.
                    </p>
                    <Link to="/pricing" className="inline-block px-10 py-4 bg-brand-primary text-brand-dark text-lg font-semibold rounded-lg hover:bg-brand-primary/80 transition-all transform hover:scale-105 shadow-[0_0_20px_#00e5ff]">
                        Get Started for Free
                    </Link>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon={LinkIcon} title="Powerful URL Shortener">
                        Transform long, ugly links into short, memorable URLs. Use custom aliases to brand your links and make them stand out.
                    </FeatureCard>
                    <FeatureCard icon={QrGeneratorIcon} title="Versatile QR Generator">
                        Create QR codes for anything: websites, Wi-Fi, vCards, events, and more. Customize them with colors and your logo.
                    </FeatureCard>
                    <FeatureCard icon={QrCodeScannerIcon} title="Instant QR Scanner">
                        Scan any QR code on the fly using your device's camera or by uploading an image. No app needed—it works right in your browser.
                    </FeatureCard>
                </div>
                
                {/* Ad Section */}
                <div className="my-16">
                     <AdComponent type="multiplex" />
                </div>

                {/* Call to Action */}
                <div className="glass-card p-10 rounded-2xl text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Elevate Your Links?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-8">
                        Join thousands of users who trust QuickLink to manage their digital presence. Sign up for a free account to get started.
                    </p>
                     <Link to="/tools" className="inline-block px-8 py-3 bg-brand-secondary text-white text-lg font-semibold rounded-lg hover:bg-brand-secondary/80 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(132,108,255,0.6)]">
                        Explore All Tools
                    </Link>

                     {/* 🟢 CUSTOM STATS COUNTER - Ab ye chalega! */}
                    <div className="mt-16 flex flex-wrap justify-center gap-8">
                       <AnimatedCounter end={5500} duration={5000} label="Total Links Created, Join Today!" />
                    </div>

                    <div className="text-center pt-16 pb-8">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-down">
                            ~ By <span className="animate-aurora">Deep Dey </span> 🩷.
                        </h2>                  
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default LandingPage;
