// ===================================================================================
//   🏷️ PROJECT: QuickLink - Fast & Secure URL Shortener, QR Generator & API
//   👨‍💻 AUTHOR: Deep Dey (Ceo,Dev,Founder)
//   📅 UPDATE: Final Massive Knowledge Base (100+ Responses)
// ===================================================================================

import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../api';
import { AuthContextType, ChatMessage } from '../types';
import { LoadingIcon, XIcon, SparklesIcon, ArrowUpIcon, MaximizeIcon, MinimizeIcon, DownloadIcon } from './icons/IconComponents';

type ChatMode = 'simple' | 'ai';
type Message = {
    id: number;
    sender: 'bot' | 'user';
    text: string;
    suggestions?: { text: string; response: string | (() => void) }[];
};

// --- 🧠 SMART KEYWORD MAPPING (User text -> Bot Topic) ---
const keywordMap: Record<string, string> = {
    // 💰 Pricing & Money
    "price": "pricing_menu", "cost": "pricing_menu", "plan": "pricing_menu", "free": "free_plan_details", 
    "money": "pricing_menu", "pay": "payment_methods", "subscription": "pricing_menu", "premium": "premium_plan_details",
    "refund": "refund_policy", "buy": "how_to_buy", "purchase": "how_to_buy", "razorpay": "payment_methods", "gst": "invoice_help", "bill": "invoice_help",

    // 📱 QR Codes
    "qr": "qr_menu", "scan": "qr_scanner_menu", "wifi": "qr_wifi_help", "logo": "qr_customization", 
    "color": "qr_customization", "download": "qr_download_formats", "png": "qr_download_formats", "svg": "qr_download_formats",
    "camera": "troubleshoot_camera", "scanner": "qr_scanner_menu", "vcard": "qr_vcard_help", "contact qr": "qr_vcard_help",

    // 🔗 URL Shortener
    "short": "url_menu", "link": "url_menu", "url": "url_menu", "alias": "custom_alias_info", 
    "custom": "custom_alias_info", "expire": "link_expiry_info", "expiration": "link_expiry_info", 
    "edit": "manage_links_help", "delete link": "manage_links_help", "analytics": "analytics_info", "track": "analytics_info",
    "utm": "utm_tracking", "campaign": "utm_tracking", "bulk": "bulk_shortening",

    // 👤 Account
    "account": "account_menu", "login": "login_help", "sign": "signup_help", "register": "signup_help",
    "password": "forgot_password_help", "forgot": "forgot_password_help", "reset": "forgot_password_help",
    "delete account": "delete_account_warning", "2fa": "security_2fa", "security": "security_2fa", "profile": "profile_settings",
    "email": "change_email", "username": "change_username",

    // 👨‍💻 API / Dev
    "api": "api_menu", "key": "api_key_guide", "dev": "api_menu", "limit": "api_rate_limits", "docs": "api_docs_info",
    "webhook": "api_webhooks", "token": "api_key_guide", "sdk": "api_sdk_info",

    // 🛠️ Troubleshooting & Errors
    "help": "welcome", "support": "contact_support_options", "contact": "contact_support_options", 
    "error": "troubleshoot_menu", "bug": "troubleshoot_menu", "issue": "troubleshoot_menu", "not working": "troubleshoot_menu",
    "404": "error_404_help", "slow": "error_slow_help", "crash": "troubleshoot_menu",
    
     // 💸 Discount Offer
    "discount": "offer_2027", "coupon": "offer_2027", "offer": "offer_2027", 
    "promo": "offer_2027", "sale": "offer_2027", "cashback": "offer_2027", 
    "loot": "offer_2027", "deal": "offer_2027", "savings": "offer_2027",


    // 👋 Greetings & Fun
    "hello": "welcome", "hi": "welcome", "hey": "welcome", "start": "welcome", "menu": "welcome",
    "thank": "gratitude_response", "good": "gratitude_response", "bye": "goodbye_response",

    // ℹ️ About & Founder (Deep Dey Special)
    "about": "about_menu", "founder": "founder_profile", "deep": "founder_profile", "ceo": "founder_profile",
    "tech": "tech_stack_details", "school": "founder_personal", "jee": "founder_vision", "game": "founder_gaming",
    "iit": "founder_vision", "location": "founder_personal", "birthday": "founder_personal"
};

