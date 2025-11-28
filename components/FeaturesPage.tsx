import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { LinkIcon, QrCodeScannerIcon, QrGeneratorIcon, ShieldCheckIcon, BellIcon, LayoutDashboardIcon, NewspaperIcon, ShoppingCartIcon, ChatBubbleIcon, LifeBuoyIcon, ServerIcon, UserIcon, LightbulbIcon, SparklesIcon } from './icons/IconComponents';

const features = [
    {
        title: "URL Shortener",
        description: "Transform long URLs into short, memorable, and trackable links. Perfect for sharing on social media, in emails, or anywhere space is limited.",
        icon: LinkIcon,
        link: "/features/url-shortener"
    },
    {
        title: "QR Code Generator",
        description: "Create custom QR codes for websites, Wi-Fi access, contact cards, and more. Customize with colors and logos to match your brand identity.",
        icon: QrGeneratorIcon,
        link: "/features/qr-generator"
    },
    {
        title: "QR Code Scanner",
        description: "Instantly scan any QR code using your device's camera or by uploading an image. No app installation required—it works directly in your browser.",
        icon: QrCodeScannerIcon,
        link: "/features/qr-scanner"
    },
    {
        title: "Developer API",
        description: "Integrate QuickLink's powerful link shortening capabilities directly into your applications with our simple and robust REST API.",
        icon: ShieldCheckIcon,
        link: "/features/api"
    },
     {
        title: "User & Admin Dashboards",
        description: "Manage your links, view history, and control your account settings from a clean, intuitive dashboard. Admins get powerful site-wide management tools.",
        icon: LayoutDashboardIcon,
        link: "/features/dashboard"
    },
    {
        title: "QuickLink AI",
        description: "Your smart assistant, powered by Google Gemini, to answer questions and help you create support tickets efficiently.",
        icon: SparklesIcon,
        link: "/features/ai-assistant"
    },
    {
        title: "Notification System",
        description: "Stay updated with important announcements, security alerts, and replies to your support tickets through our integrated notification system.",
        icon: BellIcon,
        link: "/features/notifications"
    },
    {
        title: "Community Blog",
        description: "A user-driven platform for sharing stories, updates, and tutorials. Engage with the community by liking, commenting, and creating your own posts.",
        icon: NewspaperIcon,
        link: "/features/community-blog"
    },
    {
        title: "Shop & Subscriptions",
        description: "Unlock premium benefits like longer link expiry and more credits through one-time payments. Manage your purchases and apply coupons.",
        icon: ShoppingCartIcon,
        link: "/features/shop"
    },
    {
        title: "QuickChat",
        description: "A private, request-based messaging system to connect with other QuickLink users securely. Features admin moderation and content filtering.",
        icon: ChatBubbleIcon,
        link: "/features/chat"
    },
    {
        title: "2FA Security",
        description: "Protect your account with an extra layer of security using Time-based One-Time Passwords (TOTP) from your favorite authenticator app.",
        icon: ShieldCheckIcon,
        link: "/features/security"
    },
    {
        title: "Support Ticket System",
        description: "Get help when you need it. Create, manage, and track your support requests directly from your dashboard for a streamlined experience.",
        icon: LifeBuoyIcon,
        link: "/features/support-system"
    },
    {
        title: "System Status",
        description: "View the live operational status of all QuickLink services, including database, authentication, and payments, for full transparency.",
        icon: ServerIcon,
        link: "/features/system-status"
    },
    {
        title: "About the Founder",
        description: "Learn about the story of Deep Dey, the student developer behind QuickLink, and the vision that drives the project.",
        icon: UserIcon,
        link: "/features/founder"
    },
    {
        title: "Our Vision",
        description: "Discover the mission and philosophy of QuickLink—to make information sharing seamless, secure, and efficient for everyone.",
        icon: LightbulbIcon,
        link: "/features/our-vision"
    },
];

const FeatureCard: React.FC<{ feature: typeof features[0] }> = ({ feature }) => (
    <Link to={feature.link} className="block group glass-card p-8 rounded-2xl hover:-translate-y-2 hover:border-brand-primary transition-all duration-300">
        <feature.icon className="h-12 w-12 text-brand-primary mb-4 transition-colors group-hover:text-brand-secondary" />
        <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
        <span className="inline-block mt-4 font-semibold text-brand-secondary group-hover:text-brand-primary">Learn More &rarr;</span>
    </Link>
);


const FeaturesPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Features | QuickLink</title>
                <meta name="description" content="Explore all the powerful features of QuickLink, including our advanced URL shortener, custom QR code generator, browser-based scanner, and developer API." />
                <meta name="keywords" content="quicklink features, url shortener features, qr code features, developer api" />
            </Helmet>
             <div className="space-y-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-aurora">Powerful Features</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Everything you need to create, share, and manage your digital content efficiently.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <FeatureCard key={feature.link} feature={feature} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FeaturesPage;
