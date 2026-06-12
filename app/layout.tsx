import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreelanceHub — Find work, hire talent",
  description:
    "FreelanceHub connects clients and freelancers. Post jobs, apply, and get hired.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 w-full mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
        <footer className="mt-auto border-t border-border bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-muted">
            FreelanceHub &copy; {new Date().getFullYear()} — All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
