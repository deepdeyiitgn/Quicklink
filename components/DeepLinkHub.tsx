import React from 'react';
import { Helmet } from 'react-helmet';

// --- 1. ICONS (SVG) ---
// Custom hand-coded SVGs to keep the file standalone
const Icons = {
  Badge: () => <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Globe: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
  Robot: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  YouTube: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>,
  Instagram: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.79-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  Spotify: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
  Telegram: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  Heart: () => <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
  Mail: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  App: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Book: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  Facebook: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>,
  Linkedin: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
};

// --- 2. CONFIGURATION & DATA ---
const seoData = {
  title: "Deep Dey | JEE Aspirant & Developer | Official Links",
  description: "Official link hub of Deep Dey. JEE 2027 Aspirant, Creator of QuickLink, and Tech Enthusiast. Explore my study resources, vlogs, and projects.",
  keywords: "Deep Dey, JEE 2027, IIT Aspirant, IIT Gandhinagar, QuickLink, Study Vlogs, Discord Bot, Developer, DeepDeyIITK",
  author: "Deep Dey",
  image: "https://taplink.st/a/4/a/e/a/c5d7ee.png?5", // Profile pic
  url: "https://www.deepdeyiitk.com/"
};

// 👇 YEH HAI MAIN FIX (Interface Add Kiya Hai) 👇
interface LinkItem {
  name: string;
  desc: string;
  url: string;
  icon: any;
  highlight?: boolean; // '?' means optional
  color?: string;      // '?' means optional
}

// 👇 Yahan type define kiya hai ": { title: string; items: LinkItem[] }[]" 👇
const linkGroups: { title: string; items: LinkItem[] }[] = [
  {
    title: "🚀 DeepDeyIITK Ecosystem",
    items: [
      { name: "DeepDeyIITK Website", desc: "My Digital HQ - Projects & More", url: "https://www.deepdeyiitk.com/", icon: Icons.Globe, highlight: true },
      { name: "Discord Study Bot", desc: "24/7 Study Companion for Aspirants", url: "https://studybots.vercel.app/", icon: Icons.Robot },
      { name: "Apps & Tools", desc: "Productivity Tools Built by Me", url: "https://apps.deepdeyiitk.com/", icon: Icons.App },
    ]
  },
  {
    title: "📚 JEE Journey & Studies",
    items: [
      { name: "My JEE Journey", desc: "Progress Tracker & Roadmap", url: "https://sites.google.com/view/deydeep", icon: Icons.Book },
      { name: "JEE Store", desc: "Resources & Notes", url: "https://sites.google.com/view/ddstorejee", icon: Icons.Book },
      { name: "IIT Gandhinagar", desc: "My Dream. My Goal. 🎯", url: "https://iitgn.ac.in/", icon: Icons.Globe, color: "text-red-400" },
    ]
  },
  {
    title: "🎥 Content & Chill",
    items: [
      { name: "YouTube Channel", desc: "Study Vlogs, Tech & Motivation", url: "https://www.youtube.com/@deepdeyiit", icon: Icons.YouTube, color: "text-red-500" },
      { name: "Spotify Playlist", desc: "Focus Mode & Lofi Beats 🎵", url: "https://open.spotify.com/playlist/148O9r4X3UuekPoPY3cs70", icon: Icons.Spotify, color: "text-green-500" },
      { name: "Spotify Best Study Playlist", desc: "best Study Playlist with 300+ Saves", url: "https://open.spotify.com/playlist/6KIXCU0MCMP86td8GmLgxj", icon: Icons.Spotify, color: "text-blue-400" },
    ]
  },
  {
    title: "🙏 Support & Community",
    items: [
      { name: "Donate", desc: "Support my work & studies", url: "https://payments.cashfree.com/forms/donatedeepona", icon: Icons.Heart, color: "text-pink-500" },
      { name: "ISKCON Bhiwandi", desc: "Spiritual Home & Donations", url: "https://iskconbhiwandi.org/", icon: Icons.Globe, color: "text-orange-400" },
      { name: "Contact Me", desc: "Email: deydeep200821@gmail.com", url: "mailto:deydeep200821@gmail.com", icon: Icons.Mail },
    ]
  }
];
const socialLinks = [
  { icon: Icons.Instagram, url: "https://www.instagram.com/deepdey.official/" },
  { icon: Icons.YouTube, url: "https://www.youtube.com/channel/UCrh1Mx5CTTbbkgW5O6iS2Tw/" }, // ID Link
  { icon: Icons.Facebook, url: "https://www.facebook.com/deepdeyiit" },
  { icon: Icons.Linkedin, url: "https://www.linkedin.com/in/deepdeyiit/" },
  { icon: Icons.Instagram, url: "https://www.instagram.com/captivatedeep/" }, // Photography
];

