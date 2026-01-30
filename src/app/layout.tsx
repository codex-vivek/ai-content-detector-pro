import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered File Content Analyzer",
  description: "Advanced AI-Powered tool to detect AI-generated content, source analysis, and detailed usage reports for your documents.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased bg-background text-foreground overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Cyber Mesh Background */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>
        {children}
      </body>
    </html>
  );
}
