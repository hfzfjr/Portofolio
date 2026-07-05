import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import IntroAnimation from "@/components/intro/IntroAnimation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { type Locale } from "@/lib/i18n/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hafizfajar.com'),
  title: "Hafiz Fajar - Portfolio",
  description: "Portfolio of Hafiz Fajar, Informatics Student at Telkom University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <IntroAnimation>{children}</IntroAnimation>
        </ThemeProvider>
      </body>
    </html>
  );
}
