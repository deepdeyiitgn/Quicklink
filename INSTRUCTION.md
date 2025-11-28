<div align="center">
  <img src="https://qlynk.vercel.app/quicklink-logo.svg" alt="QuickLink Logo" width="128" height="128">
  <h1>QuickLink - The Complete User & Admin Guide</h1>
  <p><strong>Version 1.1 | Last Updated: 2025</strong></p>
</div>

---

Welcome to the official guide for QuickLink! This document provides a complete walkthrough of all features, from basic tools to advanced administrative functions. Use the table of contents to navigate to the section you need.

## 📖 Table of Contents

1.  [**Getting Started**](#-1-getting-started)
    -   [Signing Up & Logging In](#signing-up--logging-in)
    -   [Verifying Your Account](#verifying-your-account)
2.  [**Core Tools**](#-2-core-tools)
    -   [URL Shortener](#url-shortener)
    -   [QR Code Generator](#qr-code-generator)
    -   [QR Code Scanner](#qr-code-scanner)
3.  [**Your User Dashboard**](#-3-your-user-dashboard)
    -   [Profile & Subscriptions](#profile--subscriptions)
    -   [Link History](#link-history)
    -   [Security (2-Factor Authentication)](#security-2-factor-authentication)
    -   [My Support Tickets](#my-support-tickets)
4.  [**Community & Content**](#-4-community--content)
    -   [The Community Blog](#the-community-blog)
    -   [Creating a Blog Post](#creating-a-blog-post)
5.  [**Premium Features & E-commerce**](#-5-premium-features--e-commerce)
    -   [The Shop](#the-shop)
    -   [Donations](#donations)
    -   [Developer API](#developer-api)
6.  [**QuickChat Messaging**](#-6-quickchat-messaging)
    -   [Starting a Conversation](#starting-a-conversation)
    -   [Managing Chat Requests](#managing-chat-requests)
    -   [Chat Settings](#chat-settings)
7.  [**For Administrators: The Owner Panel**](#-7-for-administrators-the-owner-panel)
    -   [Live Activity Dashboard](#live-activity-dashboard)
    -   [User Management](#user-management)
    -   [2FA Management](#2fa-management)
    -   [Chat Management](#chat-management)
    -   [Content & E-commerce Control](#content--e-commerce-control)
    -   [Sending Notifications](#sending-notifications)
    -   [Project Management](#project-management)

---

## 🚀 1. Getting Started

### Signing Up & Logging In

-   **Email Signup**: Click `Sign In` > `Sign Up`, fill in your details, and complete the reCAPTCHA. You will receive a verification email.
-   **Google Sign-In**: Click the `Sign in with Google` button for a one-click registration and login experience, which automatically verifies your email.

### Verifying Your Account

To prevent spam, new email signups must be verified.
1.  **Check Your Email**: Look for an email from QuickLink with the subject "Verify Your Email Address".
2.  **Click the Link**: Click the `Verify Your Email` button or link in the email.
3.  **Complete the Security Check**: You will be taken to a verification page.
    -   **reCAPTCHA**: The primary security check. Tick the "I'm not a robot" box.
    -   **Fallback Puzzles**: If reCAPTCHA fails to load, you will be presented with a simple math problem and a text-entry challenge. You must solve these within the time limit.
4.  **Activation**: Once verified, your account is active, and you can log in.

---

## 🛠️ 2. Core Tools

You can access all tools from the **Tools** page in the header.

### URL Shortener

-   **What it does**: Turns long web addresses into short, easy-to-share links.
-   **Workflow**:
    1.  **Paste URL**: Enter your long URL into the main input field.
    2.  **Custom Alias (Optional)**: In the field next to the domain, type a custom keyword for your link (e.g., `my-event`). If left blank, a random one is generated.
    3.  **Generate**: Click the `Generate Short URL` button.
    4.  **Copy & Share**: Your new short link appears below. Click the `Copy` button to copy it to your clipboard. Use the social media icons to share it directly.
-   **Expiration Rules**:
    -   **Anonymous Users**: Links expire in **24 hours**.
    -   **Free Registered Users**: Links expire in **7 days**.
    -   **Premium Users**: Links last for **up to 1 year**.

### QR Code Generator

-   **What it does**: Creates custom QR codes for various types of data.
-   **Workflow**:
    1.  **Select Type**: Click an icon at the top to choose what your QR code will do (e.g., `URL`, `Wi-Fi`, `vCard`, `PayPal`, `Skype`, `Zoom`).
    2.  **Fill Details**: A form will appear. Fill in the required information. The QR code on the right will update in real-time.
    3.  **Customize (Optional)**:
        -   **Colors**: Use the color pickers under the "Customize Colors" accordion to change the dot and background colors.
        -   **Logo**: Under the "Add Logo" accordion, upload an image file to place it in the center of the QR code.
    4.  **Download**: Click the `Download PNG` button to save the high-resolution QR code image.

### QR Code Scanner

-   **What it does**: Reads QR codes using your device's camera or from an image file.
-   **Workflow**:
    1.  **Choose Method**:
        -   `Use Camera`: Click this to start your device's camera. You may need to grant permission. Point the camera at a QR code to scan it instantly.
        -   `Upload Image`: Click this to select an image file from your device that contains a QR code.
    2.  **View Result**: The decoded information will appear.
        -   If it's a web link, an `Open Link` button appears.
        -   Click **`View Details`** to see a clean, human-readable breakdown of the QR code's contents (e.g., Wi-Fi network name and password).
-   **Fallback Mechanism**: If the primary scanner fails, it will try a secondary in-browser scanner. If that also fails, you'll be prompted to use a powerful third-party API for a final attempt.

---

## 📊 3. Your User Dashboard

Access your dashboard by logging in and clicking your profile picture, then `Dashboard`.

### Profile & Subscriptions

-   **Profile Settings**: Change your display name or update your profile picture. Click `Save Changes` to apply them.
-   **Subscription Status**: This section shows your current plan (Free or Premium).
    -   **Button**: `Subscribe Now` / `Manage Subscription`. This button opens the subscription modal where you can purchase or view plans.

### Link History

-   **What it does**: A table listing all the short links you have created.
-   **Workflow**:
    -   View your active and expired links, their original destination, and when they expire.
    -   `Reload`: Refreshes the list.
    -   `Trash Icon`: Permanently deletes the corresponding short link.

### Security (2-Factor Authentication)

-   **What it does**: Adds an extra layer of security to your account using an authenticator app.
-   **Logging In with 2FA**:
    1.  Enter your email and password as usual.
    2.  A modal will appear asking for your 6-digit code.
    3.  Open your authenticator app (e.g., Google Authenticator, Authy), find the code for QuickLink, and enter it to log in.
-   **Workflow to Enable**:
    1.  Go to the `Security` tab in your dashboard and click `Enable 2FA`.
    2.  Enter your current password and click `Verify`.
    3.  Scan the QR code shown with your authenticator app. Alternatively, manually enter the secret key provided.
    4.  Click `Next`.
    5.  Enter the 6-digit code from your app and click `Activate 2FA`.
-   **Workflow to Disable**:
    1.  Go to the `Security` tab.
    2.  Click `Disable 2FA`.
    3.  Enter your current password and a valid 6-digit code from your authenticator app when prompted.

### My Support Tickets

-   **What it does**: A dedicated system to get help from our team.
-   **Workflow**:
    -   **Create a Ticket**: Click the `New Ticket` button, fill in the subject and message, and submit.
    -   **View & Reply**: Click on an existing ticket to view the full conversation. You can type a reply and click `Send Reply` if the ticket is not closed.

---

## ✍️ 4. Community & Content

### The Community Blog

-   **What it is**: A place for users to share stories, tutorials, and updates.
-   **Workflow**:
    -   **Read**: Anyone can read approved posts on the `/blog` page.
    -   **Interact**: Logged-in users can:
        -   **Like**: Click the `Heart Icon` ❤️.
        -   **Comment**: Type in the comment box and post.
    -   **Badges**: Look for badges next to usernames to identify **Premium** users and the site **Owner**.

### Creating a Blog Post

-   **Workflow**:
    1.  Navigate to `/blog` and click `Create a New Post`.
    2.  **Title & Content**: Fill in the title and the main content.
    3.  **Post Type**:
        -   `Normal`: A simple text editor with basic formatting buttons (`B`, `I`, `</>`).
        -   `HTML`: For advanced users who want to write their own HTML for custom layouts.
    4.  **Media (Optional)**:
        -   `Upload Image(s)`: You can add up to 2 images.
        -   `Upload Audio`: You can add 1 audio file instead of images.
    5.  **Submit**: Click `Submit Post`. Your post will be sent for review by our moderators. Admins' posts are approved automatically.

---

## 💎 5. Premium Features & E-commerce

### The Shop

-   **What it does**: A place to buy digital products, like subscription extensions or URL credit bundles, with one-time payments.
-   **Workflow**:
    1.  **Browse**: Go to the `/shop` page.
    2.  **Buy Now**: Click `Buy Now` on a product you want.
    3.  **Checkout**: A modal will appear.
        -   **Apply Coupon (Optional)**: If you have a coupon code, enter it and click `Apply`.
        -   **Pay**: Click the payment button to complete the secure transaction. Your benefits will be applied automatically.

### Donations

-   **What it does**: A way for you to support the platform.
-   **Workflow**:
    1.  Go to the `/donate` page.
    2.  Select a preset amount or enter a custom amount.
    3.  Fill in your name and a message (optional), or check `Donate anonymously`.
    4.  Click `Donate` to proceed to the secure payment page.

### Developer API

-   **What it does**: Allows you to integrate QuickLink's URL shortening into your own apps.
-   **Workflow**:
    1.  Go to the `/api-access` page.
    2.  **Generate Key**: If you don't have a key, click `Generate Free Trial Key`.
    3.  **View & Copy**: Your API key will be displayed. Use the `Copy` button.
    4.  **Integrate**: Use the API endpoint and example `curl` request provided to start building.

---

## 💬 6. QuickChat Messaging

-   **What it is**: A lightweight, private messaging system for registered users on a dedicated `/chat` page.
-   **Access**: Click the `Chat Icon` 💬 in the header to navigate to the chat page.

### Starting a Conversation

1.  **Find a User**:
    -   **Search**: Use the search bar to find a user by their name.
    -   **Suggestions**: The chat page will suggest other active users you can start a conversation with.
2.  **Select**: Click on a user's name from the search results or suggestions.
3.  **Request Sent**: A new conversation is created with a "pending" status. You cannot send messages until the user accepts.

### Managing Chat Requests

-   **Requests Section**: When a user wants to chat, their request appears under "Requests".
-   **Buttons**:
    -   `Accept`: Allows the user to message you. The chat moves to your main "Chats" list.
    -   `Decline`: Rejects the request. The user cannot send you messages.

### Chat Settings

-   **Access**: On the chat page, click the `Settings Icon` ⚙️ to open the Chat Settings modal.
-   **Options**:
    -   **Chat Username**: Set a unique username that will be displayed in chats.
    -   **Welcome Message**: Write a custom message that other users will see when they first open a chat with you.
    -   **Profile Picture Visibility**: Use the toggle to control whether your profile picture is visible in accepted chats. By default, it is hidden.

---

## 👑 7. For Administrators: The Owner Panel

This panel is only visible to users with `isAdmin` set to `true`.

### Live Activity Dashboard

-   **What it does**: A real-time overview of the platform's health and activity.
-   **Features**:
    -   **System Status**: Shows the operational status of the Database, Auth services, etc.
    -   **Online Users**: A list of users who have been active in the last 5 minutes.
    -   **Recent Activity**: A log of recent user logins.

### User Management

-   **What it does**: Manage all users on the platform.
-   **Workflow**:
    -   **View Details**: Click a user's name to see their full profile, subscription, and session details.
    -   **Change Status**: Click `Block` or `Unblock` to change a user's `status` to `banned` or `active`.
    -   **Change Roles**: Use the `Admin` and `Moderator` checkboxes to grant or revoke permissions.
    -   **Delete URLs**: Permanently deletes all links created by that user.

### 2FA Management

-   **What it does**: Helps users who are locked out of their accounts due to 2FA.
-   **Workflow**:
    -   **View Live OTP**: Shows the current, valid 6-digit OTP for every user with 2FA enabled, allowing you to verify a user's identity.
    -   `Disable 2FA`: Immediately disables 2FA for a user's account. **Use with caution.**

### Chat Management

-   **What it does**: Full administrative control over the QuickChat system.
-   **Workflow**:
    -   **View Conversations**: Click any conversation to view the full chat history.
    -   **Intervene in Chats**: Send messages into any conversation, which will appear from **"Quicklink Team"** with a verified badge.
    -   **Censored Words**: Add or remove words from the site-wide filter.
    -   **User Chat Permissions**: Toggle a user's ability to use the chat feature.

### Content & E-commerce Control

-   **History**: View and manage all short links created by all users.
-   **Shop**: Create, edit, and delete products available in the shop.
-   **Coupons**: Create and delete discount coupons.
-   **Pricing**: Set the prices for all subscription and API plans site-wide.

### Sending Notifications

-   **What it does**: Send custom notifications to users.
-   **Workflow**:
    1.  **Target**: Choose `All Users` or `Single User`.
    2.  **Fill Details**: Write a `Title`, `Message`, and optional `Link`.
    3.  **Send**: Click `Send Notification`.

### Project Management

-   **Download Source**: Provides a direct link to download the project's source code.
-   **Delete All Expired URLs**: Permanently deletes all expired links from the database to improve performance. **This action cannot be undone.**
