"use client";

// 수상 상세 모달 — 홈 Awards 섹션에서 특정 항목 클릭 시 열림.
// 네이티브 <dialog> 사용 → backdrop·keyboard(ESC)·focus 관리는 브라우저가 해결.
// 콘텐츠: 헤더(등급/연도/대회명) + 썸네일 + 설명(MDX) + 다운로드 버튼.

import { useRef, useEffect, type ReactNode } from "react";
import Image from "next/image";
import type { Award } from "@/types/content";

type Props = {
  award: Award;
  // 트리거로 쓸 요소(예: 리스트 항목 텍스트). 클릭 시 모달 오픈.
  children: ReactNode;
};

export default function AwardModal({ award, children }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // 열려 있는 동안 body 스크롤 잠금 → 배경 스크롤 방지.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const observer = new MutationObserver(() => {
      if (dialog.hasAttribute("open")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    return () => {
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, []);

  // 백드롭 클릭 시 닫기 (dialog element 자체는 창 안의 form 영역까지 커버하므로
  // dialog 요소를 직접 클릭한 경우 = 백드롭 클릭으로 간주).
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) close();
  };

  return (
    <>
      {/* 트리거 — 호버 시 커서 변경, 우측에 화살표 추가 힌트 */}
      <button
        type="button"
        onClick={open}
        className="group flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-[var(--accent)]"
      >
        {children}
        <span
          aria-hidden="true"
          className="text-xs text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent)]"
        >
          ↗
        </span>
      </button>

      {/* 모달 자체 — <dialog>는 브라우저가 최상단 layer로 자동 승격 */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="max-h-[90vh] w-[min(720px,95vw)] rounded-2xl bg-[var(--background)] p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        {/* 스크롤 컨테이너 — 모달 자체는 고정, 내부만 스크롤 */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* 닫기 버튼 — 우상단, 항상 클릭 가능하게 sticky */}
          <button
            type="button"
            onClick={close}
            aria-label="닫기"
            className="sticky top-4 float-right mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-lg shadow-md backdrop-blur transition-all hover:bg-white hover:shadow-lg"
          >
            ✕
          </button>

          <div className="px-8 py-8 sm:px-10 sm:py-10">
            {/* 헤더: 등급 · 연도 라벨 + 대회명 큰 제목 */}
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              {award.tier} · {award.date}
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {award.event}
            </h2>
            {award.team && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                {award.team}
                {award.organizer && ` · ${award.organizer} 주최`}
              </p>
            )}

            {/* 썸네일 (있으면) */}
            {award.thumbnail && (
              <div className="mt-8 overflow-hidden rounded-xl border border-[var(--border)]">
                <Image
                  src={award.thumbnail}
                  alt={`${award.title} 대표 이미지`}
                  width={1600}
                  height={900}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {/* 상장 (있으면) — 별도 섹션으로 크게 노출 (증빙 자료).
                이미지 클릭 시 PDF 원본으로 이동 (있는 경우). */}
            {award.certificateImage && (
              <div className="mt-8">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Certificate
                </p>
                {award.certificatePdf ? (
                  <a
                    href={award.certificatePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-xl border border-[var(--border)] transition-shadow hover:shadow-lg"
                  >
                    <Image
                      src={award.certificateImage}
                      alt={`${award.title} 상장`}
                      width={1600}
                      height={2200}
                      className="h-auto w-full object-contain"
                    />
                  </a>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                    <Image
                      src={award.certificateImage}
                      alt={`${award.title} 상장`}
                      width={1600}
                      height={2200}
                      className="h-auto w-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 사진들 (있으면) — 그리드로 노출 */}
            {award.photos && award.photos.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {award.photos.map((src, i) => (
                  <div
                    key={src}
                    className="aspect-square overflow-hidden rounded-lg border border-[var(--border)]"
                  >
                    <Image
                      src={src}
                      alt={`${award.title} 사진 ${i + 1}`}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 본문 — MDX 렌더가 아니라 여기선 클라이언트 컴포넌트라 순수 문자열로 처리.
                간단한 마크다운 형태를 유지하기 위해 프리라인 처리 (개행 유지). */}
            <div className="prose-basic mt-8 whitespace-pre-line text-[var(--foreground)]/85">
              {award.body}
            </div>

            {/* PDF 다운로드 CTA — pill 스타일, 하단 정렬 */}
            {award.pdf && (
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={award.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  View Pitch Deck
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={award.pdf}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors hover:border-[var(--foreground)]"
                >
                  Download PDF
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
