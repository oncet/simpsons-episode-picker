import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Header } from "../components/header";
import { ThemeProvider } from "../components/theme-prodivers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Simpsons Episode Picker",
  description: "Random Simpsons episode picker",
  // manifest: "/manifest.json",
  // themeColor: "white",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark:bg-slate-900 dark:text-slate-300">
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
