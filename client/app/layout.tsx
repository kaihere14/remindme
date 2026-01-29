import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RemindMe – Discord Reminder Bot | AI-Powered Task Reminders",
    template: "%s | RemindMe Bot",
  },
  description:
    "RemindMe is a powerful Discord bot that helps you set and manage reminders using natural language. Get notified via Discord DM and email. Supports one-time, daily, and weekly recurring reminders with optional Google Calendar integration.",
  keywords: [
    "Discord bot",
    "reminder bot",
    "Discord reminders",
    "task management",
    "AI reminders",
    "natural language reminders",
    "Discord notifications",
    "email reminders",
    "Google Calendar sync",
    "productivity bot",
  ],
  authors: [{ name: "RemindMe Team" }],
  creator: "RemindMe",
  publisher: "RemindMe",
  applicationName: "RemindMe Discord Bot",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "RemindMe – Discord Reminder Bot",
    description:
      "Set reminders directly from Discord using natural language. Never forget tasks again with AI-powered reminder management.",
    url: "https://remindme.bot",
    siteName: "RemindMe Bot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RemindMe – Discord Reminder Bot",
    description:
      "Set reminders directly from Discord using natural language. AI-powered task management.",
  },
  alternates: {
    canonical: "https://remindme.bot",
  },
  category: "productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
