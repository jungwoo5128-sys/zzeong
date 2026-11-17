"use client";

// 네비게이션 우측에 노출되는 EN / KO / JA 토글.
// 현재 pathname으로 활성 언어 감지 → 활성 언어는 진한 색, 비활성은 muted.
// URL 규약: 한국어는 prefix 없음, 영어 /en, 일본어 /ja.
// 번역본이 있는 페이지(홈·프로젝트)에서는 같은 페이지의 다른 언어로 이동하고,
// 한국어만 있는 페이지(Timeline·Now)에서는 해당 언어 홈으로 보냄.

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { hasTranslation, langFromPath, langPrefix, stripLang } from "@/lib/i18n";
import type { Lang } from "@/types/content";

// 표시 순서대로.
const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
  { code: "ja", label: "JA" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const active = langFromPath(pathname);
  const basePath = stripLang(pathname);

  // 언어별 이동할 주소 계산. /en/projects/trecord 에서 KO → /projects/trecord
  const hrefFor = (lang: Lang) => {
    const prefix = langPrefix(lang);
    if (!hasTranslation(basePath)) return prefix || "/";
    if (basePath === "/") return prefix || "/";
    return `${prefix}${basePath}`;
  };

  return (
    // 모바일에선 네비 공간이 빠듯해서 자간을 좁게, sm↑에서 원래대로.
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.06em] sm:tracking-[0.15em]">
      {languages.map((lang, i) => (
        <Fragment key={lang.code}>
          {i > 0 && (
            // 구분자 "/"는 sm↑에서만. 모바일은 폭이 모자라 간격만으로 구분.
            <span aria-hidden="true" className="hidden text-[var(--muted)]/50 sm:inline">
              /
            </span>
          )}
          <Link
            href={hrefFor(lang.code)}
            hrefLang={lang.code}
            aria-current={active === lang.code ? "page" : undefined}
            className={
              active === lang.code
                ? "text-[var(--foreground)]"
                : "text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            }
          >
            {lang.label}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
