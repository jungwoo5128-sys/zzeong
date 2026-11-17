import Link from "next/link";
import { langPrefix } from "@/lib/i18n";
import type { Lang, Project } from "@/types/content";

// 프로젝트 카드. 홈 Featured / /projects 목록에서 공용으로 씀.
// showStack: 스택 pill을 카드 하단에 노출할지. 기본 true(목록 페이지 기본값),
// 홈 Featured 처럼 미니멀하게 보여주고 싶은 곳에서는 false로 전달.
// lang: 상세 페이지 링크를 해당 언어 경로(/en/projects/...)로 만들기 위해 사용.
export default function ProjectCard({
  project,
  showStack = true,
  lang = "ko",
}: {
  project: Project;
  showStack?: boolean;
  lang?: Lang;
}) {
  return (
    <Link
      href={`${langPrefix(lang)}/projects/${project.slug}`}
      className="group block rounded-lg border border-[var(--border)] p-5 transition-colors hover:border-[var(--foreground)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold tracking-tight">
          {project.title}
        </h3>
        <span className="text-xs text-[var(--muted)]">{project.period}</span>
      </div>
      <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
      {showStack && project.stack.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted)]"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
