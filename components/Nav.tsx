import Link from "next/link";

// 상단 네비게이션 항목. 왼쪽 로고("zzeong")는 홈으로, 오른쪽 링크는 각 섹션.
const items = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/timeline", label: "Timeline" },
  { href: "/now", label: "Now" },
];

export default function Nav() {
  return (
    // 딥 인디고 배경 + 밝은 텍스트. 사이트 첫 인상의 색 앵커.
    <header className="bg-[var(--accent)] text-[var(--accent-foreground)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight lowercase"
        >
          zzeong
        </Link>
        {/* 링크는 반투명 흰색으로 시작 → hover 시 완전 불투명(더 밝게). */}
        <ul className="flex items-center gap-6 text-sm text-[var(--accent-foreground)]/70">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="transition-colors hover:text-[var(--accent-foreground)]"
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
