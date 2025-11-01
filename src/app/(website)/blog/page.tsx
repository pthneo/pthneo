import Banner from "@/components/banner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Check out my blog, where I discuss web development, technology, and other topics I find interesting.",
};

export default function Blog() {
  return (
    <div className="animate-fade-in space-y-6">
      <Banner imageUrl="/blog-banner.webp" alt="Banner image, that titles the page Blog." />
      <div className="px-2 pt-6">
        <h1 className="mb-4 text-4xl font-bold">Insert</h1>
      </div>
    </div>
  );
}
