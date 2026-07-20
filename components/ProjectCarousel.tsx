"use client";

// 프로젝트 캐러셀 — 중앙 카드 하나가 sharp/큼, 좌우 형제는 blur+opacity로 서포팅.
// - full viewport width로 breakout(부모 max-w-7xl 무시)해서 좌우 형제가 잘리지 않게.
// - 화살표 버튼 + 하단 점 페이지네이션 + 키보드 좌/우 방향키 지원.
// - 이미지 없을 시 gradient placeholder.

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/content";

// 슬라이드 사이즈 상수 — px 단위. 데스크톱 기준. (모바일에선 컨테이너 폭에 의해 자연 크롭)
const SLIDE_W = 440;
const GAP = 32;
const SLOT = SLIDE_W + GAP;

export default function ProjectCarousel({
  projects,
}: {
  projects: Project[];
}) {
  // 기본은 첫 번째 슬라이드 선택 (실제 프로젝트가 앞에 오도록 부모에서 정렬됨).
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + projects.length) % projects.length),
    [projects.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % projects.length),
    [projects.length],
  );

  // 키보드 좌/우 방향키로 이동 — 데스크톱 접근성 강화.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  return (
    <div className="relative">
      {/* 슬라이드 트랙 컨테이너 — 뷰포트 폭 전체로 breakout.
          left-1/2 -translate-x-1/2 + w-screen 조합으로 부모의 max-w-* 벗어남. */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {/* 트랙 자체 — 모든 슬라이드가 가로로 나열됨. transform으로 current 중앙 정렬. */}
        <div
          className="flex items-center py-6"
          style={{
            gap: `${GAP}px`,
            // 50vw = 뷰포트 중앙. 여기서 슬라이드 절반 + current 인덱스만큼 이동.
            transform: `translateX(calc(50vw - ${SLIDE_W / 2}px - ${current * SLOT}px))`,
            transition:
              "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {projects.map((project, i) => {
            const isCurrent = i === current;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                aria-label={project.title}
                className={`group relative aspect-square shrink-0 overflow-hidden rounded-2xl transition-all duration-500 ${
                  isCurrent
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-40 blur-[4px]"
                }`}
                style={{ width: `${SLIDE_W}px` }}
                // 비활성 슬라이드는 클릭 못하게 — 실수 방지.
                tabIndex={isCurrent ? 0 : -1}
              >
                {/* 이미지 또는 placeholder */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="440px"
                    className="object-cover"
                  />
                ) : (
                  // 이미지 없을 때 다크 그라디언트 placeholder.
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950" />
                )}
                {/* 반투명 다크 오버레이 — 텍스트 가독성 확보. current만 진하게. */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isCurrent ? "bg-black/25" : "bg-black/10"
                  }`}
                />
                {/* 제목·태그 오버레이 — current일 때만 노출. */}
                <div
                  className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white transition-opacity duration-500 ${
                    isCurrent ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="text-lg font-bold uppercase tracking-[0.15em] sm:text-xl">
                    {project.title}
                  </div>
                  {project.tag && (
                    <div className="mt-3 text-xs uppercase tracking-[0.3em] opacity-80">
                      {project.tag}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* 좌우 화살표 — 슬라이드 2개 이상일 때만 노출.
            반투명 흰 배경 + blur backdrop + shadow로 부드럽게 떠 있는 느낌. */}
        {projects.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="이전 프로젝트"
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--foreground)] shadow-md backdrop-blur transition-all hover:bg-white hover:shadow-lg sm:left-8"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="다음 프로젝트"
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--foreground)] shadow-md backdrop-blur transition-all hover:bg-white hover:shadow-lg sm:right-8"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* 하단 점 페이지네이션 — 현재 인덱스는 길쭉한 bar로 강조. */}
      {projects.length > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`${i + 1}번 프로젝트로 이동`}
              className={`h-1.5 rounded-full transition-all ${
                i === current
                  ? "w-6 bg-[var(--foreground)]"
                  : "w-1.5 bg-[var(--border)]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
