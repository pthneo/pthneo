import Banner from "@/components/banner";
import ProjectsList from "@/components/projects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Find out more about my latest web development and software projects, and view some website demos.",
};

export default function Projects() {
  return (
    <div className="animate-fade-in space-y-6 pb-20">
      <Banner imageUrl="/projects-banner.webp" alt="Banner image, that titles the page Projects." />
      <div className="pt-6">
        <ProjectsList />
      </div>
    </div>
  );
}
