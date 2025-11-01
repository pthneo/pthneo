// app/blog/page.tsx
import Banner from "@/components/banner";
import PostsList, { Post } from "@/components/posts";
import PostsListSkeleton from "@/components/posts-skeleton";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Check out my blog, where I discuss web development, technology, and other topics I find interesting.",
};

async function PostsData() {
  const payload = await getPayload({ config: configPromise });
  
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 1000,
    sort: '-publishedDate',
  });

  return <PostsList posts={posts as Post[]} />;
}

export default function Blog() {
  return (
    <div className="animate-fade-in space-y-6">
      <Banner imageUrl="/blog-banner.webp" alt="Banner image, that titles the page Blog." />
      <div className="px-2 pt-6">
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsData />
        </Suspense>
      </div>
    </div>
  );
}