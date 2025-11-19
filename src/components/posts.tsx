"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/select";
import { MagnifyingGlass } from "./icons";
import Image from "next/image";

type Sort = "oldest" | "newest" | "a-z" | "z-a";

export default function PostsList({
  posts
}: {
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    publishedDate: string;
    tags: Array<{ tag: string }>;
    slug: string;
    thumbnail: {
      url: string;
      alt: string;
    };
  }>;
}) {
  // Search query & sort state
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");

  const filteredPosts = useMemo(() => {
    // Filter based on the search query
    const filtered = posts.filter((post) => {
      return (
        query === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
        case "newest":
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      }
    });

    return filtered;
  }, [posts, query, sort]);

  return (
    <div className="space-y-6">
      {/* Search & sort */}
      <div className="animate-in flex w-full items-center justify-between gap-4">
        <div className="relative w-full">
          <MagnifyingGlass className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 w-[33%]">
          <p className="text-muted-foreground text-sm">Sort By</p>
          <Select value={sort} onValueChange={(value) => setSort(value as Sort)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Posts list */}
      <div className="grid grid-cols-1 gap-6">
        {filteredPosts.length === 0 ? (
          <div className="col-span-full">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug || post.id}`}
              className="group grid grid-cols-3 w-full rounded-xl p-2 lg:p-6 xl:p-8 gap-4 sm:gap-6 xl:gap-8 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900">
                <div className="relative col-span-1 flex items-center justify-center">
                  <Image
                    src={post.thumbnail.url}
                    alt={post.thumbnail.alt}
                    height={630}
                    width={1200}
                    className="rounded-sm object-contain dark:border-0"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-3 justify-start">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="flex text-zinc-600 dark:text-zinc-400 line-clamp-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-zinc-200 px-2 py-1 text-xs text-zinc-400 dark:bg-zinc-800">
                        {tag.tag}
                      </span>
                    ))}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{new Date(post.publishedDate).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
