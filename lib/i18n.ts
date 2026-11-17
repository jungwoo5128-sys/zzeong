// 다국어(ko / en / ja) 공용 유틸 — URL prefix 계산과 프로젝트 화면의 UI 문구.
// URL 규약: 한국어는 prefix 없음(/projects), 영어는 /en, 일본어는 /ja.

import type { Lang } from "@/types/content";

export const LANGS: Lang[] = ["ko", "en", "ja"];

// 언어별 URL prefix. 한국어는 루트라 빈 문자열.
export function langPrefix(lang: Lang): string {
  return lang === "ko" ? "" : `/${lang}`;
}

// pathname에서 언어를 판별. /en, /en/... → en, /ja... → ja, 나머지는 ko.
export function langFromPath(pathname: string): Lang {
  for (const lang of ["en", "ja"] as const) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) return lang;
  }
  return "ko";
}

// pathname에서 언어 prefix를 떼어낸 기본 경로. /en/projects/x → /projects/x, /en → /
export function stripLang(pathname: string): string {
  const lang = langFromPath(pathname);
  if (lang === "ko") return pathname;
  return pathname.slice(lang.length + 1) || "/";
}

// 번역된 페이지가 있는 경로인지. 지금은 홈과 프로젝트 화면만 다국어.
// (Timeline, Now 등은 한국어만 있어서 언어 전환 시 해당 언어 홈으로 보냄)
export function hasTranslation(basePath: string): boolean {
  return basePath === "/" || basePath === "/projects" || basePath.startsWith("/projects/");
}

// 프로젝트 목록·상세·캐러셀에서 쓰는 UI 문구.
export const projectStrings = {
  ko: {
    subtitle: "만든 것과 만드는 중인 것.",
    empty: "아직 등록된 프로젝트가 없습니다.",
    prev: "이전 프로젝트",
    next: "다음 프로젝트",
    goTo: (n: number) => `${n}번 프로젝트로 이동`,
  },
  en: {
    subtitle: "Things I’ve built and am building.",
    empty: "No projects yet.",
    prev: "Previous project",
    next: "Next project",
    goTo: (n: number) => `Go to project ${n}`,
  },
  ja: {
    subtitle: "作ったもの、作っているもの。",
    empty: "まだプロジェクトはありません。",
    prev: "前のプロジェクト",
    next: "次のプロジェクト",
    goTo: (n: number) => `${n}番目のプロジェクトへ`,
  },
} satisfies Record<Lang, unknown>;
