import { Button } from "@/components/button";
import Banner from "@/components/banner";
import { GithubLogo, XLogo, EnvelopeSimple, YoutubeLogo } from "@/components/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="space-y-6">
      <Banner
        imageUrl="/home-banner.png"
        alt="Banner image, that says Ben Schenk, web developer."
      />
      <div className="animate-fade-in pt-6 pb-6">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Welcome</h1>
        <p className="text-foreground mb-4 sm:text-xl">
          I&apos;m Ben, a web developer specialising in React and Next.js. I have been in the web design
          industry for around five years, and have worked on projects for startups, non-profits, and
          other businesses in industries such as education, eCommerce, and health.
        </p>
        <p className="text-muted-foreground mb-6 sm:text-lg">
          Feel free to explore my site to learn about me, my work, and my interests. Or check out my
          blog, where I discuss web development, technology, and other topics I find interesting.
        </p>
        <div className="flex space-x-4 pt-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com/pthneo" target="_blank" rel="noopener noreferrer">
              <GithubLogo className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="mailto:contact@benschenk.dev" target="_blank" rel="noopener noreferrer">
              <EnvelopeSimple className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://x.com/pthneo" target="_blank" rel="noopener noreferrer">
              <XLogo className="h-5 w-5" />
              <span className="sr-only">X</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://youtube.com/@pthneo" target="_blank" rel="noopener noreferrer">
              <YoutubeLogo className="h-5 w-5" />
              <span className="sr-only">Youtube</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
