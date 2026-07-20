"use client";

// 네비게이션 좌/우측에 노출되는 EN / KO 토글.
// 현재 pathname으로 활성 언어 감지 → 활성 언어는 진한 색, 비활성은 muted.
// URL 규약: /en 은 영어 홈, / 는 한국어 홈. 다른 하위 페이지의 이중언어 지원은 추후 확장.

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");

  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em]">
      <Link
        href="/en"
        aria-current={isEnglish ? "page" : undefined}
        className={
          isEnglish
            ? "text-[var(--foreground)]"
            : "text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        }
      >
        EN
      </Link>
      <span aria-hidden="true" className="text-[var(--muted)]/50">
        /
      </span>
      <Link
        href="/"
        aria-current={!isEnglish ? "page" : undefined}
        className={
          !isEnglish
            ? "text-[var(--foreground)]"
            : "text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        }
      >
        KO
      </Link>
    </div>
  );
}
