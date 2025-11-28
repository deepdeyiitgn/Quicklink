// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   🛡️ Helper: Google Gemini & ChatGPT
//   🌐 WEBSITE: https://qlynk.vercel.app
//   📅 CREATED: 2025
//   🧠 DESCRIPTION:
//       QuickLink is a secure, high-performance web application designed for 
//       shortening URLs, generating QR codes, and providing developers with 
//       easy-to-integrate API services. Built with simplicity, reliability, 
//       and speed in mind by Deep Dey.
//
//   ⚙️ TECHNOLOGY STACK:
//       - HTML, CSS, TypeScript
//       - Node.js / Express (Backend)
//       - Vercel (Deployment)
//       - JSON API Integration
//
//   📩 CONTACT:
//       ✉️ Email: thedeeparise@gmail.com
//       🔗 GitHub: https://github.com/deepdeyiitgn/QuickLink
//       🧾 License: All Rights Reserved © 2025 Deep Dey
//       💬 Instagram: https://www.instagram.com/deepdey.official/
//
//   ⚠️ LEGAL NOTICE:
//       This source code is the intellectual property of Deep Dey. 
//       Any unauthorized copying, modification, distribution, or use of 
//       this project in whole or in part without written permission is 
//       strictly prohibited and may result in legal action.
//
// ===================================================================================

// Component Imports Start Here
import CustomCursor from './components/CustomCursor';
import React, { Suspense, lazy, useContext, useState, useEffect } from 'react';
// FIX: Corrected import from "react-router-dom" to resolve module export errors by changing single quotes to double quotes.
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// Component Imports End Here

// Context Provider Imports Start Here
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { UrlProvider } from './contexts/UrlContext';
import { QrProvider } from './contexts/QrContext';
import { BlogProvider } from './contexts/BlogContext';
import { IKContext } from 'imagekitio-react';
// Context Provider Imports End Here

// Standard Component Imports Start Here
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import SubscriptionModal from './components/SubscriptionModal';
import ApiSubscriptionModal from './components/ApiSubscriptionModal';
import FullScreenLoader from './components/FullScreenLoader';
import MobileNavButton from './components/MobileNavButton';
import BackToTopButton from './components/BackToTopButton';
import UserDetailsFetcher from './components/UserDetailsFetcher';
import AdBlockerModal from './components/AdBlockerModal';
import NotificationPermissionPrompt from './components/NotificationPermissionPrompt';
import { WarningIcon } from './components/icons/IconComponents';
import TwoFactorAuthModal from './components/TwoFactorAuthModal';
import QuickLinkAI from './components/QuickLinkAI';
// Standard Component Imports End Here

