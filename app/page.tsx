import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";

// 홈 페이지(/) — Hero + About + Education + Awards + Featured 프로젝트 카드 순서로 배치.
export default function HomePage() {
  // content/projects/*.mdx 중 frontmatter의 featured=true 인 것만 상위 3개 노출.
  const featured = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    // 각 section 사이 세로 간격 (space-y-16 = 4rem).
    <div className="space-y-16">
      {/* ────────────── Hero + About + Portrait ──────────────
          모바일: flex-col-reverse → 사진이 위, 텍스트가 아래.
          sm↑:   flex-row       → 텍스트가 왼쪽, 사진이 오른쪽. */}
      <section className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:gap-10">
        <div className="min-w-0 flex-1">
          {/* 상단 브랜드/이름 (작게, 소문자, 자간 넓게) */}
          <p className="text-sm text-[var(--muted)] tracking-widest lowercase">
            최정우
          </p>
          {/* Hero 카피 — 정체성 한 문장.
              텍스트가 길어질 경우 어절 단위로 줄바꿈되도록
              globals.css의 body에 word-break: keep-all 을 걸어둠. */}
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            관찰한 페인포인트를 프로덕트로 구현하는 사람.
          </h1>
          {/* About — 자기소개 문단들. max-w-xl 로 가독성 있는 폭 제한. */}
          <div className="mt-6 max-w-xl space-y-4 text-[var(--foreground)]/80 leading-relaxed">
            <p>
              안녕하세요, 최정우입니다. 일상과 커뮤니티에서 발견한 페인포인트를
              실제 프로덕트로 옮기는 과정을 좋아합니다.
            </p>
            <p>
              지금은 서강대학교에서 Blackbox라는 창업동아리를 운영하고 있습니다.
            </p>
          </div>
          {/* 협업 · 외주 문의 라인 — About 문단 바로 아래에 배치해서
              "제 이야기 → 연락 방법" 흐름으로 이어짐. */}
          <p className="mt-6 text-sm">
            <span className="text-[var(--muted)]">협업, 외주 문의: </span>
            <a
              href="mailto:jungwoo5128@gmail.com"
              className="underline underline-offset-4 decoration-[var(--accent)] hover:text-[var(--accent)]"
            >
              jungwoo5128@gmail.com
            </a>
          </p>
        </div>
        {/* 프로필 사진 — /public/me.jpg 참조.
            160×160 정사각, 살짝 둥근 모서리(rounded-lg), object-cover로 크롭.
            priority: 상단 노출 이미지라 LCP 지표 최적화 목적으로 우선 로드. */}
        <div className="shrink-0">
          <Image
            src="/me.jpg"
            alt="최정우"
            width={160}
            height={160}
            className="h-40 w-40 rounded-lg object-cover"
            priority
          />
        </div>
      </section>

      {/* ────────────── Education ────────────── */}
      <section>
        <h2 className="mb-4 text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
          Education
        </h2>
        {/*
          학력 리스트. 각 항목은 2열 그리드:
            - 왼쪽 6.5rem: 연도 (muted 색)
            - 오른쪽 1fr: 학교명 / 부가 설명
          border-y + divide-y 로 상하 테두리와 각 행 사이 구분선.
        */}
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">현재</span>
            <span>서강대학교 경영학과 · 스타트업 연계전공 재학 중</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2020</span>
            <span>진주 대아고등학교 졸업</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2017</span>
            <span>진주중학교 졸업</span>
          </li>
          {/* 가좌초등학교는 미국 전학 이력이 있어 서브 라인을 하나 더 붙임. */}
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2014</span>
            <div>
              <p>진주 가좌초등학교 졸업</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                미국 전학 · Hawthorn Elementary South 졸업 (2013)
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* ────────────── Awards ──────────────
          수상 이력을 연도별로 묶어서 접기/펼치기(details+summary) 처리.
          - <details> : 기본 접힘 상태 (open 속성이 붙으면 펼침 상태로 시작)
          - list-none + [&::-webkit-details-marker]:hidden : 브라우저 기본 삼각형 마커 숨김
          - group-open:rotate-90 : 열릴 때 커스텀 화살표 회전 애니메이션
          연도는 최신순(2026 → 2025). 각 그룹 안은 사용자 지정 순서 유지. */}
      <section>
        <h2 className="mb-4 text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
          Awards
        </h2>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {/* ── 2026년 그룹 ── */}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium">2026</span>
                <span className="text-xs text-[var(--muted)]">1건</span>
              </div>
              {/* 열림 상태(group-open)면 90도 회전 → 아래를 가리키게 됨 */}
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">최우수상</span>
                <span>Upstage 주관 Low-code AI Startup Hackathon</span>
              </li>
            </ul>
          </details>

          {/* ── 2025년 그룹 ── */}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium">2025</span>
                <span className="text-xs text-[var(--muted)]">4건</span>
              </div>
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">대상</span>
                <span>서강대학교 제1회 아이디어톤 BELL</span>
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">1등</span>
                <span>서강대학교 창업동아리 Blackbox 31기 데모데이</span>
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">우수상</span>
                <span>서강대학교 제2회 아이디어톤 BELL</span>
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">우수상</span>
                <span>서강대학교 2025 창업캠프</span>
              </li>
            </ul>
          </details>
        </div>
      </section>

      {/* ────────────── Featured Projects ──────────────
          featured 프로젝트가 하나라도 있을 때만 섹션 자체를 렌더. */}
      {featured.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
              Featured
            </h2>
            {/* "모두 보기" — /projects 목록 페이지로 이동. */}
            <Link
              href="/projects"
              className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              모두 보기 →
            </Link>
          </div>
          {/* 모바일 1열, sm(640px) 이상에서 2열 그리드.
              홈 Featured에서는 카드가 미니멀하게 보이도록 스택 pill 숨김.
              전체 스택은 /projects 목록·상세 페이지에서 확인 가능. */}
          <div className="grid gap-3 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} showStack={false} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
