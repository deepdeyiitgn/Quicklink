import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Home, 
  Mail, 
  Download, 
  Heart, 
  Zap, 
  Shield, 
  Globe, 
  CheckCircle, 
  Share2,
  Copy,
  X,
  Smartphone,
  Facebook,
  Instagram,
  Twitter,
  Send,
  Star,
  MessageCircle,
  ArrowRight,
  PartyPopper // Added PartyPopper import
} from 'lucide-react';

const ThankYou = () => {
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [installationStatus, setInstallationStatus] = useState<'inProgress' | 'completed'>('inProgress');

  useEffect(() => {
    // Simulate installation progress for 6 seconds
    const timer = setTimeout(() => {
      setInstallationStatus('completed');
    }, 6000); // 6 seconds for installation completion

    // Optional: Trigger download after a slight delay for better UX
    // (This part is already handled by the initial download, but kept here for reference if needed)
    // const downloadTimer = setTimeout(() => {
    //   window.location.href = "https://github.com/deepdeyiitgn/Quicklink/releases/download/v13/Quicklink-installer-v13.exe";
    // }, 1000); // Trigger download 1 second after page load

    return () => {
      clearTimeout(timer);
      // clearTimeout(downloadTimer); // Clear if download timer was used
    };
  }, []);

  const handleHomeRedirect = () => {
    window.location.href = '/';
  };

  // --- Share Logic ---
  const shareUrl = "https://qlynk.vercel.app/";
  const shareText = "🚀 Just upgraded my workflow with Quicklink v13! The fastest, ad-free URL shortener for Windows by Deep Dey. \n\nTry it now: ";
  const fullShareText = `${shareText} ${shareUrl}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(fullShareText)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: 'Quicklink v13',
            text: shareText,
            url: shareUrl,
          }).catch(console.error);
        } else {
          handleCopy();
        }
        return; // Exit for native
      default:
        break;
    }
    if (url) window.open(url, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: 'spring', bounce: 0.5, duration: 1.5 } },
    hover: { scale: 1.1, rotate: 5, filter: "drop-shadow(0 0 15px rgba(99, 102, 241, 0.6))", transition: { duration: 0.3 } }
  };

  const installationTextVariants = {
    inProgress: {
      opacity: [0.7, 1, 0.7],
      scale: [1, 1.02, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
    completed: {
      opacity: 1,
      scale: 1,
      color: "rgb(74, 222, 128)", // green-400
      transition: { duration: 0.5 }
    },
  };

  const partyPopperVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.5, rotate: 0 },
    blast: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: [0, -20, 20, 0],
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    fade: { opacity: 0, scale: 0.8, transition: { delay: 0.5, duration: 0.3 } }
  }


  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative pb-20">
      
      {/* --- SEO META TAGS --- */}
      <Helmet>
        <title>Download Started - Quicklink v13 by Deep Dey</title>
        <meta name="description" content="Thank you for downloading Quicklink v13. The fastest, most secure URL shortener for Windows. Get started now!" />
        <meta name="keywords" content="Quicklink, URL Shortener, Windows App, Deep Dey, Productivity, Download, v13" />
        <meta property="og:title" content="Quicklink v13 Download" />
        <meta property="og:description" content="Downloading the best URL shortener for Windows." />
        <meta property="og:image" content="https://qlynk.vercel.app/quicklink-logo.jpg" />
      </Helmet>

      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-4 py-12 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div className="inline-block mb-6 relative" variants={logoVariants} whileHover="hover">
            <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-30 rounded-full"></div>
            <img 
              src="/quicklink-logo.svg" 
              alt="Quicklink Logo" 
              className="w-32 h-32 md:w-48 md:h-48 mx-auto relative z-10 object-contain"
              onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150?text=Quicklink"; }}
            />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-4 flex items-center justify-center gap-4"
            variants={itemVariants}
          >
            {installationStatus === 'completed' && (
              <motion.span
                variants={partyPopperVariants}
                initial="hidden"
                animate={installationStatus === 'completed' ? "blast" : "hidden"}
                exit="fade"
                className="absolute left-1/2 -ml-28 md:-ml-40" // Adjust positioning
              >
                <PartyPopper size={48} className="text-yellow-400 rotate-[-30deg]" />
              </motion.span>
            )}
            <motion.span
              variants={installationTextVariants}
              initial="inProgress"
              animate={installationStatus}
              className={`${installationStatus === 'completed' ? 'text-green-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'}`}
            >
              {installationStatus === 'inProgress' ? "Installation in Progress..." : "Installation Completed!"}
            </motion.span>
            {installationStatus === 'completed' && (
              <motion.span
                variants={partyPopperVariants}
                initial="hidden"
                animate={installationStatus === 'completed' ? "blast" : "hidden"}
                exit="fade"
                className="absolute right-1/2 -mr-28 md:-mr-40" // Adjust positioning
              >
                <PartyPopper size={48} className="text-pink-400 rotate-[30deg]" />
              </motion.span>
            )}
          </motion.h1>
          
          <motion.div className="flex items-center justify-center gap-2 text-green-400 text-lg font-medium" variants={itemVariants}>
            <CheckCircle size={20} />
            <span>Quicklink v13 Installer Downloaded</span>
          </motion.div>
        </div>

        {/* Main Content Card */}
        <motion.div 
          className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl mb-10"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Heart className="text-red-500 fill-current" size={24} />
            Welcome to the Family!
          </h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            <p>
              Your download has successfully started! The <strong>Quicklink-installer-v13.exe</strong> is on its way to your system. Once it finishes downloading, locate the file in your downloads folder and simply run it to initiate the installation process. You are just moments away from integrating a faster, ad-free, and incredibly efficient URL shortening tool into your daily workflow.
            </p>
            <p>
              Quicklink v13 isn't just a piece of software; it's a commitment to enhancing your productivity. Designed and meticulously crafted by Deep Dey, this latest update brings a host of improvements, including enterprise-grade security protocols to protect your data and an innovative offline caching feature that ensures uninterrupted service, even without an internet connection. We are thrilled to have you join the Quicklink community!
            </p>
            <p>
              We've poured countless hours into optimizing every aspect of Quicklink v13 to deliver an unparalleled user experience. From its sleek, intuitive interface to its robust backend infrastructure, every detail has been considered to make your link-shortening tasks seamless and enjoyable. Get ready to experience the next level of digital efficiency!
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-4">Why v13 is Special:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Zap, text: "Lightning Fast Performance" },
                { icon: Shield, text: "Enterprise-Grade Security" },
                { icon: Globe, text: "Works Offline (Cached)" },
                { icon: Star, text: "Ad-Free Experience" }
              ].map((feature, idx) => (
                <motion.div key={idx} className="flex items-center gap-3 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors" whileHover={{ scale: 1.02, x: 5 }}>
                  <feature.icon className="text-indigo-400" size={20} />
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Developer Note */}
        <motion.div className="bg-indigo-900/20 border border-indigo-500/30 rounded-2xl p-6 mb-10 relative overflow-hidden" variants={itemVariants}>
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl"></div>
          <h3 className="text-lg font-bold text-indigo-300 mb-2">A Note from Deep Dey</h3>
          <p className="text-indigo-100/80 italic">
            "Your support drives this project. If Quicklink helps you save even 1 second today, my mission is accomplished. Don't forget to follow me on Instagram for behind-the-scenes updates!"
          </p>
        </motion.div>

        {/* --- GRID: Contact & SHARE APP --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Contact Box */}
          <motion.div 
            className="bg-gray-900/80 border border-gray-800 p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:border-gray-600 transition-colors group"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-gray-400 mb-4 text-sm">Found a bug or just want to say hi?</p>
            <a href="mailto:thedeeparise@gmail.com" className="text-indigo-400 font-semibold hover:text-indigo-300">thedeeparise@gmail.com</a>
            <a href="/contact" className="mt-2 text-sm text-gray-500 hover:text-white underline underline-offset-4">Visit Contact Page</a>
          </motion.div>

          {/* SHARE APP BOX */}
          <motion.div 
            className="bg-gradient-to-br from-pink-600 to-purple-700 p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg cursor-pointer"
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            onClick={() => setShowSharePopup(true)}
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <Share2 size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Spread the Word!</h3>
            <p className="text-indigo-100 mb-4 text-sm">Help your friends be productive too.</p>
            <button className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2">
              Share App <Heart size={16} className="fill-current" />
            </button>
          </motion.div>
        </div>

        {/* --- RE-DOWNLOAD CONTAINER (Gradient Style) --- */}
        <motion.div 
          className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl flex flex-col justify-center items-center text-center shadow-lg mb-10"
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.01 }}
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Download size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Download didn't start?</h3>
          <p className="text-indigo-100 mb-6 text-sm">
            If the download script didn't trigger automatically, click below to try again.
          </p>
          <button 
            onClick={() => window.location.href = "https://github.com/deepdeyiitgn/Quicklink/releases/download/v13/Quicklink-installer-v13.exe"}
            className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-full hover:bg-indigo-50 transition-colors shadow-md flex items-center gap-2"
          >
            Try Again <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div className="flex justify-center" variants={itemVariants}>
          <button 
            onClick={handleHomeRedirect}
            className="group relative px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-600 hover:border-gray-500 text-white font-bold text-lg transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            <Home size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>
        </motion.div>

        <motion.footer className="mt-16 text-center text-gray-600 text-sm" variants={itemVariants}>
          <p>© 2025 Quicklink by Deep Dey. All rights reserved.</p>
          <p className="mt-1">Designed with passion in Tripura, India 🇮🇳</p>
        </motion.footer>

      </motion.div>

      {/* --- SHARE POPUP MODAL --- */}
      <AnimatePresence>
        {showSharePopup && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowSharePopup(false)}
            ></div>

            {/* Modal Content */}
            <motion.div 
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm relative z-10 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <button 
                onClick={() => setShowSharePopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-bold text-white mb-1 text-center">Share Quicklink</h3>
              <p className="text-gray-400 text-sm text-center mb-6">Choose a platform to share</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* WhatsApp */}
                <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-[#25D366]/20 text-[#25D366] rounded-full flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-xs text-gray-300">WhatsApp</span>
                </button>

                {/* Facebook */}
                <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-[#1877F2]/20 text-[#1877F2] rounded-full flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                    <Facebook size={24} />
                  </div>
                  <span className="text-xs text-gray-300">Facebook</span>
                </button>

                {/* Telegram */}
                <button onClick={() => handleShare('telegram')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-[#0088cc]/20 text-[#0088cc] rounded-full flex items-center justify-center group-hover:bg-[#0088cc] group-hover:text-white transition-colors">
                    <Send size={24} />
                  </div>
                  <span className="text-xs text-gray-300">Telegram</span>
                </button>

                {/* Twitter/X */}
                <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                    <Twitter size={24} />
                  </div>
                  <span className="text-xs text-gray-300">Twitter</span>
                </button>

                {/* Instagram (Copy Link Fallback) */}
                <button onClick={handleCopy} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[1px] rounded-full">
                      <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center group-hover:bg-transparent group-hover:text-white text-pink-500 transition-colors">
                        <Instagram size={24} />
                      </div>
                  </div>
                  <span className="text-xs text-gray-300">Insta/Copy</span>
                </button>

                {/* Native Share */}
                <button onClick={() => handleShare('native')} className="flex flex-col items-center gap-2 group">
                    <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Smartphone size={24} />
                  </div>
                  <span className="text-xs text-gray-300">More</span>
                </button>
              </div>

              {/* Copy Link Bar */}
              <div 
                onClick={handleCopy}
                className="bg-gray-800 rounded-lg p-3 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors border border-gray-700"
              >
                <span className="text-sm text-gray-400 truncate mr-2">{shareUrl}</span>
                <div className="flex items-center gap-1 text-indigo-400 text-xs font-bold">
                  {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                  {copied ? "COPIED!" : "COPY"}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ThankYou;
