// app/blog/page.tsx
import Banner from "@/components/banner";
import PostsList from "@/components/posts";
import PostsListSkeleton from "@/components/posts-skeleton";
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Check out my blog, where I discuss web development, technology, and other topics I find interesting.",
};

/**
 * Retrieves the list of posts from the Payload database.
 */
async function PostsData() {
  const payload = await getPayload({ config: configPromise });
  
  const { docs: posts } = await payload.find({
    collection: 'posts',
    limit: 1000,
    sort: '-publishedDate',
  });

  const postsData = posts.map((post) => ({
    id: post.id.toString(),
    title: post.title,
    excerpt: post.excerpt,
    publishedDate: post.publishedDate.toString(),
    tags: post.tags.map((tag: { tag: string }) => ({ tag: tag.tag })),
    slug: post.slug.toString(),
    thumbnail: {
      url: post.thumbnail.url,
      alt: post.thumbnail.alt,
    },
  }));

  return <PostsList posts={postsData} />;
}

/**
 * A simple blog page.
 */
export default function Blog() {
  return (
    <div className="animate-in space-y-6 pb-6">
      <Banner imageUrl="/blog-banner.webp" alt="Banner image, that titles the page Blog." />
      <div className="pt-6">
        <Suspense fallback={<PostsListSkeleton />}>
          <PostsData />
        </Suspense>
      </div>
    </div>
  );
}