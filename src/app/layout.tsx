import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Mercer | AI Engineer & Full-Stack Architect",
  description: "Dynamic personal portfolio showcasing multi-agent AI platforms, scalable full-stack applications, and technical articles.",
  keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "LangGraph", "Supabase", "TypeScript"],
  authors: [{ name: "Alex Mercer" }],
  openGraph: {
    title: "Alex Mercer | AI Engineer & Full-Stack Architect",
    description: "Dynamic portfolio showcasing multi-agent AI systems and full-stack solutions.",
    type: "website",
  }
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
      <body className="min-h-full flex flex-col bg-[#08070e] text-[#f4f4f7]">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
