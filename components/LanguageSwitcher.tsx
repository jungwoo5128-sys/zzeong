"use client";

// 네비게이션 우측에 노출되는 EN / KO / JA 토글.
// 현재 pathname으로 활성 언어 감지 → 활성 언어는 진한 색, 비활성은 muted.
// URL 규약: / 는 한국어 홈, /en 은 영어 홈, /ja 는 일본어 홈. 하위 페이지의 다국어 지원은 추후 확장.

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 표시 순서대로. prefix가 없는 KO는 나머지 언어에 해당하지 않을 때 활성.
const languages = [
  { code: "en", label: "EN", href: "/en" },
  { code: "ko", label: "KO", href: "/" },
  { code: "ja", label: "JA", href: "/ja" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const matchesPrefix = (prefix: string) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`);
  const active = matchesPrefix("/en") ? "en" : matchesPrefix("/ja") ? "ja" : "ko";

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
            href={lang.href}
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
