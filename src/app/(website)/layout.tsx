import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationPane from "@/components/navigation-pane";

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

export const metadata: Metadata = {
  title: {
    default: "Ben Schenk: Web Developer",
    template: "%s | Ben Schenk"
  },
  description: "Hi! I'm Ben, a web developer. Visit my website to learn more about me and my work.",
  icons: [{ rel: "icon", url: "/icon.png" }]
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
          fontBody.variable
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <div className="container mx-auto flex max-h-screen max-w-4xl flex-col px-4 pt-8 md:pt-16 lg:max-w-7xl lg:flex-row lg:pb-16">
            <div className="lg:sticky lg:top-4 lg:self-start">
              <NavigationPane />
            </div>
            <main className="max-h-screen flex-1 p-0 md:pr-4 lg:pt-5 lg:pl-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
