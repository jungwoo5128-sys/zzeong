"use client";

// 프로젝트 캐러셀 — 중앙 카드 하나가 sharp/큼, 좌우 형제는 blur+opacity로 서포팅.
// - full viewport width로 breakout(부모 max-w-7xl 무시)해서 좌우 형제가 잘리지 않게.
// - 화살표 버튼(중앙 이미지 옆, 모바일은 뷰포트 끝) + 하단 점 페이지네이션 + 키보드 좌/우 방향키.
// - 포인터 드래그(마우스·터치)로 좌우 스와이프 지원. 임계값 넘으면 스냅.
// - 이미지 없을 시 gradient placeholder.

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/content";

// 슬라이드 사이즈 상수 — px 단위. 데스크톱 기준. (모바일에선 컨테이너 폭에 의해 자연 크롭)
const SLIDE_W = 440;
const GAP = 32;
const SLOT = SLIDE_W + GAP;
// 드래그 거리 임계값 — 이 이상 밀면 다음/이전 슬라이드로 스냅.
const DRAG_SNAP_PX = 60;
// 드래그로 간주할 최소 이동량 — 이 이하는 클릭으로 처리(링크 이동 허용).
const DRAG_CLICK_TOLERANCE_PX = 6;

export default function ProjectCarousel({
  projects,
}: {
  projects: Project[];
}) {
  // 기본은 첫 번째 슬라이드 선택 (실제 프로젝트가 앞에 오도록 부모에서 정렬됨).
  const [current, setCurrent] = useState(0);
  // 드래그 중 라이브 오프셋(px). 트랙 transform 에 더해져서 손가락 따라 이동하는 시각 피드백.
  const [dragOffset, setDragOffset] = useState(0);
  // 포인터 다운 시점의 X 좌표. null 이면 드래그 아님.
  const dragStartX = useRef<number | null>(null);
  // 드래그가 발생했는지 플래그 — 발생 시 뒤이은 click 을 삼켜서 Link 네비게이션 방지.
  const draggedRef = useRef(false);

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

  // 포인터 드래그 핸들러들 — pointer 이벤트로 마우스·터치·펜 모두 커버.
  // ⚠️ setPointerCapture 를 pointerdown 에서 바로 부르면 안 됨:
  // 캡처된 요소로 뒤이은 compat mouse click 이벤트가 재-dispatch 되기 때문에
  // 자식 <Link> 의 클릭이 안 먹혀서 상세 페이지 이동이 막힘.
  // → 이동량이 임계값을 넘어 "진짜 드래그"로 확정될 때만 캡처.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    draggedRef.current = false;
    // dragOffset 은 드래그 확정 시점부터 업데이트 (아직 0 유지).
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    // 임계값 처음 넘는 순간 드래그 확정 → 캡처 시작. 이후 손가락이 밖으로 나가도 계속 추적.
    if (!draggedRef.current && Math.abs(dx) > DRAG_CLICK_TOLERANCE_PX) {
      draggedRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (draggedRef.current) setDragOffset(dx);
  };
  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    const dx = dragOffset;
    dragStartX.current = null;
    // 실제 드래그가 발생했을 때만 스냅 판단. 순수 클릭은 그대로 통과시켜 Link 이동 허용.
    if (draggedRef.current) {
      if (dx > DRAG_SNAP_PX) prev();
      else if (dx < -DRAG_SNAP_PX) next();
      setDragOffset(0);
    }
  };

  // 드래그 직후의 click 이벤트를 삼켜서 Link 네비게이션 방지.
  // (드래그가 아닌 순수 클릭은 draggedRef=false 이므로 통과)
  const onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const isDragging = dragStartX.current !== null;

  return (
    <div className="relative">
      {/* 슬라이드 트랙 컨테이너 — 뷰포트 폭 전체로 breakout.
          left-1/2 -translate-x-1/2 + w-screen 조합으로 부모의 max-w-* 벗어남. */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {/* 트랙 자체 — 모든 슬라이드가 가로로 나열됨. transform 으로 current 중앙 정렬.
            select-none·touch-pan-y·cursor-grab 로 드래그 UX 개선. */}
        <div
          className="flex touch-pan-y items-center select-none py-6"
          style={{
            gap: `${GAP}px`,
            // 50vw = 뷰포트 중앙. 슬라이드 절반 + current 인덱스 - 드래그 오프셋 만큼 이동.
            transform: `translateX(calc(50vw - ${SLIDE_W / 2}px - ${current * SLOT}px + ${dragOffset}px))`,
            // 드래그 중엔 transition 제거해서 즉시 반응, 놓으면 다시 부드럽게 스냅.
            transition: isDragging
              ? "none"
              : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={onClickCapture}
        >
          {projects.map((project, i) => {
            const isCurrent = i === current;
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                aria-label={project.title}
                draggable={false}
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
                    draggable={false}
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
            데스크톱: 중앙 이미지 바로 옆(50vw ± SLIDE_W/2 + gap).
            모바일: 뷰포트가 이미지보다 좁아 max(1rem, ...) 로 최소 1rem 만큼만 안쪽 배치. */}
        {projects.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="이전 프로젝트"
              // left: 화살표 우측이 이미지 좌측에서 12px 떨어지도록.
              // (arrow width 44 + gap 12 + SLIDE_W/2 220 = 276)
              style={{ left: "max(1rem, calc(50vw - 276px))" }}
              className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--foreground)] shadow-md backdrop-blur transition-all hover:bg-white hover:shadow-lg"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="다음 프로젝트"
              style={{ right: "max(1rem, calc(50vw - 276px))" }}
              className="absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-lg text-[var(--foreground)] shadow-md backdrop-blur transition-all hover:bg-white hover:shadow-lg"
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
