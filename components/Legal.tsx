// src/pages/legal.tsx
import React, { useState } from "react";
import { Helmet } from 'react-helmet';

type Section = {
  id: string;
  title: string;
  summary?: string;
  content: string;
};

const VERSION = "v1.2";
const LAST_UPDATED = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const CONTACT_EMAIL = "thedeeparise@gmail.com";

const sections: Section[] = [
  {
    id: "overview",
    title: "Overview",
    summary:
      "This page collects the live legal documents for QuickLink (QLYNK): Terms of Service, Privacy Policy, Cookie Policy, Cancellation & Refund Policy and other important notices.",
    content: `
QuickLink (QLYNK) provides URL shortening, QR generation and developer APIs. These documents describe how we operate, what you can expect, and how disputes are handled.
Version: ${VERSION}
Last Updated: ${LAST_UPDATED}
Contact: ${CONTACT_EMAIL}
`,
  },
  {
    id: "terms",
    title: "Terms of Service (key highlights)",
    summary: "Includes rules for user-generated content (Blog, Chat), account termination, and acceptable use.",
    content: `
1. Acceptance
By using QuickLink you accept these Terms. If you disagree, do not use the Service.

2. Usage Limits
The Service imposes limits on URL creation. Anonymous users are limited to 10 URLs per IP address. Free registered users receive a starting credit of 50 URLs. Premium users receive additional credits based on their subscription plan. Administrator accounts are not subject to these limits.

3. Accounts & Security
Provide accurate information. You are responsible for access credentials, including safeguarding your password and any 2-Factor Authentication (2FA) methods.

4. User-Generated Content
You are solely responsible for any content you post on the Community Blog or send via QuickChat. Prohibited content includes anything illegal, harmful, or infringing on others' rights. We reserve the right to moderate or remove content and terminate accounts that violate these policies.

5. Termination, Blocking & Inactive Accounts
We may suspend, terminate, or permanently block accounts for breaches, abuse, or inactivity. For severe abuse (malware, phishing, content violations) immediate action may occur without prior notice.

6. Liability & Disclaimer
Service provided "AS IS". Liability limited to the amount paid (to the extent permitted by law).

7. Governing law & dispute resolution
These Terms are governed by the laws of India. Parties should first attempt mediation; unresolved disputes submit to courts in Dharmanagar, Tripura.
`,
  },
  {
    id: "privacy",
    title: "Privacy Policy (key highlights)",
    summary: "Details what data we collect (including for 2FA and Chat), why we collect it, and how it is used and retained.",
    content: `
We collect: email, name, usage logs, IP & device metadata needed to provide the Service. For security, we also store data related to 2-Factor Authentication (2FA). For QuickChat, we store chat usernames, welcome messages, and conversation history.
We do NOT store full payment card details.
Usage and authentication cookies are used. We retain data as reasonably required to operate and comply with legal obligations.
Administrators may view certain user data, including chat conversations, for moderation and support purposes.
You may request data deletion subject to legal retention requirements.
`,
  },
  {
    id: "cookies",
    title: "Cookie Policy (key highlights)",
    summary: "Details the use of essential cookies for authentication and functionality, including for third-party services.",
    content: `
- Essential cookies: Used for session management and authentication.
- Functionality cookies: Used to remember your preferences.
- Third-Party Cookies: Our integrated services, such as Google (for reCAPTCHA and Sign-In) and payment processors (Razorpay), may set their own necessary cookies during their respective processes. We do not control these cookies.
You can change cookie preferences in browser settings, but disabling essential cookies may break site functionality.
`,
  },
  {
    id: "refunds",
    title: "Cancellation & Refund Policy",
    summary: "Clarifies our one-time digital purchase model and introduces a 7-day claim window for technical failures.",
    content: `
1. One-time payments
Subscriptions are one-time payments for a fixed term and are not recurring.

2. Non-refundable by default
All payments for digital goods and services are final and non-refundable once activated.

3. Exception: Technical Failure Window
Refund requests for demonstrable technical failures on our part must be submitted within seven (7) days of the transaction. We will investigate and may, at our discretion, issue a refund if a system error is confirmed.

4. Contact
Submit payment disputes to: ${CONTACT_EMAIL}
`,
  },
  {
    id: "changes",
    title: "Changes to Policies",
    summary: "How we notify users and how versioning works.",
    content: `
Material changes will be posted here and notified to registered users via email at least 14 days prior to the effective date. Each update includes a version number and change summary. Continued use after changes implies acceptance of the updated terms.
`,
  },
];

function prettyDownloadFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function LegalPage(): React.ReactElement {
  const [copied, setCopied] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(sections[0].id);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2200);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(id);
        setTimeout(() => setCopied(null), 2200);
      } finally {
        ta.remove();
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Legal & Policies Hub | QuickLink</title>
        <meta name="description" content="Official legal documentation for QuickLink (QLYNK), including Terms of Service, Privacy Policy, Cookie Policy, and Cancellation & Refund Policy." />
        <meta name="keywords" content="legal, terms of service, privacy policy, refund policy, cookie policy, quicklink legal" />
      </Helmet>
      <main className="min-h-screen bg-gradient-to-b from-[#0b0b12] via-[#071029] to-[#07121b] text-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl md:text-4xl font-extrabold">
                Legal & Policies — QuickLink (QLYNK)
              </h1>
              <div className="text-right">
                <div className="text-sm text-zinc-300">Version {VERSION}</div>
                <div className="text-xs text-zinc-400">Last updated: {LAST_UPDATED}</div>
              </div>
            </div>
            <p className="mt-3 text-zinc-300">
              Use this page to view and download official policies. If you need a
              machine-copy for records, use the download buttons per section.
            </p>
          </header>

  <section className="grid md:grid-cols-3 gap-6">
    <nav className="col-span-1 sticky top-6 self-start">
      <div className="bg-white/3 p-4 rounded-xl border border-white/6">
        <h3 className="font-semibold mb-2">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => {
                  setActive(s.id);
                  setTimeout(() => {
                    const el = document.getElementById(s.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 80);
                }}
                className={`w-full text-left px-2 py-2 rounded-md transition-all ${
                  active === s.id
                    ? "bg-gradient-to-r from-[#2b6cff] to-[#7b4cff] shadow-md"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="font-medium text-sm">{s.title}</div>
                {s.summary && (
                  <div className="text-xs text-zinc-300 line-clamp-2">
                    {s.summary}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>


                <div className="mt-4 border-t border-white/5 pt-3 text-xs text-zinc-300">
                  <div>Contact: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
                  <div className="mt-2">Governing law: India • Mediation preferred</div>
                </div>
              </div>
            </nav>

            <div className="col-span-2">
              {sections.map((s) => (
                <article
                  id={s.id}
                  key={s.id}
                  className={`mb-8 p-6 rounded-2xl border border-white/6 bg-white/3 transition-all ${
                    active === s.id ? "shadow-xl scale-100" : "opacity-80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">{s.title}</h2>
                      {s.summary && (
                        <p className="mt-1 text-sm text-zinc-300">{s.summary}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="text-xs px-3 py-2 rounded-md bg-zinc-900/70 border border-white/8 hover:bg-zinc-900/80"
                        onClick={() =>
                          prettyDownloadFile(
                            `${s.id}-quicklink-policy.txt`,
                            s.content.trim()
                          )
                        }
                      >
                        Download
                      </button>

                      <button
                        className="text-xs px-3 py-2 rounded-md bg-gradient-to-r from-[#10b981] to-[#06b6d4] hover:brightness-95"
                        onClick={() => handleCopy(s.content.trim(), s.id)}
                      >
                        {copied === s.id ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-zinc-100 bg-black/30 p-4 rounded-lg overflow-x-auto">
                    {s.content.trim()}
                  </pre>

                  {/* Small action footer */}
                  <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                    <div>Section ID: {s.id}</div>
                    <div>
                      <button
                        onClick={() => {
                          // Toggle active
                          setActive(s.id === active ? null : s.id);
                          setTimeout(() => {
                            const el = document.getElementById(s.id);
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 80);
                        }}
                        className="px-2 py-1 rounded bg-white/5"
                      >
                        {active === s.id ? "Collapse" : "Open"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* Summary / quick actions */}
              <div className="mt-6 p-6 rounded-xl border border-white/6 bg-white/4">
                <h3 className="text-lg font-semibold mb-3">Quick actions</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      prettyDownloadFile(
                        `quicklink-legal-all-${VERSION}.txt`,
                        sections.map((s) => `--- ${s.title} ---\n${s.content.trim()}\n\n`).join("\n")
                      )
                    }
                    className="px-4 py-2 rounded-md bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] shadow"
                  >
                    Download All Policies
                  </button>

                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Legal%20Inquiry%20-%20QuickLink`}
                    className="px-4 py-2 rounded-md bg-white/6 border border-white/8 flex items-center gap-2"
                  >
                    Contact Legal
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(`Version ${VERSION} — Last updated: ${LAST_UPDATED}`);
                      setCopied("meta");
                      setTimeout(() => setCopied(null), 2000);
                    }}
                    className="px-4 py-2 rounded-md bg-zinc-900/70"
                  >
                    Copy Meta
                  </button>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-12 text-zinc-400 text-sm">
            <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div>
                © {new Date().getFullYear()} QuickLink (QLYNK). All rights reserved.
                <div className="mt-1">Contact: <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></div>
              </div>

              <div className="text-right">
                <div>Version {VERSION}</div>
                <div className="text-xs text-zinc-500">Last updated: {LAST_UPDATED}</div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
