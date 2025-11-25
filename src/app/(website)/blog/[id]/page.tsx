import configPromise from "@payload-config";
import { getPayload } from "payload";
import { JSXConvertersFunction, RichText } from "@payloadcms/richtext-lexical/react";
import Code from "@/blocks/code/code";
import Banner from "@/components/banner";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar } from "@/components/icons";
import Image from "next/image";

// Enable incremental static regeneration
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return [];
  }
  return [];
}

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
 * Custom converter for styling all rich text elements.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    code: ({ node }: { node: any }) => (
      <Code
        code={node.fields.code}
        language={node.fields.language}
        filename={node.fields.filename}
      />
    )
  },
  heading: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    const NodeTag = node.tag;
    const headingClasses = {
      h1: "mb-6 mt-8 text-4xl font-bold text-zinc-900 dark:text-zinc-100 first:mt-0",
      h2: "mb-4 mt-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100 first:mt-0",
      h3: "mb-3 mt-6 text-2xl font-medium text-zinc-900 dark:text-zinc-100 first:mt-0",
      h4: "mb-2 mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100 first:mt-0",
      h5: "mb-2 mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100 first:mt-0",
      h6: "mb-2 mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100 first:mt-0"
    };
    return (
      <NodeTag
        className={headingClasses[NodeTag as keyof typeof headingClasses] || headingClasses.h2}>
        {children}
      </NodeTag>
    );
  },
  paragraph: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    if (!children?.length) {
      return (
        <p className="mb-4 text-justify">
          <br />
        </p>
      );
    }
    return (
      <p className="mb-4 text-justify leading-7 text-zinc-900 dark:text-zinc-200">{children}</p>
    );
  },
  link: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    const href = node.fields?.url || node.url || "#";
    const newTab = node.fields?.newTab || node.newTab;
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className="text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300">
        {children}
      </a>
    );
  },
  autolink: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    const href = node.url || "#";
    return (
      <a
        href={href}
        className="text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300">
        {children}
      </a>
    );
  },
  // Lists
  list: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    const NodeTag = node.tag;
    const listClasses = {
      ul: "mb-4 ml-6 list-disc space-y-2 text-zinc-900 dark:text-zinc-200",
      ol: "mb-4 ml-6 list-decimal space-y-2 text-zinc-900 dark:text-zinc-200"
    };
    return (
      <NodeTag className={listClasses[NodeTag as keyof typeof listClasses] || listClasses.ul}>
        {children}
      </NodeTag>
    );
  },
  listitem: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    return <li className="leading-7 text-zinc-900 dark:text-zinc-200">{children}</li>;
  },
  quote: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <blockquote className="mb-4 border-l-4 border-zinc-300 pl-4 text-zinc-700 italic dark:border-zinc-600 dark:text-zinc-300">
        {children}
      </blockquote>
    );
  },
  upload: ({ node }: { node: any; nodesToJSX: any }) => {
    const media = node.value || node;
    const imageUrl = media?.url || (media?.filename ? `/media/${media.filename}` : null);
    const altText = media?.alt || node.alt || "Image";
    
    if (!imageUrl) {
      return null;
    }
    
    return (
      <div className="flex relative w-full h-[400px] justify-center items-center mb-6">
        <Image 
          src={imageUrl} 
          alt={altText} 
          fill
          className="rounded-md"
        />
      </div>
    );
  },
  horizontalrule: () => <hr className="my-8 border-zinc-300 dark:border-zinc-700" />,
  inlinecode: ({ node, nodesToJSX }: { node: any; nodesToJSX: any }) => {
    const children = nodesToJSX({ nodes: node.children });
    return (
      <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
        {children}
      </code>
    );
  }
});

/**
 * Generates the metadata for the post.
 *
 * @param params - The parameters from the URL.
 * @returns The metadata for the post.
 */
export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  const postUrl = `/blog/${id}`;
  const thumbnailUrl = post.thumbnail?.url || "/home-og.png";
  const tags = post.tags?.map((tag: { tag: string }) => tag.tag) || [];

  return {
    title: post.title,
    description: post.excerpt || "A blog post by Ben Schenk",
    
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || "A blog post by Ben Schenk",
      url: postUrl,
      siteName: "Ben Schenk",
      locale: "en_AU",
      publishedTime: post.publishedDate ? new Date(post.publishedDate).toISOString() : undefined,
      authors: ["Ben Schenk"],
      tags: tags,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: post.thumbnail?.alt || post.title,
        }
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "A blog post by Ben Schenk",
      creator: "@pthneo",
      images: [thumbnailUrl],
    },
    
    creator: "Ben Schenk",
    publisher: "Ben Schenk",
    authors: [{ name: "Ben Schenk", url: "https://benschenk.dev" }],
    keywords: tags,
    
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="animate-fade-in flex-0 space-y-6 pb-6">
      <Banner imageUrl={post.banner.url || "/blog-banner.webp"} alt="Banner image for the post." />
      <article className="min-w-0 space-y-10 pt-6 px-4 md:px-0">
        <div>
          <h1 className="mb-4 text-3xl font-bold sm:text-4xl line-clamp-4">{post.title}</h1>
          <div className="flex items-center gap-6">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((item: { tag: string }, i: number) => (
                  <span
                    key={i}
                    className="bg-zinc-200 dark:bg-zinc-800 rounded-full max-w-44 text-justify line-clamp-1 px-3 py-1 text-sm text-zinc-900 dark:text-zinc-200">
                    {item.tag}
                  </span>
                ))}
              </div>
            )}
            {post.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-zinc-900 dark:text-zinc-200" />
                <span className="text-zinc-900 dark:text-zinc-200">
                  {new Date(post.publishedDate).toLocaleDateString("en-AU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <RichText
            data={post.content}
            converters={jsxConverters}
            className="text-zinc-900 dark:text-zinc-200"
          />
        </div>
      </article>
    </div>
  );
}