// Lazy Loaded Page Imports Start Here
// Lazy load pages for better performance
const LandingPage = lazy(() => import('./components/LandingPage'));
const ToolSelectionPage = lazy(() => import('./components/ToolSelectionPage'));
const ShortenerPage = lazy(() => import('./components/ShortenerPage'));
const QrGeneratorPage = lazy(() => import('./components/QrGeneratorPage'));
const ScannerPage = lazy(() => import('./components/ScannerPage'));
const ApiAccessPage = lazy(() => import('./components/ApiAccessPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./components/TermsPage'));
const CancellationPolicyPage = lazy(() => import('./components/CancellationPolicyPage'));
const CookiesPolicyPage = lazy(() => import('./components/CookiesPolicyPage'));
const StatusPage = lazy(() => import('./components/StatusPage'));
const FaqPage = lazy(() => import('./components/FaqPage'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const RedirectPage = lazy(() => import('./components/RedirectPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const BlogCreatePage = lazy(() => import('./components/BlogCreatePage'));
const BlogPostPageWrapper = lazy(() => import('./components/BlogPostPage'));
const DonationPage = lazy(() => import('./components/DonationPage'));
const NotificationsPage = lazy(() => import('./components/NotificationsPage'));
const ShopPage = lazy(() => import('./components/ShopPage'));
const AdComponent = lazy(() => import('./components/AdComponent'));
const ResetPasswordPage = lazy(() => import('./components/ResetPasswordPage'));
const EmailVerificationPage = lazy(() => import('./components/EmailVerificationPage'));
const CopyrightPage = lazy(() => import('./components/CopyrightPage'));
const LinkHistory = lazy(() => import('./components/LinkHistory'));
const WikiPage = lazy(() => import('./components/Wiki'));
const LegalPage = lazy(() => import('./components/Legal'));
const GreetingPopup = lazy(() => import('./components/GreetingPopup'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const FeaturesPage = lazy(() => import('./components/FeaturesPage'));
const ShortenerFeaturePage = lazy(() => import('./components/features/ShortenerFeaturePage'));
const QrGeneratorFeaturePage = lazy(() => import('./components/features/QrGeneratorFeaturePage'));
const QrScannerFeaturePage = lazy(() => import('./components/features/QrScannerFeaturePage'));
const ApiFeaturePage = lazy(() => import('./components/features/ApiFeaturePage'));
const DashboardFeaturePage = lazy(() => import('./components/features/DashboardFeaturePage'));
const NotificationsFeaturePage = lazy(() => import('./components/features/NotificationsFeaturePage'));
const ChatPage = lazy(() => import('./components/chat/ChatPage'));
const BlogFeaturePage = lazy(() => import('./components/features/BlogFeaturePage'));
const ShopFeaturePage = lazy(() => import('./components/features/ShopFeaturePage'));
const ChatFeaturePage = lazy(() => import('./components/features/ChatFeaturePage'));
const SecurityFeaturePage = lazy(() => import('./components/features/SecurityFeaturePage'));
const SupportFeaturePage = lazy(() => import('./components/features/SupportFeaturePage'));
const StatusFeaturePage = lazy(() => import('./components/features/StatusFeaturePage'));
const FounderFeaturePage = lazy(() => import('./components/features/FounderFeaturePage'));
const VisionFeaturePage = lazy(() => import('./components/features/VisionFeaturePage'));
const AiFeaturePage = lazy(() => import('./components/features/AiFeaturePage'));
const ThankYouPage = lazy(() => import('./components/ThankYou'));
const DeepLinkHubPage = lazy(() => import('./components/DeepLinkHub'));
// Lazy Loaded Page Imports End Here

// Blocked User Modal Component
const BlockedUserModal: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
    <div className="fixed inset-0 bg-red-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 text-center">
      <div className="w-full max-w-md bg-brand-dark/80 border border-red-500/50 rounded-2xl p-8 shadow-2xl">
        <WarningIcon className="h-16 w-16 mx-auto text-red-500" />
        <h1 className="text-3xl font-bold text-white mt-4">Account Blocked</h1>
        <p className="text-gray-300 my-4">
          Your account has been blocked due to a violation of our terms of service. You can only access your dashboard and the contact page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <a href="/dashboard" className="flex-1 text-center px-4 py-2 bg-white/20 rounded-md text-white hover:bg-white/30">
            Go to Dashboard
          </a>
          <a href="/contact" className="flex-1 text-center px-4 py-2 bg-white/10 rounded-md text-white hover:bg-white/20">
            Contact Support
          </a>
          <button onClick={onLogout} className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>
    </div>
);

// AppContent Component Definition Start Here
const AppContent: React.FC = () => {
    // State and Context Hooks Start Here
    const auth = useContext(AuthContext);
    const location = useLocation();
    const [firstLoad, setFirstLoad] = useState(true);
    const [showAdBlockerModal, setShowAdBlockerModal] = useState(false);
    const [showGreetingPopup, setShowGreetingPopup] = useState(false);
    // State and Context Hooks End Here

    // useEffect Hook for Initial Load and AdBlocker Detection Start Here
    useEffect(() => {
        // First Load Simulation Start
        const timer = setTimeout(() => setFirstLoad(false), 2000); // Simulate loading time
        // First Load Simulation End
        
        // Adblocker Detection Logic Start
        const adBlockerCheck = async () => {
            try {
                // Fetch a dummy ad script. If it fails, an adblocker is likely present.
                await fetch(new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
                    method: 'HEAD',
                    mode: 'no-cors'
                }));
            } catch (error) {
                // If the fetch fails, set up the recurring modal.
                setInterval(() => {
                    setShowAdBlockerModal(true);
                }, 300000); // Every 5 minutes
            }
        };

        adBlockerCheck();
        // Adblocker Detection Logic End

        // Cleanup Function Start
        return () => clearTimeout(timer);
        // Cleanup Function End
    }, []);
    // useEffect Hook for Initial Load and AdBlocker Detection End Here

    // useEffect for Greeting Popup
    useEffect(() => {
        if (auth?.currentUser) {
            const lastVisit = localStorage.getItem('lastVisitTime');
            const now = new Date().getTime();
            const THREE_HOURS = 3 * 60 * 60 * 1000;

            if (!lastVisit || (now - parseInt(lastVisit, 10)) > THREE_HOURS) {
                // Add a small delay to let the main page load
                setTimeout(() => setShowGreetingPopup(true), 1500);
            }
        }
    }, [auth?.currentUser]);

    // 🟢 SMART ACTIVITY TRACKER (New Feature)
    // User login hone ke baad 60 seconds wait karega.
    // Agar user 60 sec tak site pe hai, tabhi 'lastActive' update hoga.
    useEffect(() => {
        // Agar user login nahi hai, toh kuch mat karo
        if (!auth?.currentUser) return;

        const timer = setTimeout(() => {
            // 60 Seconds poore ho gaye!
            // Ab server ko batao: "Banda active hai, time note kar lo."
            // Hum 'updateUserData' use kar rahe hain jo backend pe 'users.ts' ko call karega
            auth.updateUserData(auth.currentUser!.id, { lastActive: Date.now() });
            
            // Optional: Console log to verify it works (remove later if you want)
            // console.log("✅ User activity tracked (60s engaged)");
        }, 60000); // 60,000 ms = 1 Minute

        // Cleanup: Agar user 1 min se pehle tab band kar de ya logout kare,
        // toh timer cancel ho jayega aur server pe request NAHI jayegi.
        return () => clearTimeout(timer);
    }, [auth?.currentUser?.id]); // Dependency: Sirf user change hone par reset hoga

    const handleCloseGreeting = () => {
        setShowGreetingPopup(false);
        localStorage.setItem('lastVisitTime', new Date().getTime().toString());
    };

    // Route-based Ad Visibility Logic Start Here
    const adFreeRoutes = ['/dashboard', '/api-access'];
    const showSidebarAd = !adFreeRoutes.some(path => location.pathname.startsWith(path));
    // Route-based Ad Visibility Logic End Here

    // Blocked User Logic
    const isBlocked = auth?.currentUser?.status === 'banned';
    const allowedPathsForBlockedUser = ['/contact', '/dashboard'];
    const isOnAllowedPath = allowedPathsForBlockedUser.some(p => location.pathname.startsWith(p));

    // First Load Loader Render Start Here
    if (firstLoad) return <FullScreenLoader />;
    // First Load Loader Render End Here

    // Main App Content Render Start Here
    return (
        <div className="flex flex-col min-h-screen gradient-bg text-white font-sans">
            {isBlocked && !isOnAllowedPath && <BlockedUserModal onLogout={auth.logout!} />}
            <Header />
            {auth?.isFetchingDetails && <UserDetailsFetcher />}
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex gap-8">
                    <div className="flex-grow">
                        <Suspense fallback={<div className="text-center py-20"><FullScreenLoader /></div>}>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/tools" element={<ToolSelectionPage />} />
                                <Route path="/pricing" element={<PricingPage />} />
                                <Route path="/features" element={<FeaturesPage />} />
                                <Route path="/features/url-shortener" element={<ShortenerFeaturePage />} />
                                <Route path="/features/qr-generator" element={<QrGeneratorFeaturePage />} />
                                <Route path="/features/qr-scanner" element={<QrScannerFeaturePage />} />
                                <Route path="/features/api" element={<ApiFeaturePage />} />
                                <Route path="/features/dashboard" element={<DashboardFeaturePage />} />
                                <Route path="/features/notifications" element={<NotificationsFeaturePage />} />
                                <Route path="/features/community-blog" element={<BlogFeaturePage />} />
                                <Route path="/features/shop" element={<ShopFeaturePage />} />
                                <Route path="/features/chat" element={<ChatFeaturePage />} />
                                <Route path="/features/security" element={<SecurityFeaturePage />} />
                                <Route path="/features/support-system" element={<SupportFeaturePage />} />
                                <Route path="/features/system-status" element={<StatusFeaturePage />} />
                                <Route path="/features/founder" element={<FounderFeaturePage />} />
                                <Route path="/features/our-vision" element={<VisionFeaturePage />} />
                                <Route path="/features/ai-assistant" element={<AiFeaturePage />} />
                                <Route path="/shortener" element={<ShortenerPage />} />
                                <Route path="/qr-generator" element={<QrGeneratorPage />} />
                                <Route path="/qr-scanner" element={<ScannerPage />} />
                                <Route path="/api-access" element={<ApiAccessPage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/wiki" element={<WikiPage />} />
                                <Route path="/Legal" element={<LegalPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                <Route path="/terms" element={<TermsPage />} />
                                <Route path="/cancellation" element={<CancellationPolicyPage />} />
                                <Route path="/cookies" element={<CookiesPolicyPage />} />
                                <Route path="/status" element={<StatusPage />} />
                                <Route path="/faq" element={<FaqPage />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/history" element={<LinkHistory scope="user" />} />
                                <Route path="/blog" element={<BlogPage />} />
                                <Route path="/blog/create" element={<BlogCreatePage />} />
                                <Route path="/blog/post/:postId" element={<BlogPostPageWrapper />} />
                         {/**/} <Route path="/donate" element={<DonationPage />} /> 
                                <Route path="/notifications" element={<NotificationsPage />} />
                                <Route path="/shop" element={<ShopPage />} />
                                <Route path="/copyright" element={<CopyrightPage />} />
                                <Route path="/thanks-for-downloading-our-app" element={<ThankYouPage />} />
                                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                                <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
                                <Route path="/chat" element={<ChatPage />} />
                                <Route path="/alllinks" element={<DeepLinkHubPage />} />
                                <Route path="/:alias" element={<RedirectPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </Suspense>
                    </div>
                    {showSidebarAd && (
                        <aside className="hidden lg:block w-48 flex-shrink-0">
                            <div className="sticky top-24">
                                <AdComponent type="display" />
                            </div>
                        </aside>
                    )}
                </div>
            </main>
            <Footer />
            {auth?.isAuthModalOpen && <AuthModal />}
            {auth?.isSubscriptionModalOpen && <SubscriptionModal onClose={auth.closeSubscriptionModal} />}
            {auth?.isApiSubscriptionModalOpen && <ApiSubscriptionModal onClose={auth.closeApiSubscriptionModal} />}
            {auth?.is2FAModalOpen && <TwoFactorAuthModal />}
            {showAdBlockerModal && <AdBlockerModal onClose={() => setShowAdBlockerModal(false)} />}
            <MobileNavButton />
            <BackToTopButton />
            <NotificationPermissionPrompt />
            {showGreetingPopup && auth?.currentUser && (
                <Suspense fallback={null}>
                    <GreetingPopup user={auth.currentUser} onClose={handleCloseGreeting} />
                </Suspense>
            )}
            <div id="portal-root"></div>
            <CustomCursor />
            <QuickLinkAI />
        </div>
    );
    // Main App Content Render End Here
};
// AppContent Component Definition End Here

// ImageKit Authenticator Function
const imageKitAuthenticator = async () => {
    try {
        const response = await fetch(`${window.location.origin}/api/auth?action=imagekit-auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("ImageKit authentication request failed:", error);
        throw error;
    }
};

// App Component with Providers Start Here
const App: React.FC = () => (
    <Router>
        <AuthProvider>
            <UrlProvider>
                <QrProvider>
                    <BlogProvider>
                        <IKContext
                            publicKey={process.env.VITE_IMAGEKIT_PUBLIC_KEY}
                            urlEndpoint={process.env.VITE_IMAGEKIT_URL_ENDPOINT}
                            authenticator={imageKitAuthenticator}
                        >
                            <AppContent />
                        </IKContext>
                    </BlogProvider>
                </QrProvider>
            </UrlProvider>
        </AuthProvider>
    </Router>
);
// App Component with Providers End Here

// Default Export Start Here
export default App;
// Default Export End Here

// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
//   Project: QuickLink - Fast & Secure URL Shortener, QR Generator & API.
//   Website: https://qlynk.vercel.app
//   Maintainer: Deep Dey (Founder & Developer)
//   Do not copy, modify, or redistribute without prior consent.
// ===================================================================================
