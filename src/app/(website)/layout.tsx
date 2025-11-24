import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body"
});

const fontHeading = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading"
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://benschenk.dev"),
  title: {
    default: "Ben Schenk: Web Developer",
    template: "%s | Ben Schenk"
  },
  description: "Hi! I'm Ben, a web developer. Visit my website to learn more about me and my work.",
  keywords: ["web developer", "React", "Next.js", "fullstack developer", "freelance developer", "TypeScript"],
  authors: [{ name: "Ben Schenk", url: "https://benschenk.dev" }],
  creator: "Ben Schenk",
  publisher: "Ben Schenk",
  alternates: {
    canonical: "https://benschenk.dev",
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://benschenk.dev",
    siteName: "Ben Schenk",
    title: "Ben Schenk | Web Developer",
    description: "Hi! I'm Ben, a web developer. Visit my website to learn more about me and my work.",
    images: [
      {
        url: "/home-og.png",
        width: 1200,
        height: 630,
        alt: "Ben Schenk | Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ben Schenk | Web Developer",
    description: "Hi! I'm Ben, a web developer. Visit my website to learn more about me and my work.",
    creator: "@pthneo",
    site: "@pthneo",
    images: ["/home-og.png"],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "styled-scrollbar antialiased",
          fontHeading.variable,
          fontBody.variable,
          fontMono.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="container mx-auto flex max-w-4xl flex-col px-4 pt-8 md:pt-16 lg:max-w-7xl lg:flex-row lg:pb-8">
            <Sidebar />
            <main className="flex-1 min-w-0 p-0 md:pr-4 lg:pt-5 lg:pl-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
