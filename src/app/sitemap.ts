import { MetadataRoute } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://benschenk.dev";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const payload = await getPayload({ config: configPromise });
    const { docs: posts } = await payload.find({
      collection: "posts",
      limit: 1000,
      sort: "-publishedDate",
    });

    const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug || post.id}`,
      lastModified: post.updatedAt
        ? new Date(post.updatedAt)
        : post.publishedDate
          ? new Date(post.publishedDate)
          : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogPosts];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}

