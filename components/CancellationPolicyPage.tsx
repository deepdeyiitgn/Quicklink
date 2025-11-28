import React from 'react';
import { Helmet } from 'react-helmet';

const CancellationPolicyPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Cancellation & Refund Policy | QuickLink</title>
                <meta name="description" content="Review the QuickLink Cancellation and Refund Policy. Understand our terms for one-time payments, non-refundable subscriptions, and exceptions for technical errors." />
                <meta name="keywords" content="cancellation policy, refund policy, quicklink subscription, no refunds, payment terms" />
            </Helmet>
            <div className="glass-card p-6 md:p-8 rounded-2xl animate-fade-in">
                <div className="max-w-4xl mx-auto text-gray-300 prose prose-invert prose-p:text-gray-300 prose-h1:text-white prose-h2:text-brand-primary legal-text">
                    <h1 className="text-4xl font-bold text-white mb-6 text-center">Cancellation & Refund Policy</h1>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                    <p>
                        Thank you for purchasing a product or subscription from QuickLink. This policy outlines the terms regarding cancellations and refunds for our services.
                    </p>

                    <h2>1. Nature of Our Services</h2>
                    <p>
                        QuickLink offers digital products and subscription plans that grant immediate access to enhanced features (e.g., longer link expirations, additional credits). These are delivered as one-time payments for a fixed term and are not recurring subscriptions that auto-renew.
                    </p>

                    <h2>2. Cancellation Policy</h2>
                    <p>
                        Since our plans are activated via a single, one-time payment, there is no recurring billing to cancel. Your premium access will continue until the end of your purchased term and will expire automatically unless you choose to make another purchase to extend it.
                    </p>

                    <h2>3. General Refund Policy</h2>
                    <p>
                        <strong>All payments made to QuickLink for digital products and subscription plans are final and non-refundable.</strong>
                    </p>
                    <p>
                        Once you have paid for a subscription or product and the associated benefits have been applied to your account, you have received the full value of the purchase. As we provide irrevocable digital goods, we are unable to offer refunds, pro-rated or otherwise, for any portion of your term if you change your mind or stop using the service.
                    </p>

                    <h2>4. How to Request a Review for Technical Errors</h2>
                    <p>
                        We do not provide refunds except in cases of a demonstrable technical error on our part where the service was not rendered as described after a successful payment.
                    </p>
                    <p>
                        If you believe you have been charged in error or did not receive the purchased benefits due to a technical failure of our system, please contact our support team within <strong>seven (7) days</strong> of the transaction date.
                    </p>
                     <p>
                        To do so, please provide your account email and the transaction ID from your payment receipt. We will investigate the claim, and if a technical error on our end is confirmed, we may, at our sole discretion, issue a full or partial refund or manually apply the correct benefits to your account.
                    </p>

                     <h2>5. Contact Us</h2>
                    <p>If you have any questions about our Cancellation and Refund Policy, please contact us through the channels provided on our website.</p>
                </div>
            </div>
        </>
    );
};

export default CancellationPolicyPage;
