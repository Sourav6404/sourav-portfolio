import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

import { db } from "../lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await db.getSettings();
    const name = settings?.profileName || "Sourav Kuriakose";
    const title = settings?.profileTitle || "Full-Stack Developer & AI Systems Engineer";
    const bio = settings?.bio || "Dynamic personal portfolio.";
    
    return {
      title: `${name} | ${title}`,
      description: bio,
      keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "Supabase", "TypeScript"],
      authors: [{ name }],
      openGraph: {
        title: `${name} | ${title}`,
        description: bio,
        type: "website",
      }
    };
  } catch (err) {
    console.error("Error generating dynamic metadata", err);
    return {
      title: "Sourav Kuriakose | Full-Stack Developer & AI Systems Engineer",
      description: "Dynamic personal portfolio.",
    };
  }
}

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
      <body className="min-h-full flex flex-col bg-[#08070e] text-[#f4f4f7]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