// --- 3. MAIN COMPONENT ---
export default function DeepLinkHub() {
  return (
    <>
      {/* SEO Configuration */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="author" content={seoData.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:image" content={seoData.image} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={seoData.url} />
        <meta property="twitter:title" content={seoData.title} />
        <meta property="twitter:description" content={seoData.description} />
        <meta property="twitter:image" content={seoData.image} />
      </Helmet>

      {/* Main UI Container */}
      <div className="min-h-screen bg-[#0B0E14] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100 flex flex-col items-center relative overflow-hidden">
        
        {/* Background Elements (Glows) */}
        <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>

        <div className="w-full max-w-lg px-6 py-12 z-10 flex flex-col gap-8 pb-20">
          
          {/* Header Profile */}
          <header className="flex flex-col items-center text-center animate-fade-in-down">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-700"></div>
              <img 
                src={seoData.image} 
                alt="Deep Dey" 
                className="relative w-28 h-28 rounded-full border-4 border-[#0B0E14] object-cover shadow-2xl"
              />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight flex items-center gap-2">
              Deep Dey <Icons.Badge />
            </h1>
            <p className="text-gray-400 font-medium text-sm mt-1">@deepdey.official</p>
            <p className="mt-3 text-cyan-200/90 text-sm font-medium bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-800/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
              IITGN Dreamer 🎯 | Developer | Creator
            </p>
          </header>

          {/* Links Section */}
          <main className="flex flex-col gap-8 w-full">
            {linkGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-3">
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold ml-2">
                  {group.title}
                </h2>
                <div className="space-y-3">
                  {group.items.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        relative group flex items-center gap-4 p-4 rounded-2xl 
                        bg-[#161b22]/80 backdrop-blur-md border border-gray-800 
                        hover:border-cyan-500/50 hover:bg-[#1c222b] 
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-900/20
                        ${link.highlight ? 'ring-1 ring-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : ''}
                      `}
                    >
                      {/* Icon Box */}
                      <div className={`
                        p-3 rounded-xl bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors
                        ${link.color ? link.color : 'text-cyan-400'}
                      `}>
                        <link.icon />
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-100 text-base truncate group-hover:text-cyan-200 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-xs text-gray-400 truncate mt-0.5 group-hover:text-gray-300">
                          {link.desc}
                        </p>
                      </div>

                      {/* Arrow */}
                      <div className="text-gray-600 group-hover:text-cyan-400 transition-colors transform group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </main>

          {/* Footer Socials */}
          <footer className="mt-4 pt-8 border-t border-gray-800 flex flex-col items-center gap-6">
            <div className="flex gap-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white hover:scale-110 transition-all duration-300 bg-gray-900/50 p-2.5 rounded-full hover:bg-gray-800"
                >
                  <social.icon />
                </a>
              ))}
            </div>
            
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-600">
                Designed with 💙 for the IIT Dream.
              </p>
              <div className="flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-gray-500 font-medium">POWERED BY</span>
                <span className="text-[11px] font-bold text-cyan-500 tracking-wide">QUICKLINK</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
