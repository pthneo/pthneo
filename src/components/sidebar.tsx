"use client";

import Link from "next/link";
import { User } from "./icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { NavigationSheet } from "./navigation-sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

/**
 * A sidebar component for the website.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-card mb-0 w-full lg:w-64 lg:h-[calc(100vh-2rem)] lg:flex lg:flex-col">
      <nav className="space-y-4 lg:p-4">
        <div className="mb-8 flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-12">
              <AvatarImage src="profile.jpeg" className="size-12" />
              <AvatarFallback className="size-12">
                <User weight="thin" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Ben Schenk</h1>
              <p className="text-muted-foreground text-sm">Web Developer</p>
            </div>
          </div>
          <NavigationSheet />
        </div>
        <ul className="hidden space-y-2 lg:block">
          <li>
            <Link
              href="/"
              className={cn(
                "hover:bg-accent block rounded px-4 py-2 transition-colors",
                pathname === "/"
                  ? "dark:hover:bg-muted bg-zinc-200 dark:bg-zinc-900"
                  : "hover:bg-accent"
              )}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={cn(
                "hover:bg-accent block rounded px-4 py-2 transition-colors",
                pathname === "/about"
                  ? "dark:hover:bg-muted bg-zinc-200 dark:bg-zinc-900"
                  : "hover:bg-accent"
              )}>
              About Me
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={cn(
                "hover:bg-accent block rounded px-4 py-2 transition-colors",
                pathname === "/projects"
                  ? "dark:hover:bg-muted bg-zinc-200 dark:bg-zinc-900"
                  : "hover:bg-accent"
              )}>
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={cn(
                "hover:bg-accent block rounded px-4 py-2 transition-colors",
                pathname === "/blog"
                  ? "dark:hover:bg-muted bg-zinc-200 dark:bg-zinc-900"
                  : "hover:bg-accent"
              )}>
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hidden lg:mt-auto lg:block lg:p-4">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <p className="text-muted-foreground hidden pl-3 text-sm lg:block">© 2025 Ben Schenk</p>
        </div>
      </div>
    </aside>
  );
}
