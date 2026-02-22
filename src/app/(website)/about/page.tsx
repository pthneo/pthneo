

import Banner from "@/components/banner";
import { Metadata } from "next";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/avatar";
import { User } from "@/components/icons";
import { ProgressBar } from "@/components/progress";
import { SpotifyNowPlaying } from "@/components/spotify";

export const metadata: Metadata = {
  title: "About Me",
  description: "Find out more about me, my background in law and web development, and my skills.",
  openGraph: {
    title: "About Me | Ben Schenk",
    url: "/about",
    images: [
      {
        url: "/about-og.png",
        width: 1200,
        height: 630,
        alt: "About Me | Ben Schenk",
      },
    ],
  },
  twitter: {
    title: "About Me | Ben Schenk",
    description: "Find out more about me, my background in law and web development, and my skills.",
    images: ["/about-og.png"],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutMe() {
  return (
    <div className="animate-fade-in space-y-6 pb-6">
      <Banner imageUrl="/about-banner.webp" alt="Banner image, that titles the page About Me." />
      <div className="flex w-full flex-col space-y-8 px-2 pt-6">
        <div className="flex gap-6">
          <div className="relative size-24 md:size-32 lg:size-44 flex-shrink-0">
            <Avatar className="h-full w-full">
              <AvatarImage src="/me.jpg" alt="An image of myself." className="h-full w-full" />
              <AvatarFallback className="h-full w-full">
                <User weight="thin" className="h-24 w-24" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <p className="text-foreground mb-4 sm:text-lg">
              Nice to meet you! I&apos;m a law student turned software developer, working mainly on
              the web. I freelance for small businesses, startups and non-profits, as well as
              building my own applications.
            </p>
            <p className="text-foreground mb-4 sm:text-lg">
              I specialise in building fullstack apps for the web, but I also build APIs,
              microservices, mobile applications and games. I also tutor in web development and 
              computer science.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-4 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold">What I&apos;m Working On</h2>
              <div className="flex items-center gap-4">
                <ProgressBar
                  value={5}
                  size={80}
                />
                <div>
                  <p className="font-semibold">Buckle</p>
                  <p className="text-sm text-muted-foreground">An open-source orchestration and introspection UI for web projects. </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressBar
                  value={10}
                  size={80}
                />
                <div>
                  <p className="font-semibold">Chronostasis</p>
                  <p className="text-sm text-muted-foreground">Advanced finance management, made fast and intuitive. </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ProgressBar
                  value={45}
                  size={80}
                />
                <div>
                  <p className="font-semibold">Morgana</p>
                  <p className="text-sm text-muted-foreground">The perfect companion tool for your next TTRPG campaign.</p>
                </div>
              </div>
            </div>
            <SpotifyNowPlaying />
        </div>
      </div>
    </div>
  );
}
