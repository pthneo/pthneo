"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/sheet";
import { useMediaQuery } from "@/components/use-media-query";
import { List, User } from "@/components/icons";
import { Button } from "@/components/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";

export function NavigationSheet() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <List className="h-6 w-6" />
          <span className="sr-only">Open Navigation Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-white dark:bg-black">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>Use the links below to navigate the site.</SheetDescription>
        </SheetHeader>
        <div className="flex h-full p-8 flex-col justify-between">
          <div className="mt-0.5 flex flex-col">
            <div className="flex items-center gap-4 pb-10">
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
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="ml-1 w-fit pb-4 text-lg font-bold">
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="ml-1 w-fit pb-4 text-lg font-bold">
              About Me
            </Link>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="ml-1 w-fit pb-4 text-lg font-bold">
              Projects
            </Link>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="ml-1 w-fit pb-4 text-lg font-bold">
              Blog
            </Link>
          </div>
          <div className="ml-1 flex justify-start gap-2">
            <ThemeToggle />
            <p className="text-muted-foreground text-sm mt-2">© 2025 Ben Schenk</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
