<div align="center">
  <img src="https://qlynk.vercel.app/quicklink-logo.svg" alt="QuickLink Logo" width="128" height="128">
  <h1>QuickLink - Project File Information</h1>
  <p><strong>Version 1.1 | Last Updated: 2025</strong></p>
</div>

---

This document provides a complete breakdown of the QuickLink project structure, detailing the purpose of each file and directory.

## 📂 Table of Contents

1.  [**Root Directory**](#-root-directory)
2.  [**API Endpoints (`/api`)**](#-api-endpoints-api)
3.  [**Global Contexts (`/contexts`)**](#-global-contexts-contexts)
4.  [**UI Components (`/components`)**](#-ui-components-components)
5.  [**Utility Functions (`/utils`)**](#-utility-functions-utils)
6.  [**Public Assets (`/public`)**](#-public-assets-public)

---

## 🌳 Root Directory

These are the core configuration and entry-point files for the application.

-   📄 **`index.html`**: The main HTML entry point for the entire React application. It loads all necessary scripts, styles, and fonts.
-   📄 **`index.tsx`**: The main TypeScript file that renders the React application into the `root` div of `index.html`.
-   📄 **`App.tsx`**: The top-level React component that sets up routing, global context providers, and renders all pages and modals.
-   📄 **`api.ts`**: A crucial client-side file that centralizes all `fetch` requests to the backend serverless functions. It acts as an SDK for the frontend to communicate with the API.
-   📄 **`types.ts`**: The single source of truth for all TypeScript types and interfaces used across the entire application (both frontend and backend).
-   📄 **`faqData.ts`**: Contains the static data (questions and answers) for the FAQ page.
-   📄 **`package.json`**: Defines project metadata, dependencies (`react`, `mongodb`, etc.), and scripts (`dev`, `build`).
-   📄 **`vite.config.ts`**: The configuration file for Vite, the frontend build tool. It handles environment variables, plugins, and module resolution.
-   📄 **`tsconfig.json`**: The configuration file for the TypeScript compiler, defining how `.ts` and `.tsx` files are processed.
-   📄 **`vercel.json`**: The configuration file for Vercel deployment, defining serverless function rewrites and headers.
-   📄 **`metadata.json`**: Contains metadata for the application, including permissions required (like camera access).
-   📄 **`README.md`**: The main documentation for the project, providing an overview, feature list, and setup instructions.
-   📄 **`LICENSE.md`**: The legal license defining the terms of use for the source code.
-   📄 **`SECURITY.md`**: The security policy for reporting vulnerabilities.
-   📄 **`INSTRUCTION.md`**: The detailed user and admin guide for all application features.
-   📄 **`FILE INFORMATION.md`**: This very file, documenting the project structure.

---

## ☁️ API Endpoints (`/api`)

These files define the serverless functions that act as the backend for the application.

-   📁 **`/api/lib`**:
    -   📄 **`mongodb.ts`**: Manages the connection to the MongoDB Atlas database, using a cached client for performance.
-   📁 **`/api/v1`**:
    -   📄 **`st.ts`**: The primary endpoint for the developer API, handling URL shortening requests with API key validation.
-   📄 **`admin.ts`**: Provides aggregated data for the admin's live activity dashboard.
-   📄 **`auth.ts`**: Handles all user authentication logic: signup, login (including 2FA), Google Sign-In, password reset, and email verification.
-   📄 **`blog.ts`**: Manages all CRUD (Create, Read, Update, Delete) operations for the community blog, including posts, comments, likes, and moderation.
-   📄 **`history.ts`**: Manages the storage and retrieval of QR code generation and scan history.
-   📄 **`payments.ts`**: Handles the creation of payment orders with third-party gateways (Razorpay) and records donations.
-   📄 **`shop.ts`**: A comprehensive endpoint managing products, coupons, purchase fulfillment, and dynamic pricing for the entire e-commerce system.
-   📄 **`status.ts`**: Provides a public health check for all critical services (database, auth, etc.).
-   📄 **`support.ts`**: Manages the support ticket system, notification system, and the entire QuickChat messaging backend.
-   📄 **`urls.ts`**: The core logic for creating, retrieving, and deleting shortened URLs.
-   📄 **`users.ts`**: Manages user data, including profile updates, role changes, and API key generation.

---

## 🌐 Global Contexts (`/contexts`)

These files use React's Context API to provide global state management across the application.

-   📄 **`AuthContext.tsx`**: Manages the current user's state, authentication status, and provides functions for login, logout, and managing auth modals.
-   📄 **`BlogContext.tsx`**: Manages the state for all blog posts and provides functions for creating posts, liking, and commenting.
-   📄 **`QrContext.tsx`**: Manages the history of generated and scanned QR codes.
-   📄 **`UrlContext.tsx`**: Manages the state of all shortened URLs (active and expired) and payment history.

---

## 🖥️ UI Components (`/components`)

This directory contains all the reusable React components that make up the user interface.

-   📁 **`/components/chat`**:
    -   📄 **`ChatPage.tsx`**: The main page component for the QuickChat feature.
    -   📄 **`ConversationList.tsx`**: Displays the list of user conversations, requests, and suggestions.
    -   📄 **`MessageWindow.tsx`**: The main window for displaying messages and typing new ones.
    -   📄 **`ChatSettingsModal.tsx`**: Modal for users to customize their chat profile.
-   📁 **`/components/features`**: Contains the 14 detailed, AdSense-optimized pages explaining each feature of the application.
-   📁 **`/components/icons`**:
    -   📄 **`IconComponents.tsx`**: A library of all SVG icons used throughout the app, exported as React components.
-   📄 **`About.tsx` / `AboutBlog.tsx`, etc.**: Small informational cards displayed on various pages.
-   📄 **`AdBlockerModal.tsx`**: A modal that appears if an adblocker is detected.
-   📄 **`AdComponent.tsx`**: A wrapper for displaying Google AdSense ads.
-   📄 **`ApiAccessPage.tsx`**: The page where users manage their developer API key.
-   📄 **`AuthModal.tsx`**: The main modal for user login and signup.
-   📄 **`BackToTopButton.tsx`**: A button that appears on long pages to scroll back to the top.
-   📄 **`BlogCreatePage.tsx` / `BlogCreatePost.tsx`**: Components for creating a new blog post.
-   📄 **`BlogPage.tsx` / `BlogPostItem.tsx` / `BlogPostPage.tsx`**: Components for displaying the blog and individual posts.
-   📄 **`ContactPage.tsx`**: The page for contacting support.
-   📄 **`CopyrightPage.tsx`**: Page displaying music and copyright credits.
-   📄 **`CustomCursor.tsx`**: Implements the custom glowing cursor effect for desktops.
-   📄 **`Dashboard.tsx`**: The main user dashboard component.
-   📄 **`DecodedQrResult.tsx`**: Displays the parsed, human-readable result of a QR scan.
-   📄 **`DonationPage.tsx`**: The page for making donations.
-   📄 **`Footer.tsx` / `Header.tsx`**: The main site navigation and footer.
-   📄 **`LandingPage.tsx`**: The homepage of the application.
-   📄 **`Legal.tsx` / `PrivacyPolicyPage.tsx`, etc.**: Pages displaying legal information.
-   📄 **`LinkHistory.tsx`**: The component that displays a user's (or all users') link history.
-   📄 **`MobileMenu.tsx` / `MobileNavButton.tsx`**: Components for the mobile navigation experience.
-   📄 **`NotFoundPage.tsx`**: The 404 error page.
-   📄 **`NotificationsPage.tsx`**: The page where users can view all their notifications.
-   📄 **`OwnerDashboard.tsx`**: The main panel for all administrator-only tools.
-   📄 **`PricingPage.tsx`**: Displays the feature comparison between different user tiers.
-   📄 **`QrCodeGenerator.tsx` / `QrGeneratorPage.tsx`**: Components for the QR code generation tool.
-   📄 **`QrCodeScanner.tsx` / `ScannerPage.tsx`**: Components for the QR code scanning tool.
-   📄 **`RedirectPage.tsx`**: The interstitial page shown before redirecting a short link.
-   📄 **`ResetPasswordPage.tsx`**: The page for users to reset their password.
-   📄 **`ShopPage.tsx` / `ShopPaymentModal.tsx`**: Components for the e-commerce shop.
-   📄 **`SubscriptionModal.tsx` / `ApiSubscriptionModal.tsx`**: Modals for purchasing subscriptions.
-   📄 **`TicketConversation.tsx` / `TicketModal.tsx`**: Components for the support ticket system.
-   📄 **`ToolSelectionPage.tsx`**: The main landing page for the tools section.
-   📄 **`TwoFactorAuthModal.tsx`**: The modal for entering a 2FA code during login.
-   📄 **`UrlShortener.tsx` / `ShortenerPage.tsx`**: Components for the URL shortening tool.
-   📄 **`Wiki.tsx`**: The Wikipedia-style page about the founder.

---

## 🛠️ Utility Functions (`/utils`)

Helper functions that are used in multiple places across the application.

-   📄 **`qrParser.ts`**: A function that takes raw QR code data and parses it into a human-readable format.
-   📄 **`time.ts`**: Contains the `timeAgo` function for formatting timestamps.
-   📄 **`userHelper.ts`**: Contains the `getUserBadge` function to dynamically determine a user's badge based on their status and roles.

---

## 🖼️ Public Assets (`/public`)

Static files that are served directly to the browser.

-   📄 **`ads.txt`**: A file for Google AdSense to verify ad sellers.
-   📄 **`robots.txt`**: Instructions for web crawlers on which pages to index or ignore.
-   📄 **`sitemap.xml`**: Provides a map of all public pages for search engines.
-   📄 **`quicklink-logo.svg`**: The main logo for the application.
-   📁 **`/wiki-images`**: Images used specifically on the `/wiki` page.
