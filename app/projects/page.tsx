import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          만든 것과 만드는 중인 것.
        </p>
      </header>
      {projects.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">아직 등록된 프로젝트가 없습니다.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