// --- 📚 MASSIVE KNOWLEDGE BASE (100+ Responses) ---
const simpleBotKnowledge: Record<string, { response: string; suggestions?: { text: string; response: string }[] }> = {
    // ==============================
    // 🏠 MAIN ENTRY
    // ==============================
    "welcome": {
        response: "👋 **Welcome to QuickLink Assistant!**\n\nI am your advanced guide tailored by **Deep Dey**. I can handle almost everything without AI!\n\n**What's on your mind?**",
        suggestions: [
            { text: "🔗 URL Tools", response: "url_menu" },
            { text: "📱 QR Tools", response: "qr_menu" },
            { text: "💸 Big Offer", response: "offer_2027" },             
            { text: "👤 Account", response: "account_menu" },
            { text: "💎 Pricing", response: "pricing_menu" },
            { text: "👨‍💻 API", response: "api_menu" },
            { text: "🛠️ Fix Issues", response: "troubleshoot_menu" },
            { text: "ℹ️ About Us", response: "about_menu" }
        ]
    },

"offer_2027": {
        response: "💸 **SPECIAL OFFERS (Loot Lo Deal):**\n\n1. **Coupon Code:** Use code **'QUICKLINK'** for **FLAT 69% OFF**. (Valid until 2027).\n\n2. **Cashback:** Get extra **10% Cashback** if your final payment is ₹100 or more.\n\n3. **Best Strategy:** Buy a bigger plan/lifetime deal to cross ₹100 and get both the Discount AND Cashback! 🚀\n\nSelect a topic:",
        suggestions: [
            { text: "💎 View Pricing Plans", response: "pricing_menu" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    // ==============================
    // 🔗 URL SHORTENER DEEP DIVE
    // ==============================
    "url_menu": {
        response: "**🔗 URL Shortener Hub**\n\nShorten, Brand, and Track your links.\nSelect a topic:",
        suggestions: [
            { text: "Create Link", response: "url_create_steps" },           
            { text: "Custom Alias", response: "custom_alias_info" },
            { text: "Link Expiry", response: "link_expiry_info" },
            { text: "Edit/Delete", response: "manage_links_help" },
            { text: "Analytics", response: "analytics_info" },
            { text: "Bulk Create", response: "bulk_shortening" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    
    "url_create_steps": {
        response: "**📝 How to create a short link:**\n\n1. Go to the **Home/Shortener** page.\n2. Paste your long URL in the box.\n3. (Optional) Type a custom alias.\n4. Click **'Generate'**.\n\nBoom! Copy and share.",
        suggestions: [
            { text: "Create Now", response: "action_go_shortener" },
            { text: "⬅️ Back", response: "url_menu" }
        ]
    },
    "custom_alias_info": {
        response: "**✨ Custom Aliases**\n\nInstead of `qlynk.app/Xy7z`, make it `qlynk.app/MyBrand`.\n\n- **Free:** Standard keywords allowed.\n- **Premium:** High-value & Short keywords reserved.\n- **Note:** Aliases are unique and permanent.",
        suggestions: [
            { text: "Check Availability", response: "alias_check_help" },
            { text: "⬅️ Back", response: "url_menu" }
        ]
    },
    "alias_check_help": {
        response: "To check if an alias is free, simply try creating a link with it. If it says 'Already exists', you must choose another one.",
        suggestions: [{ text: "⬅️ Back", response: "url_menu" }]
    },
    "link_expiry_info": {
        response: "**⏳ Expiration Rules:**\n\n- **Guest:** 24 Hours\n- **Free User:** 7 Days\n- **Premium:** 1 Year (Renewable)\n\n*Logged-in users can see countdowns in Dashboard.*",
        suggestions: [
            { text: "Upgrade Plan", response: "pricing_menu" },
            { text: "⬅️ Back", response: "url_menu" }
        ]
    },
    "manage_links_help": {
        response: "**⚙️ Managing Links**\n\nGo to your **Dashboard** to:\n- **Edit Destination:** Change where the link goes (Premium).\n- **Delete:** Permanently remove a link.\n- **Deactivate:** Temporarily stop traffic.",
        suggestions: [
            { text: "Go to Dashboard", response: "dashboard_link" },
            { text: "⬅️ Back", response: "url_menu" }
        ]
    },
    "analytics_info": {
        response: "**📊 Link Analytics**\n\nWe track:\n- **Total Clicks**\n- **Location** (Country/City)\n- **Device** (Mobile/Desktop)\n- **Referrer** (Instagram/YouTube)\n\n*Real-time data for all registered users.*",
        suggestions: [{ text: "⬅️ Back", response: "url_menu" }]
    },
    "bulk_shortening": {
        response: "**📦 Bulk Shortening**\n\nNeed to shorten 50+ links?\n- Use our **API** for programmatic access.\n- Or upload a CSV file in the Dashboard (Coming Soon).",
        suggestions: [
            { text: "Use API", response: "api_menu" },
            { text: "⬅️ Back", response: "url_menu" }
        ]
    },
    "utm_tracking": {
        response: "**🎯 UTM Tracking**\n\nYou can append UTM parameters to your long URL before shortening. We preserve all query parameters seamlessly.",
        suggestions: [{ text: "⬅️ Back", response: "url_menu" }]
    },

    // ==============================
    // 📱 QR CODE DEEP DIVE
    // ==============================
    "qr_menu": {
        response: "**📱 QR Code Suite**\n\nGenerate static & dynamic QRs.\nWhat do you need?",
        suggestions: [
            { text: "Create QR", response: "qr_generator_guide" },
            { text: "Scan QR", response: "qr_scanner_menu" },
            { text: "QR Types", response: "qr_types_list" },
            { text: "Custom Design", response: "qr_customization" },
            { text: "Download Formats", response: "qr_download_formats" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "qr_generator_guide": {
        response: "**🎨 Creating a QR Code:**\n\n1. Visit `/qr-generator`.\n2. Choose Type (URL, WiFi, etc.).\n3. Enter Details.\n4. Customize & Download.",
        suggestions: [
            { text: "Start Creating", response: "action_go_qr_gen" },
            { text: "⬅️ Back", response: "qr_menu" }
        ]
    },
    "qr_types_list": {
        response: "**Supported QR Types:**\n\n- 🌐 **URL:** Opens website.\n- 📶 **WiFi:** Auto-connect.\n- 👤 **vCard:** Save Contact.\n- 📝 **Text:** Show message.\n- 📧 **Email/SMS:** Pre-fill message.",
        suggestions: [
            { text: "Create WiFi QR", response: "qr_wifi_help" },
            { text: "⬅️ Back", response: "qr_menu" }
        ]
    },
    "qr_wifi_help": {
        response: "**📶 WiFi QR Code**\n\nEnter SSID (Name), Password, and Encryption (WPA/WPA2). When scanned, devices connect automatically without typing the password!",
        suggestions: [{ text: "Create Now", response: "action_go_qr_gen" }, { text: "⬅️ Back", response: "qr_menu" }]
    },
    "qr_vcard_help": {
        response: "**👤 vCard QR**\n\nPerfect for business cards. Encodes Name, Phone, Email, and Org. Scanning it prompts 'Add to Contacts'.",
        suggestions: [{ text: "Create Now", response: "action_go_qr_gen" }, { text: "⬅️ Back", response: "qr_menu" }]
    },
    "qr_customization": {
        response: "**🎨 Design Options:**\n\n- **Colors:** Gradient or Solid (Foreground/Background).\n- **Logo:** Upload your brand logo in center.\n- **Eyes:** Change corner shapes (Dots/Squares).",
        suggestions: [{ text: "⬅️ Back", response: "qr_menu" }]
    },
    "qr_download_formats": {
        response: "**📥 Download Options:**\n\n- **PNG:** Raster image. Best for Web/Social.\n- **SVG:** Vector. Best for Print (Billboards/T-shirts).",
        suggestions: [{ text: "⬅️ Back", response: "qr_menu" }]
    },
    "qr_scanner_menu": {
        response: "**📷 Web QR Scanner**\n\nNo app needed! Scan directly in browser.\n- Use Webcam.\n- Upload Image File.",
        suggestions: [
            { text: "Go to Scanner", response: "action_go_qr_scan" },
            { text: "Camera Issues?", response: "troubleshoot_camera" },
            { text: "⬅️ Back", response: "qr_menu" }
        ]
    },

    // ==============================
    // 👤 ACCOUNT & SETTINGS
    // ==============================
    "account_menu": {
        response: "**👤 Account Hub**\nManage your profile and security.",
        suggestions: [
            { text: "Login / Signup", response: "auth_menu" },
            { text: "Profile Settings", response: "profile_settings" },
            { text: "Security (2FA)", response: "security_2fa" },
            { text: "Danger Zone", response: "delete_account_warning" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "auth_menu": {
        response: "**🔐 Authentication**",
        suggestions: [
            { text: "How to Login?", response: "login_help" },
            { text: "How to Signup?", response: "signup_help" },
            { text: "Forgot Password?", response: "forgot_password_help" },
            { text: "⬅️ Back", response: "account_menu" }
        ]
    },
    "login_help": {
        response: "Click **Sign In** (top right). Enter email/password. \n*Issue?* Check caps lock or reset password.",
        suggestions: [{ text: "⬅️ Back", response: "auth_menu" }]
    },
    "signup_help": {
        response: "Click **Sign In** > Toggle to **Sign Up**. \nFill Name, Email, Password. It's free!",
        suggestions: [{ text: "⬅️ Back", response: "auth_menu" }]
    },
    "forgot_password_help": {
        response: "Click **'Forgot Password?'** on login screen. We send a secure reset link to your email (Check Spam folder!).",
        suggestions: [{ text: "⬅️ Back", response: "auth_menu" }]
    },
    "profile_settings": {
        response: "**✏️ Edit Profile:**\n\nIn Dashboard, click your Avatar.\n- Change Name.\n- Update Email.\n- Upload Profile Pic.",
        suggestions: [{ text: "⬅️ Back", response: "account_menu" }]
    },
    "change_email": {
        response: "To change email, go to Profile. You may need to verify the new email address via OTP.",
        suggestions: [{ text: "⬅️ Back", response: "account_menu" }]
    },
    "security_2fa": {
        response: "**🛡️ Two-Factor Auth (2FA)**\n\nHighly recommended! Enable it in Settings. You will need an OTP from your email/app to login from new devices.",
        suggestions: [{ text: "⬅️ Back", response: "account_menu" }]
    },
    "delete_account_warning": {
        response: "⚠️ **WARNING: Irreversible Action**\n\nDeleting your account removes ALL links, QRs, and data instantly. Links will stop working.\n\nProceed with caution in Settings.",
        suggestions: [{ text: "⬅️ Back", response: "account_menu" }]
    },

    // ==============================
    // 💎 PRICING & BILLING
    // ==============================
    "pricing_menu": {
        response: "**💎 Plans & Pricing**\nInvest in your brand.",
        suggestions: [
            { text: "Free Plan", response: "free_plan_details" },
            { text: "Premium Plan", response: "premium_plan_details" },
            { text: "Payment Info", response: "payment_methods" },
            { text: "Refunds", response: "refund_policy" },
            { text: "Invoices/GST", response: "invoice_help" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "free_plan_details": {
        response: "**🆓 Free Plan Includes:**\n- 50 Links for All time\n- 7 Days Expiry\n- Standard Support",
        suggestions: [{ text: "Compare Plans", response: "action_go_pricing" }, { text: "⬅️ Back", response: "pricing_menu" }]
    },
    "premium_plan_details": {
        response: "**🌟 Premium Plan Includes:**\n- Unlimited Links\n- 1 Year Expiry\n- Custom Aliases\n- API Access\n- Priority Support\n- No Ads",
        suggestions: [{ text: "Upgrade Now", response: "how_to_buy" }, { text: "⬅️ Back", response: "pricing_menu" }]
    },
    "how_to_buy": {
        response: "1. Log in.\n2. Go to Dashboard > **Billing**.\n3. Select Plan > Pay via Razorpay.",
        suggestions: [{ text: "⬅️ Back", response: "pricing_menu" }]
    },
    "payment_methods": {
        response: "**💳 Razorpay Gateway:**\n- UPI (GPay, PhonePe)\n- Credit/Debit Cards\n- Net Banking\n- Wallets\n\n*100% Secure & Encrypted.*",
        suggestions: [{ text: "⬅️ Back", response: "pricing_menu" }]
    },
    "refund_policy": {
        response: "🚫 **Non-Refundable Policy**\n\nSince we offer a generous Free tier to test, all Premium payments are final. Please verify before buying.",
        suggestions: [{ text: "View Legal", response: "legal_menu" }, { text: "⬅️ Back", response: "pricing_menu" }]
    },
    "invoice_help": {
        response: "GST Invoices are automatically emailed to you after successful payment via Razorpay.",
        suggestions: [{ text: "⬅️ Back", response: "pricing_menu" }]
    },

    // ==============================
    // 👨‍💻 API & DEVELOPER
    // ==============================
    "api_menu": {
        response: "**👨‍💻 Developer Zone**\nAutomate QuickLink.",
        suggestions: [
            { text: "Get API Key", response: "api_key_guide" },
            { text: "Endpoints", response: "api_docs_info" },
            { text: "Rate Limits", response: "api_rate_limits" },
            { text: "Webhooks", response: "api_webhooks" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "api_key_guide": {
        response: "1. Login.\n2. Go to **`/api-access`** (Link in Dashboard).\n3. Click **Generate Key**.\n\n*Warning: Keep it secret!*",
        suggestions: [{ text: "⬅️ Back", response: "api_menu" }]
    },
    "api_rate_limits": {
        response: "**🚦 Rate Limits:**\n- **Free:** 500 API Calls (All-time)\n- **Premium:** Up to 5,000 API Calls [Renewable]\n\nExceeding returns `429 Too Many Requests`.",
        suggestions: [{ text: "⬅️ Back", response: "api_menu" }]
    },
    "api_docs_info": {
        response: "Base URL: `https://qlynk.vercel.app/api-access`\n\n- `POST https://qlynk.vercel.app/api/v1/st`\n- `GET https://qlynk.vercel.app/api/v1/st?api=qk_YOU_API_KEY&url=https://example.com/another/long/url&alias=my-get-link`\n\nFull Swagger docs on /api-access page.",
        suggestions: [{ text: "⬅️ Back", response: "api_menu" }]
    },
    "api_webhooks": {
        response: "Webhooks for link clicks are currently Not Available.",
        suggestions: [{ text: "⬅️ Back", response: "api_menu" }]
    },
    "api_sdk_info": {
        response: "Official Node.js and Python SDKs are in development. Use REST API for now.",
        suggestions: [{ text: "⬅️ Back", response: "api_menu" }]
    },

    // ==============================
    // 🛠️ TROUBLESHOOTING
    // ==============================
    "troubleshoot_menu": {
        response: "**🛠️ Troubleshooting**\nWhat's broken?",
        suggestions: [
            { text: "Link not working", response: "error_404_help" },
            { text: "Slow Loading", response: "error_slow_help" },
            { text: "Camera Failed", response: "troubleshoot_camera" },
            { text: "Login Failed", response: "login_help" },
            { text: "Contact Human", response: "contact_support_options" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "error_404_help": {
        response: "**❌ 404 Not Found?**\n\n- The link expired.\n- The link was deleted.\n- You typed the alias wrong.\n- The link violated Terms.",
        suggestions: [{ text: "Report Issue", response: "contact_support_options" }, { text: "⬅️ Back", response: "troubleshoot_menu" }]
    },
    "error_slow_help": {
        response: "QuickLink is hosted on Vercel Edge. If it's slow:\n- Check your internet.\n- Check if `qlynk.vercel.app` is blocked by ISP.",
        suggestions: [{ text: "⬅️ Back", response: "troubleshoot_menu" }]
    },
    "troubleshoot_camera": {
        response: "**📷 Camera Fix:**\n1. Click 'Allow' on browser popup.\n2. Close other apps using camera.\n3. Use Chrome/Safari.\n4. Try **Image Upload** mode [its Stable for everyone, because Camera is on Beta].",
        suggestions: [{ text: "⬅️ Back", response: "troubleshoot_menu" }]
    },

    // ==============================
    // ℹ️ ABOUT & FOUNDER (DEEP DEY)
    // ==============================
    "about_menu": {
        response: "**ℹ️ About QuickLink**\n\nBuilt with ❤️ in India.",
        suggestions: [
            { text: "Founder Profile", response: "founder_profile" },
            { text: "Vision & Goal", response: "founder_vision" },
            { text: "Tech Stack", response: "tech_stack_details" },
            { text: "Legal Hub", response: "legal_menu" },
            { text: "⬅️ Main Menu", response: "welcome" }
        ]
    },
    "founder_profile": {
        response: "**👨‍💻 Deep Dey (Founder)**\n\n- **Role:** Full Stack Developer & Student\n- **DOB:** Oct 21, 2008\n- **Location:** Dharmanagar, Tripura\n- **School:** New Shishu Bihar H.S.\n\nA passionate coder also main focus on JEE prep and startup dreams!",
        suggestions: [
            { text: "His Vision", response: "founder_vision" },
            { text: "Personal Interests", response: "founder_personal" },
            { text: "⬅️ Back", response: "about_menu" }
        ]
    },
    "founder_vision": {
        response: "**🚀 The Vision**\n\nDeep aims to crack **JEE 2027** and study CS/AI at **IIT Gandhinagar/Kanpur/Kharagpur **. \n\nQuickLink is his proof of work—building high-quality tools for the world.",
        suggestions: [{ text: "⬅️ Back", response: "about_menu" }]
    },
    "founder_personal": {
        response: "**🩷 Personal Side**\n\n- **Study Video:** Formerly 'Deep Dey - The FUTURE IITIAN' (Yt Channel).\n- **Movies:** Loves **Saiyaara**, **Dhadak 2**, **Aashiqui 2 & Ok Jannu** **Loveyatri**, **Satyaprem Ki Katha**.\n- **Vibe:** Believes in 'Respect, Equality, Feminism and Hard Work'.",
        suggestions: [{ text: "⬅️ Back", response: "about_menu" }]
    },
    "founder_gaming": {
        response: "Deep used to run 'Deep Dey - The FUTURE IITIAN' on YouTube! He loves Minecraft and creates content when he isn't coding and studying Physics or any other subject.",
        suggestions: [{ text: "⬅️ Back", response: "about_menu" }]
    },
    "tech_stack_details": {
        response: "**⚙️ Built With:**\n- **Frontend:** React, TypeScript, Tailwind\n- **Backend:** Node.js, Express (Serverless)\n- **DB:** MongoDB Atlas\n- **AI:** Google Gemini 2.5 Flash",
        suggestions: [{ text: "⬅️ Back", response: "about_menu" }]
    },

    // ==============================
    // ⚖️ LEGAL & SUPPORT
    // ==============================
    "legal_menu": {
        response: "**⚖️ Legal Hub**",
        suggestions: [
            { text: "Privacy Policy", response: "privacy_policy_details" },
            { text: "Terms of Service", response: "tos_details" },
            { text: "Cancellation", response: "refund_policy" },
            { text: "⬅️ Back", response: "about_menu" }
        ]
    },
    "privacy_policy_details": {
        response: "**Privacy:** We only collect email for login. We do NOT sell data. Links are public by nature. QR scans happen locally.",
        suggestions: [{ text: "⬅️ Back", response: "legal_menu" }]
    },
    "tos_details": {
        response: "**Terms:** No phishing/illegal links. We reserve the right to ban abusers. Service provided 'as is'.",
        suggestions: [{ text: "⬅️ Back", response: "legal_menu" }]
    },
    "contact_support_options": {
        response: "**📞 Contact Us**\n\n- **Ticket:** Use [Contact Page](/contact).\n- **Email:** `thedeeparise@gmail.com`\n- **Chat:** QuickChat (Registered only).",
        suggestions: [{ text: "⬅️ Back", response: "welcome" }]
    },

    // ==============================
    // 🔄 ACTIONS & REDIRECTS
    // ==============================
    "action_go_shortener": {
        response: "Redirecting... Click here: [Open Shortener](/shortener)",
        suggestions: [{ text: "⬅️ Home", response: "welcome" }]
    },
    "action_go_qr_gen": {
        response: "Redirecting... Click here: [Open Generator](/qr-generator)",
        suggestions: [{ text: "⬅️ Home", response: "welcome" }]
    },
    "action_go_qr_scan": {
        response: "Redirecting... Click here: [Open Scanner](/qr-scanner)",
        suggestions: [{ text: "⬅️ Home", response: "welcome" }]
    },
    "action_go_pricing": {
        response: "See Plans: [Open Pricing](/pricing)",
        suggestions: [{ text: "⬅️ Home", response: "welcome" }]
    },
    "dashboard_link": {
        response: "Manage Account: [Go to Dashboard](/dashboard)",
        suggestions: [{ text: "⬅️ Home", response: "welcome" }]
    },
    "gratitude_response": {
        response: "You're welcome! Happy to help. 💖",
        suggestions: [{ text: "⬅️ Main Menu", response: "welcome" }]
    },
    "goodbye_response": {
        response: "Goodbye! Keep linking! 👋",
        suggestions: [{ text: "Start Again", response: "welcome" }]
    },

    // ==============================
    // ⚡ AI ESCALATION
    // ==============================
    "escalate_prompt": {
        response: "I don't have an idea to answer your query. 🤖\n\nShall I ask to our **Quicklink AI**?",
        suggestions: [
            { text: "Yes, Ask AI", response: "switch_to_ai" },
            { text: "No, Main Menu", response: "welcome" }
        ]
    },
    "switch_to_ai": {
        response: "⚡ **AI Mode Activated**\n(Powered by Gemini 2.5 flash)\n\nI'm ready! Ask me anything.\n\n POWERED BY DEEP ",
        suggestions: []
    }
};

const QuickLinkAI: React.FC = () => {
    const auth = useContext(AuthContext) as AuthContextType;
    const { aiSettings } = auth;
    const [isOpen, setIsOpen] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [mode, setMode] = useState<ChatMode>('simple');
    
    const [messages, setMessages] = useState<Message[]>([{ 
        id: 0, 
        sender: 'bot', 
        text: simpleBotKnowledge.welcome.response,
        suggestions: simpleBotKnowledge.welcome.suggestions as Message['suggestions']
    }]);
    
    const [aiHistory, setAiHistory] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addMessage = (sender: 'bot' | 'user', text: string, suggestions?: Message['suggestions']) => {
        setMessages(prev => [...prev, { id: Date.now(), sender, text, suggestions }]);
    };
    
    const findBestKeywordMatch = (text: string): string | null => {
        const lowerText = text.toLowerCase();
        for (const [keyword, responseKey] of Object.entries(keywordMap)) {
            if (lowerText.includes(keyword)) return responseKey;
        }
        return null;
    };

    // ✅ SMART BUTTON HANDLER
    const handleButtonClick = (key: string | (() => void), userText?: string) => {
        if (userText) addMessage('user', userText);

        if (typeof key === 'function') {
            key();
            return;
        }

        // ✅ SHOW OPTIONS LOGIC (For 'Yes' click)
        if (key.startsWith('SHOW_OPTS:')) {
            const targetKey = key.split(':')[1];
            if (simpleBotKnowledge[targetKey]) {
                const { suggestions } = simpleBotKnowledge[targetKey];
                addMessage('bot', "Awesome! Here are the details:", suggestions?.map(s => ({ text: s.text, response: s.response })));
            }
            return;
        }

        if (key === 'switch_to_ai') {
            setMode('ai');
            addMessage('bot', simpleBotKnowledge.switch_to_ai.response);
            if (aiHistory.length === 0) {
                setAiHistory([{ role: 'model', parts: [{ text: "Hello! I am QuickLink AI." }] }]);
            }
            return;
        }

        if (simpleBotKnowledge[key]) {
            const { response, suggestions } = simpleBotKnowledge[key];
            addMessage('bot', response, suggestions?.map(s => ({ text: s.text, response: s.response })));
        } 
        else if (mode === 'ai') {
            handleSendMessage(null, userText || key);
        }
        else {
            const { response, suggestions } = simpleBotKnowledge["escalate_prompt"];
             addMessage('bot', response, suggestions?.map(s => ({ text: s.text, response: s.response })));
        }
    };

    const handleSendMessage = async (e: React.FormEvent | null, manualText?: string) => {
        if (e) e.preventDefault();
        const userMessage = manualText || input.trim();
        if (!userMessage || isThinking) return;

        if (!manualText) setInput('');
        if (!manualText) addMessage('user', userMessage);

        if (mode === 'simple') {
            const matchedKey = findBestKeywordMatch(userMessage);
            if (matchedKey) {
                const { response } = simpleBotKnowledge[matchedKey];
                // ✅ SMART 'YES' LOGIC: Triggers options for THAT topic
                addMessage('bot', response, [
                    { text: "✅ Yes, helpful", response: `SHOW_OPTS:${matchedKey}` },
                    { text: "❌ No, Ask AI", response: "switch_to_ai" }
                ]);
            } else {
                handleButtonClick('escalate_prompt');
            }
        } else { 
            // --- AI MODE ---
            setIsThinking(true);
            const newHistory: ChatMessage[] = [...aiHistory, { role: 'user', parts: [{ text: userMessage }] }];
            setAiHistory(newHistory);

            try {
                const response = await api.aiChat(newHistory, 'bubble', auth?.currentUser?.id);
                
                // Suggestion Parsing (///Sug1|Sug2///)
                let replyText = response.reply;
                let aiSuggestions: Message['suggestions'] = [];
                const suggestionRegex = /\/\/\/(.*?)\/\/\//s;
                const match = replyText.match(suggestionRegex);

                if (match) {
                    replyText = replyText.replace(match[0], '').trim();
                    const rawSuggestions = match[1].split('|');
                    aiSuggestions = rawSuggestions.map((s: string) => {
                        const cleanS = s.trim();
                        const simpleKey = findBestKeywordMatch(cleanS);
                        return { text: cleanS, response: simpleKey || cleanS };
                    });
                }

                addMessage('bot', replyText, aiSuggestions);
                
                const modelResponse: ChatMessage = { role: 'model', parts: [{ text: response.reply }] };
                setAiHistory(prev => [...prev, modelResponse]);

                const fullConversation: ChatMessage[] = [...newHistory, modelResponse];
                api.saveAiConversation({
                    userId: auth?.currentUser?.id || 'anonymous',
                    context: 'bubble',
                    history: fullConversation
                }).catch(err => console.error("AI Save Error", err));

            } catch (error) {
                console.error("AI Error", error);
                addMessage('bot', "Connection error. Please try again.");
            } finally {
                setIsThinking(false);
            }
        }
    };
    
    const handleDownloadChat = () => {
        const chatContent = messages.map(msg => `[${msg.sender.toUpperCase()}] ${msg.text}`).join('\n\n');
        const fullContent = `QuickLink Chat Log\nDate: ${new Date().toLocaleString()}\n\n${chatContent}`;
        const blob = new Blob([fullContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-log.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (!aiSettings?.isBubbleAiEnabled) return null;
    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)} className="fixed bottom-5 left-5 z-40 w-16 h-16 bg-brand-dark/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <SparklesIcon className="h-8 w-8 text-brand-primary" />
            </button>
        );
    }
    
    const renderMessageText = (text: string) => {
        const urlRegex = /(\[.*?\]\((.*?)\))/g;
        return text.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                const match = part.match(/\[(.*?)\]\((.*?)\)/);
                if (match) return <Link key={index} to={match[2]} className="text-brand-primary underline">{match[1]}</Link>;
            }
            const boldRegex = /(\*\*.*?\*\*)/g;
            return part.split(boldRegex).map((subPart, subIndex) => {
                if (subPart.startsWith('**') && subPart.endsWith('**')) return <strong key={`${index}-${subIndex}`} className="font-bold">{subPart.slice(2, -2)}</strong>;
                return subPart;
            });
        });
    };

    return (
        <div className={`fixed z-50 flex flex-col glass-card shadow-2xl animate-fade-in-up ${isFullScreen ? 'inset-0 sm:inset-5 rounded-2xl' : 'bottom-5 left-5 right-5 sm:right-auto sm:max-w-sm w-auto h-[70vh] max-h-[600px] rounded-2xl'}`}>
            <div className="flex items-center justify-between p-3 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <SparklesIcon className="h-6 w-6 text-brand-primary" />
                    <h3 className="font-bold text-white">QuickLink Assistant</h3>
                </div>
                <div className="flex items-center gap-1">
                    <button onClick={handleDownloadChat} className="p-2 text-gray-400 hover:text-white rounded-full"><DownloadIcon className="h-5 w-5" /></button>
                    <button onClick={() => setIsFullScreen(!isFullScreen)} className="p-2 text-gray-400 hover:text-white rounded-full">{isFullScreen ? <MinimizeIcon className="h-5 w-5" /> : <MaximizeIcon className="h-5 w-5" />}</button>
                    <button onClick={() => setIsOpen(false)} className="p-2 text-gray-400 hover:text-white rounded-full"><XIcon className="h-5 w-5" /></button>
                </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto" style={{ backgroundImage: 'url(/chat-bg.svg)', backgroundSize: '200px' }}>
                {messages.map(msg => (
                    <div key={msg.id} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-[#182533] text-white' : 'bg-white/90 text-brand-dark'}`}>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{renderMessageText(msg.text)}</p>
                        </div>
                    </div>
                ))}
                {isThinking && (
                    <div className="mb-4 flex justify-start">
                        <div className="max-w-[80%] p-3 rounded-lg bg-white/90 text-brand-dark flex items-center gap-2">
                           <LoadingIcon className="h-4 w-4 animate-spin"/> <span className="text-sm">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {messages[messages.length-1]?.suggestions && (
                <div className="p-2 border-t border-white/10 flex flex-wrap gap-2">
                    {messages[messages.length-1].suggestions?.map(s => (
                        <button key={s.text} onClick={() => handleButtonClick(s.response, s.text)} className="px-3 py-1 text-xs bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors border border-white/10">
                            {s.text}
                        </button>
                    ))}
                </div>
            )}
            
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex items-center gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'ai' ? "Ask AI anything..." : "Search help topics..."} className="flex-grow bg-black/30 rounded-full border-white/20 px-4 py-2 text-sm text-white focus:ring-brand-primary" disabled={isThinking} />
                <button type="submit" disabled={isThinking || !input.trim()} className="w-10 h-10 flex-shrink-0 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark disabled:opacity-50"><ArrowUpIcon className="h-5 w-5" /></button>
            </form>
            <div className="text-center text-[10px] text-gray-600 p-1 bg-brand-dark/50">{mode === 'ai' ? "⚡ AI Mode" : "🤖 Assistant Mode"}</div>
        </div>
    );
};

export default QuickLinkAI;
// ===================================================================================
//   © 2025 Deep Dey | All Rights Reserved.
// ===================================================================================
