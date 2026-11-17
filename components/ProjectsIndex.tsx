// 프로젝트 목록 화면 본체. /projects, /en/projects, /ja/projects 라우트가 lang만 바꿔서 공유.

import { getProjects } from "@/lib/content";
import { projectStrings } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";
import type { Lang } from "@/types/content";

export default function ProjectsIndex({ lang }: { lang: Lang }) {
  const projects = getProjects(lang);
  const t = projectStrings[lang];

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{t.subtitle}</p>
      </header>
      {projects.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">{t.empty}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}
