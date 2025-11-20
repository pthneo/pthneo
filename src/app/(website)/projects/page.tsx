import Banner from "@/components/banner";
import ProjectsList from "@/components/projects";
import ProjectsListSkeleton from "@/components/projects-skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Find out more about my latest web development and software projects, and view some website demos.",
};

export default function Projects() {
  return (
    <div className="animate-fade-in space-y-6 pb-6">
      <Banner imageUrl="/projects-banner.webp" alt="Banner image, that titles the page Projects." />
      <div className="pt-6">
        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  );
}