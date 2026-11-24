// 프로젝트 상세 화면 본체 + 라우트에서 쓰는 메타데이터 헬퍼.
// /projects/[slug], /en/projects/[slug], /ja/projects/[slug] 가 lang만 바꿔서 공유.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/content";
import { LANGS, langPrefix, projectStrings } from "@/lib/i18n";
import type { Lang } from "@/types/content";

// 빌드 시 정적 생성할 slug 목록 (언어와 무관하게 한국어 원본 기준).
export function projectStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

// 상세 페이지 메타데이터 — 제목·요약을 해당 언어로, 다른 언어 버전 주소를 alternates로 연결.
export function projectMetadata(slug: string, lang: Lang): Metadata {
  const project = getProject(slug, lang);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `${langPrefix(lang)}/projects/${slug}`,
      languages: Object.fromEntries(
        LANGS.map((l) => [l, `${langPrefix(l)}/projects/${slug}`]),
      ),
    },
  };
}

export default async function ProjectDetail({
  slug,
  lang,
}: {
  slug: string;
  lang: Lang;
}) {
  const project = getProject(slug, lang);
  if (!project) notFound();

  const { content } = await compileMDX({
    source: project.body,
    options: { parseFrontmatter: false },
  });

  return (
    <article>
      <Link
        href={`${langPrefix(lang)}/projects`}
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Projects
      </Link>
      <header className="mt-6 mb-8 space-y-3 border-b border-[var(--border)] pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="text-[var(--muted)]">{project.summary}</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-[var(--muted)]">Role</dt>
          <dd>{project.role}</dd>
          <dt className="text-[var(--muted)]">Period</dt>
          <dd>{project.period}</dd>
          <dt className="text-[var(--muted)]">Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
          {project.links.length > 0 && (
            <>
              <dt className="text-[var(--muted)]">Links</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {project.links.map((l) =>
                  // 비활성 링크: 클릭 안 되는 회색 글자 + 언어별 "준비 중" 표시
                  l.disabled || !l.url ? (
                    <span
                      key={l.name}
                      aria-disabled="true"
                      className="cursor-not-allowed text-[var(--muted)]"
                    >
                      {l.name}{" "}
                      <span className="text-xs">({projectStrings[lang].comingSoon})</span>
                    </span>
                  ) : (
                    <a
                      key={l.name}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4"
                    >
                      {l.name}
                    </a>
                  ),
                )}
              </dd>
            </>
          )}
        </dl>
      </header>
      {/* 번역본이 없어 한국어로 폴백된 경우 lang="ko"가 붙어서, 스크린리더·검색엔진이 본문 언어를 알 수 있음. */}
      <div className="prose-basic" lang={project.lang}>
        {content}
      </div>
    </article>
  );
}
