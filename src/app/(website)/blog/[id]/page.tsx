import configPromise from "@payload-config";
import { getPayload } from "payload";
import { JSXConvertersFunction, RichText } from "@payloadcms/richtext-lexical/react";
import Code from "@/blocks/code/code";
import Banner from "@/components/banner";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "@/components/icons";

/**
 * Retrieves a post from the database by its slug.
 *
 * @param slug - The slug of the post to retrieve.
 * @returns The post if found, otherwise null.
 */
async function getPost(slug: string) {
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: "posts",
    where: {
      slug: {
        equals: slug
      }
    },
    limit: 1
  });

  return docs[0] || null;
}

/**
 * Custom converter for the codeblock component.
 */
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    code: ({ node }: { node: any }) => (
      <Code
        code={node.fields.code}
        language={node.fields.language}
        filename={node.fields.filename}
      />
    )
  }
});

/**
 * Generates the metadata for the post.
 *
 * @param params - The parameters from the URL.
 * @returns The metadata for the post.
 */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getPost(params.id);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: post.title,
    description: post.excerpt || "A blog post by Ben Schenk",
    openGraph: {
      title: post.title,
      description: post.excerpt || "A blog post by Ben Schenk",
      images: [post.thumbnail.url]
    },
    twitter: {
      title: post.title,
      description: post.excerpt || "A blog post by Ben Schenk",
      images: [post.thumbnail.url]
    }
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="animate-fade-in space-y-6 pb-6">
      <Banner imageUrl={post.banner.url || "/blog-banner.webp"} alt="Banner image for the post." />
      <article className="space-y-10 pt-6">
        <div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl">{post.title}</h1>
          <div className="flex items-center gap-6">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((item: { tag: string }, i: number) => (
                  <span key={i} className="bg-muted rounded-full px-3 py-1 text-sm text-zinc-900 dark:text-zinc-200">
                    {item.tag}
                  </span>
                ))}
              </div>
            )}
            {post.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-zinc-900 dark:text-zinc-200" />
                <span className="text-zinc-900 dark:text-zinc-200">{new Date(post.publishedDate).toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
        <RichText data={post.content} converters={jsxConverters} className="text-zinc-900 dark:text-zinc-200"/>
      </article>
    </div>  
  );
}
