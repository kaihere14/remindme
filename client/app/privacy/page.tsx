import React from 'react'

export const metadata = {
    title: 'Privacy Policy – RemindMe Discord Bot | Data Protection & User Privacy',
    description: 'Comprehensive privacy policy for RemindMe Discord Bot. Learn how we collect, use, store, and protect your personal data including Discord ID, email addresses, and reminder content. GDPR and CCPA compliant. Google API Services User Data Policy adherence.',
    keywords: 'RemindMe privacy policy, Discord bot privacy, data protection, GDPR compliance, CCPA compliance, Google API user data policy, reminder bot privacy, data security, user rights',
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
        title: 'Privacy Policy – RemindMe Discord Bot',
        description: 'Learn how RemindMe Discord Bot collects, uses, and protects your data. GDPR & CCPA compliant. Google API Services User Data Policy adherence.',
        url: 'https://remindme.bot/privacy',
        siteName: 'RemindMe Bot',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy – RemindMe Discord Bot',
        description: 'Learn how RemindMe Discord Bot collects, uses, and protects your data. GDPR & CCPA compliant.',
    },
    alternates: {
        canonical: 'https://remindme.bot/privacy',
    },
}

const PrivacyPolicy = () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "Privacy Policy for RemindMe Discord Bot",
        "url": "https://remindme.bot/privacy",
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
                    <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-black mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-black dark:text-black">
                        Last Updated: January 29, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">

                    {/* Introduction */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            1. Introduction
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            Welcome to RemindMe ("we," "our," or "us"). RemindMe is a Discord bot that helps users set and manage reminders using natural language processing. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Discord bot and related services.
                        </p>
                        <p className="text-black leading-relaxed">
                            By using RemindMe, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            2. Information We Collect
                        </h2>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            2.1 Information You Provide
                        </h3>
                        <p className="text-black leading-relaxed mb-3">
                            We collect information that you voluntarily provide when using our bot:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li><strong>Discord User ID:</strong> Your unique Discord identifier, automatically provided by Discord when you interact with the bot</li>
                            <li><strong>Email Address:</strong> When you use the <code>/email</code> or <code>/change-email</code> commands to receive reminder notifications</li>
                            <li><strong>Reminder Content:</strong> The text, titles, and timing information you provide when creating reminders using the <code>/reminder</code> command</li>
                            <li><strong>Timezone Preference:</strong> Your timezone setting for accurate reminder scheduling (defaults to UTC if not specified)</li>
                            <li><strong>Google Calendar Data (Optional):</strong> If you choose to enable Google Calendar integration, we collect a refresh token to sync calendar events with your reminders</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            2.2 Automatically Collected Information
                        </h3>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li><strong>Usage Data:</strong> Timestamps of when reminders are created, sent, and archived</li>
                            <li><strong>Interaction Logs:</strong> Records of bot commands you execute for service improvement and debugging</li>
                            <li><strong>Technical Data:</strong> Information necessary for the bot to function, such as message delivery status</li>
                        </ul>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            We use the collected information for the following purposes:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li><strong>Service Delivery:</strong> To send you reminder notifications via Discord DM and email at the scheduled times</li>
                            <li><strong>Reminder Management:</strong> To create, store, update, and delete your reminders as requested</li>
                            <li><strong>Natural Language Processing:</strong> To process your reminder requests using AI (Groq API) to understand timing and content</li>
                            <li><strong>Calendar Integration:</strong> To sync reminders with your Google Calendar if you enable this optional feature</li>
                            <li><strong>Service Improvement:</strong> To analyze usage patterns and improve bot functionality</li>
                            <li><strong>Communication:</strong> To send you service-related notifications and respond to your inquiries</li>
                            <li><strong>Security:</strong> To detect, prevent, and address technical issues and abuse</li>
                        </ul>
                    </section>

                    {/* Data Storage and Security */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            4. Data Storage and Security
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            We take the security of your data seriously and implement appropriate technical and organizational measures:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li><strong>Database:</strong> Your data is stored in a secure MongoDB database with access controls and encryption</li>
                            <li><strong>Data Retention:</strong> We retain your data only as long as necessary to provide our services or as required by law</li>
                            <li><strong>Access Control:</strong> Only authorized personnel have access to user data, and only when necessary for service operation</li>
                            <li><strong>Encryption:</strong> Data transmission is encrypted using industry-standard protocols</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            5. Third-Party Services
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            RemindMe integrates with the following third-party services to provide functionality:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-3">
                            <li>
                                <strong>Discord:</strong> We use Discord's API to send you direct messages and interact with you through the bot. Discord's privacy policy applies to their platform.
                            </li>
                            <li>
                                <strong>Resend:</strong> We use Resend to send reminder emails to your provided email address. Resend's privacy policy governs their handling of email data.
                            </li>
                            <li>
                                <strong>Groq API:</strong> We use Groq's AI service to process natural language reminder requests. Your reminder text is sent to Groq for parsing but is not stored by them.
                            </li>
                            <li>
                                <strong>Google Calendar API (Optional):</strong> If you enable calendar integration, we use Google's Calendar API to sync events. Google's privacy policy applies to this data.
                            </li>
                            <li>
                                <strong>MongoDB Atlas:</strong> Our database provider for storing user and reminder data securely.
                            </li>
                        </ul>
                    </section>

                    {/* Data Sharing and Disclosure */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            6. Data Sharing and Disclosure
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li><strong>Service Providers:</strong> With third-party services mentioned above that help us operate the bot (Discord, Resend, Groq, Google, MongoDB)</li>
                            <li><strong>Legal Requirements:</strong> If required by law, court order, or governmental authority</li>
                            <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, and that of our users</li>
                            <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, or acquisition (users will be notified)</li>
                        </ul>
                    </section>

                    {/* Your Rights and Choices */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            7. Your Rights and Choices
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            You have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li><strong>Access:</strong> View your profile and all active reminders using the <code>/profile</code> and <code>/list-reminder</code> commands</li>
                            <li><strong>Update:</strong> Change your email address using the <code>/change-email</code> command</li>
                            <li><strong>Delete:</strong> Remove individual reminders using the <code>/delete-reminder</code> command</li>
                            <li><strong>Opt-Out:</strong> Stop using the bot at any time by not interacting with it</li>
                            <li><strong>Data Deletion:</strong> Request complete deletion of your account and all associated data by contacting us</li>
                            <li><strong>Data Portability:</strong> Request a copy of your data in a machine-readable format</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            To exercise these rights or for any privacy-related questions, please contact us using the information provided in Section 11.
                        </p>
                    </section>

                    {/* Google API Services */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            8. Google API Services User Data Policy
                        </h2>
                        <p className="text-black leading-relaxed mb-3">
                            RemindMe's use and transfer of information received from Google APIs adheres to the{' '}
                            <a
                                href="https://developers.google.com/terms/api-services-user-data-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Google API Services User Data Policy
                            </a>, including the Limited Use requirements.
                        </p>
                        <p className="text-black leading-relaxed mb-3">
                            Specifically:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li>We only request access to Google Calendar data if you explicitly enable calendar integration</li>
                            <li>We use Google Calendar data solely to sync calendar events with your reminders</li>
                            <li>We do not share Google user data with third parties except as necessary to provide our service</li>
                            <li>We do not use Google user data for advertising purposes</li>
                            <li>You can revoke RemindMe's access to your Google Calendar at any time through your Google Account settings</li>
                        </ul>
                    </section>

                    {/* Children's Privacy */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            9. Children's Privacy
                        </h2>
                        <p className="text-black leading-relaxed">
                            RemindMe is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems.
                        </p>
                    </section>

                    {/* Changes to This Privacy Policy */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            10. Changes to This Privacy Policy
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Updating the "Last Updated" date at the top of this Privacy Policy</li>
                            <li>Posting a notice in our Discord server or through the bot</li>
                            <li>Sending an email notification for significant changes (if you have provided an email)</li>
                        </ul>
                        <p className="text-black leading-relaxed">
                            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                        </p>
                    </section>

                    {/* Contact Us */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            11. Contact Us
                        </h2>
                        <p className="text-black leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                        </p>
                        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
                            <p className="text-black mb-2">
                                <strong>Email:</strong> <a href="mailto:armanthakur200814@gmail.com" className="text-blue-600 hover:underline">armanthakur200814@gmail.com</a>
                            </p>
                            <p className="text-black mb-2">
                                <strong>Discord Support:</strong> <a href="https://discordapp.com/users/1212050219538325516" className="text-blue-600 hover:underline">Join our server</a>
                            </p>
                            <p className="text-black">
                                <strong>Response Time:</strong> We aim to respond to all inquiries within 48 hours
                            </p>
                        </div>
                    </section>

                    {/* Data Protection Rights (GDPR/CCPA) */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            12. Additional Rights for EU and California Residents
                        </h2>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            For EU Residents (GDPR)
                        </h3>
                        <p className="text-black leading-relaxed mb-3">
                            If you are located in the European Economic Area (EEA), you have additional rights under GDPR:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2 mb-4">
                            <li>Right to access your personal data</li>
                            <li>Right to rectification of inaccurate data</li>
                            <li>Right to erasure ("right to be forgotten")</li>
                            <li>Right to restrict processing</li>
                            <li>Right to data portability</li>
                            <li>Right to object to processing</li>
                            <li>Right to withdraw consent at any time</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-black mb-3 mt-6">
                            For California Residents (CCPA)
                        </h3>
                        <p className="text-black leading-relaxed mb-3">
                            If you are a California resident, you have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-black space-y-2">
                            <li>Know what personal information is collected, used, shared, or sold</li>
                            <li>Delete personal information held by us</li>
                            <li>Opt-out of the sale of personal information (we do not sell personal information)</li>
                            <li>Non-discrimination for exercising your CCPA rights</li>
                        </ul>
                    </section>

                    {/* Consent */}
                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold text-black mb-4">
                            13. Consent
                        </h2>
                        <p className="text-black leading-relaxed">
                            By using RemindMe, you consent to this Privacy Policy and agree to its terms. Your continued use of the service after any modifications to this Privacy Policy will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-200">
                    <p className="text-center text-black text-sm">
                        This privacy policy is effective as of January 29, 2026 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy