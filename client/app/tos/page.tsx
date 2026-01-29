import React from 'react'

export const metadata = {
    title: 'Terms of Service – RemindMe Discord Bot | User Agreement & Guidelines',
    description: 'Official Terms of Service for RemindMe Discord Bot. Understand your rights, responsibilities, and our service guidelines. Covers acceptable use, data handling, liability limitations, intellectual property, and user obligations for our reminder service.',
    keywords: 'RemindMe terms of service, Discord bot terms, user agreement, service guidelines, acceptable use policy, bot terms and conditions, reminder bot agreement, user responsibilities',
    authors: [{ name: 'RemindMe Team' }],
    creator: 'RemindMe',
    publisher: 'RemindMe',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: 'Terms of Service – RemindMe Discord Bot',
        description: 'Official Terms of Service for RemindMe Discord Bot. Learn about user rights, responsibilities, and service guidelines.',
        url: 'https://remindme.bot/tos',
        siteName: 'RemindMe Bot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Terms of Service – RemindMe Discord Bot',
        description: 'Official Terms of Service for RemindMe Discord Bot. User agreement and service guidelines.',
    },
    alternates: {
        canonical: 'https://remindme.bot/tos',
    },
}

const TermsOfService = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service",
        "description": "Terms of Service for RemindMe Discord Bot",
        "url": "https://remindme.bot/tos",
        "publisher": {
            "@type": "Organization",
            "name": "RemindMe",
            "url": "https://remindme.bot"
        },
        "datePublished": "2026-01-29",
        "dateModified": "2026-01-29",
        "inLanguage": "en-US"
    };

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <div className="max-w-4xl mx-auto px-6 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-black">
                        Last Updated: January 29, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">

                    {/* Introduction */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            Welcome to RemindMe. By using our Discord bot and related services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                        </p>
                        <p className="text-black leading-relaxed mb-4">
                            These Terms constitute a legally binding agreement between you and RemindMe. We reserve the right to modify these Terms at any time, and your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.
                        </p>
                        <p className="text-black leading-relaxed">
                            By using RemindMe, you represent that you are at least 13 years of age and have the legal capacity to enter into these Terms.
                        </p>
                    </section>

                    {/* Description of Service */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            2. Description of Service
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            RemindMe is a Discord bot that provides the following features:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Natural language reminder creation using AI processing</li>
                            <li>One-time, daily, and weekly recurring reminders</li>
                            <li>Reminder notifications via Discord DM and email</li>
                            <li>Optional Google Calendar integration for event syncing</li>
                            <li>User profile management including email and timezone settings</li>
                            <li>Reminder management (create, view, update, delete)</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.
                        </p>
                    </section>

                    {/* User Accounts and Responsibilities */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            3. User Accounts and Responsibilities
                        </h2>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            3.1 Account Creation
                        </h3>
                        <p className="text-black leading-relaxed mb-4">
                            To use RemindMe, you must have a valid Discord account. You are responsible for maintaining the security of your Discord account and for all activities that occur under your account.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            3.2 Accurate Information
                        </h3>
                        <p className="text-black leading-relaxed mb-4">
                            You agree to provide accurate and complete information when using our Service, including a valid email address for reminder notifications. You are responsible for keeping this information up to date.
                        </p>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            3.3 Prohibited Conduct
                        </h3>
                        <p className="text-black leading-relaxed mb-3">
                            You agree not to:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li>Use the Service for any illegal or unauthorized purpose</li>
                            <li>Attempt to gain unauthorized access to our systems or networks</li>
                            <li>Interfere with or disrupt the Service or servers</li>
                            <li>Use the Service to spam, harass, or abuse others</li>
                            <li>Attempt to reverse engineer, decompile, or disassemble the bot</li>
                            <li>Use automated scripts or bots to interact with our Service</li>
                            <li>Violate Discord's Terms of Service or Community Guidelines</li>
                            <li>Store or transmit malicious code through the Service</li>
                            <li>Collect or harvest any personally identifiable information from other users</li>
                        </ul>
                    </section>

                    {/* Data and Privacy */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            4. Data and Privacy
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
                        </p>
                        <p className="text-black leading-relaxed mb-3">
                            By using RemindMe, you acknowledge and agree that:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li>We collect and store your Discord ID, email address, reminder content, and preferences</li>
                            <li>We use AI services (Groq API) to process your reminder requests</li>
                            <li>We send reminder notifications via Discord and email</li>
                            <li>If you enable Google Calendar integration, we access and sync your calendar data</li>
                            <li>You are responsible for the content of your reminders and any data you provide</li>
                        </ul>
                    </section>

                    {/* Intellectual Property */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            5. Intellectual Property Rights
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            The Service, including but not limited to its code, design, graphics, and content, is owned by RemindMe and is protected by copyright, trademark, and other intellectual property laws.
                        </p>
                        <p className="text-black leading-relaxed mb-4">
                            You retain ownership of the content you create through the Service (such as reminder text). By using the Service, you grant us a limited license to use, store, and process your content solely for the purpose of providing the Service to you.
                        </p>
                        <p className="text-black leading-relaxed">
                            You may not copy, modify, distribute, sell, or lease any part of our Service without our express written permission.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            6. Third-Party Services and Links
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            RemindMe integrates with and relies on third-party services, including:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li><strong>Discord:</strong> Subject to Discord's Terms of Service</li>
                            <li><strong>Resend:</strong> For email delivery</li>
                            <li><strong>Groq API:</strong> For natural language processing</li>
                            <li><strong>Google Calendar API:</strong> For optional calendar integration</li>
                            <li><strong>MongoDB Atlas:</strong> For data storage</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            We are not responsible for the content, policies, or practices of these third-party services. Your use of these services is subject to their respective terms and conditions.
                        </p>
                    </section>

                    {/* Service Availability */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            7. Service Availability and Modifications
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            We strive to provide reliable and uninterrupted service, but we do not guarantee that the Service will always be available, error-free, or free from interruptions. We may experience downtime due to maintenance, updates, or technical issues.
                        </p>
                        <p className="text-black leading-relaxed mb-4">
                            We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.
                        </p>
                        <p className="text-black leading-relaxed">
                            We may also impose limits on certain features or restrict your access to parts or all of the Service without notice or liability.
                        </p>
                    </section>

                    {/* Disclaimer of Warranties */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            8. Disclaimer of Warranties
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                        </p>
                        <p className="text-black leading-relaxed mb-4">
                            We do not warrant that:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>The Service will meet your specific requirements or expectations</li>
                            <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                            <li>Reminders will always be delivered on time or at all</li>
                            <li>Any errors or defects in the Service will be corrected</li>
                            <li>The Service is free from viruses or other harmful components</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            You acknowledge that RemindMe is a convenience tool and should not be relied upon for critical, time-sensitive, or life-important reminders. We are not responsible for any consequences resulting from missed or delayed reminders.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            9. Limitation of Liability
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, REMINDME AND ITS AFFILIATES, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Your access to or use of (or inability to access or use) the Service</li>
                            <li>Any conduct or content of any third party on the Service</li>
                            <li>Unauthorized access, use, or alteration of your data</li>
                            <li>Missed, delayed, or failed reminder notifications</li>
                            <li>Any other matter relating to the Service</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION EXCEED THE AMOUNT YOU HAVE PAID US IN THE LAST SIX (6) MONTHS, OR, IF GREATER, ONE HUNDRED DOLLARS ($100).
                        </p>
                    </section>

                    {/* Indemnification */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            10. Indemnification
                        </h2>
                        <p className="text-black leading-relaxed">
                            You agree to indemnify, defend, and hold harmless RemindMe and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any rights of another party; or (d) your violation of any applicable laws or regulations.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            11. Termination
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice, and without liability. Reasons for termination may include, but are not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Violation of these Terms</li>
                            <li>Fraudulent, abusive, or illegal activity</li>
                            <li>Extended periods of inactivity</li>
                            <li>Requests by law enforcement or government agencies</li>
                        </ul>
                        <p className="text-black leading-relaxed mb-4">
                            You may stop using the Service at any time. To request deletion of your data, please contact us at the email address provided in Section 16.
                        </p>
                        <p className="text-black leading-relaxed">
                            Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            12. Governing Law and Dispute Resolution
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RemindMe operates, without regard to its conflict of law provisions.
                        </p>
                        <p className="text-black leading-relaxed mb-4">
                            Any disputes arising out of or relating to these Terms or the Service shall first be attempted to be resolved through good faith negotiations. If the dispute cannot be resolved through negotiation, it shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration association.
                        </p>
                        <p className="text-black leading-relaxed">
                            You agree to waive any right to a jury trial or to participate in a class action lawsuit or class-wide arbitration.
                        </p>
                    </section>

                    {/* Changes to Terms */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            13. Changes to These Terms
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Updating the "Last Updated" date at the top of these Terms</li>
                            <li>Posting a notice through the bot or in our Discord server</li>
                            <li>Sending an email notification (if you have provided an email address)</li>
                        </ul>
                        <p className="text-black leading-relaxed mb-4">
                            Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. If you do not agree to the modified Terms, you must stop using the Service.
                        </p>
                        <p className="text-black leading-relaxed">
                            It is your responsibility to review these Terms periodically for changes.
                        </p>
                    </section>

                    {/* Severability */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            14. Severability
                        </h2>
                        <p className="text-black leading-relaxed">
                            If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole. Such provisions shall be deleted without affecting the remaining provisions herein.
                        </p>
                    </section>

                    {/* Entire Agreement */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            15. Entire Agreement
                        </h2>
                        <p className="text-black leading-relaxed">
                            These Terms, together with our Privacy Policy, constitute the entire agreement between you and RemindMe regarding the use of the Service and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Service.
                        </p>
                    </section>

                    {/* Contact Information */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            16. Contact Us
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
                        </p>
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <p className="text-black mb-2">
                                <strong>Email:</strong> <a href="mailto:armanthakur200814@gmail.com" className="text-blue-600 hover:underline">armanthakur200814@gmail.com</a>
                            </p>
                            <p className="text-black mb-2">
                                <strong>Discord Support:</strong> <a href="https://discordapp.com/users/1212050219538325516" className="text-blue-600 hover:underline">Contact us on Discord</a>
                            </p>
                            <p className="text-black">
                                <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                            </p>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            17. Acknowledgment
                        </h2>
                        <p className="text-black leading-relaxed">
                            BY USING THE SERVICE, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT USE THE SERVICE.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-center text-black text-sm">
                        These Terms of Service are effective as of January 29, 2026 and will remain in effect except with respect to any changes in their provisions in the future, which will be in effect immediately after being posted on this page.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TermsOfService
