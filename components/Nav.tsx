import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// 상단 네비게이션 항목. 왼쪽 로고(Jeongwoo Choe.)는 홈으로, 오른쪽 링크는 각 섹션.
const items = [
  { href: "/projects", label: "Projects" },
  { href: "/timeline", label: "Timeline" },
  { href: "/now", label: "Now" },
];

export default function Nav() {
  return (
    // 무색 배경 + 어두운 텍스트. kyne 사이트 참조 → 미니멀·에디토리얼 방향.
    // 색 배경 대신 컨텐츠 배경(#fafafa) 그대로 사용, 아래 얇은 구분선만.
    <header className="border-b border-[var(--border)] bg-[var(--background)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
        {/* 로고 — Pretendard 볼드 sans로 딱딱하고 공식적인 톤.
            (랜딩의 이탤릭 세리프와 대비되며 헤더가 브랜드 앵커 역할)
            모바일에선 "Jeongwoo"만 노출(공간 절약), sm↑에선 "Jeongwoo Choe."로 완결. */}
        <Link
          href="/"
          className="shrink-0 font-pretendard text-base font-bold tracking-tight sm:text-lg"
        >
          Jeongwoo<span className="hidden sm:inline"> Choe.</span>
        </Link>
        {/* 우측 그룹: 언어 토글 + 네비 아이템. 모바일에선 gap 최소, sm↑에서 넉넉히. */}
        <div className="flex items-center gap-3 sm:gap-10">
          <LanguageSwitcher />
          <ul className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[var(--muted)] sm:gap-8">
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
