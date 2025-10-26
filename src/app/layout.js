'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

// ✅ Fonts setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata is not supported inside 'use client' files, 
// so define it in a separate `metadata.js` or in page files, not here.

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen`}
      >
      
        <SessionProvider>
          <Header />
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
