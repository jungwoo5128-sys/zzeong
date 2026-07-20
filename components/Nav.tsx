import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// 상단 네비게이션 항목. 왼쪽 로고("zzeong")는 홈으로, 오른쪽 링크는 각 섹션.
const items = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/timeline", label: "Timeline" },
  { href: "/now", label: "Now" },
];

export default function Nav() {
  return (
    // 무색 배경 + 어두운 텍스트. kyne 사이트 참조 → 미니멀·에디토리얼 방향.
    // 색 배경 대신 컨텐츠 배경(#fafafa) 그대로 사용, 아래 얇은 구분선만.
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* 로고 — 이탤릭 세리프로 감각적인 매거진 마스트헤드 톤 */}
        <Link
          href="/"
          className="font-serif text-xl italic tracking-tight"
        >
          zzeong
        </Link>
        {/* 우측 그룹: 언어 토글 + 네비 아이템. gap으로 시각 분리. */}
        <div className="flex items-center gap-6 sm:gap-10">
          <LanguageSwitcher />
          <ul className="flex items-center gap-6 text-xs uppercase tracking-[0.15em] text-[var(--muted)] sm:gap-8">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="transition-colors hover:text-[var(--foreground)]"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
