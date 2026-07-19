import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";

// 홈 페이지(/) — Hero + About + Education + Awards + Featured 프로젝트 카드 순서로 배치.
export default function HomePage() {
  // content/projects/*.mdx 중 frontmatter의 featured=true 인 것만 상위 3개 노출.
  const featured = getProjects().filter((p) => p.featured).slice(0, 3);

  return (
    // 이전엔 space-y-16으로 모든 섹션 간격 균일. 이제는 리듬을 위해 섹션마다
    // mt-* 수동 지정. 관련된 그룹은 좁게, 다른 성격의 섹션 사이는 넓게.
    <div>
      {/* ────────────── Landing (풀 뷰포트) ──────────────
          첫 화면을 뷰포트 높이만큼 차지하는 랜딩 존.
          Nav + main의 py-12 = 약 10rem을 제외한 실질 뷰포트 높이로 계산.
          svh(small viewport height) 사용 → 모바일 브라우저 주소창 애니메이션 이슈 회피.
          구조:
            - flex-col: 세로 배치
            - 중앙 블록(flex-1): 한자 5글자 + 구분선 + 캡션 (수직 중앙 정렬)
            - 하단 블록: 스크롤 큐 */}
      <div className="flex min-h-[calc(100svh-10rem)] flex-col text-center">
        {/* 중앙 정렬 콘텐츠 — 이름이 주역, 좌우명이 서포팅.
            gap-12 sm:gap-16으로 두 블록 사이 공간 확보. */}
        <div className="flex flex-1 flex-col justify-center gap-12 sm:gap-16">
          {/* ── 주역: 이름 + Personal Site 서브타이틀 ──
              h1 = 페이지의 primary 정체성. 큰 사이즈 + 굵은 굵기 + 대문자로 위엄. */}
          <div>
            <h1
              className="hanja-char text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl"
              style={{ animationDelay: "0ms" }}
            >
              Jeongwoo Choe
            </h1>
            <p
              className="hanja-char mt-5 text-sm uppercase tracking-[0.25em] text-[var(--muted)] sm:text-base"
              style={{ animationDelay: "250ms" }}
            >
              Personal Site
            </p>
          </div>

          {/* ── 서포팅: 한자 좌우명 ──
              이름보다 작게 (text-2xl/4xl) → 위계 확실히. 색도 살짝 흐리게(70%)해서 뒤로 밀어냄. */}
          <div>
            <div className="font-hanja flex justify-center gap-[0.55em] text-2xl font-medium leading-none text-[var(--foreground)]/75 sm:gap-[0.7em] sm:text-4xl">
              {["今", "我", "異", "昨", "我"].map((ch, i) => (
                <span
                  key={i}
                  className="hanja-char"
                  style={{ animationDelay: `${500 + i * 140}ms` }}
                >
                  {ch}
                </span>
              ))}
            </div>
            <div
              className="hanja-char mx-auto mt-5 h-px w-8 bg-[var(--foreground)]/20"
              style={{ animationDelay: "1250ms" }}
            />
            <p
              className="hanja-char mt-4 text-xs tracking-[0.2em] text-[var(--muted)] sm:text-sm"
              style={{ animationDelay: "1400ms" }}
            >
              오늘의 나는 어제의 나와 다르다.
            </p>
          </div>
        </div>

        {/* 하단 스크롤 큐 — 랜딩의 마지막 등장 요소. */}
        <div
          className="hanja-char pb-4 text-xs uppercase tracking-widest text-[var(--muted)]"
          style={{ animationDelay: "1700ms" }}
        >
          <div className="animate-bounce text-base" aria-hidden="true">
            ↓
          </div>
          <div className="mt-2">scroll</div>
        </div>
      </div>

      {/* ────────────── About + Portrait Card ──────────────
          레퍼런스(Junbeom Park) 스타일 채용:
          - 좌측: ABOUT 라벨 + 큰 태그라인 + 자기소개 문단 + CTA 버튼
          - 우측: 큰 세로 포트레이트 + 정보 카드 (이름·역할·스킬 태그)
          그리드 2컬럼(sm↑), 모바일에선 스택. sm:items-center로 좌우 세로 중앙 정렬. */}
      <Reveal>
      <section className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-[1fr_360px] sm:items-center sm:gap-24 lg:gap-32">
        {/* ── 좌측: About 스토리 + CTA ── */}
        <div>
          {/* 섹션 라벨 — 넓은 자간 대문자, muted 톤 */}
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            About
          </p>
          {/* 태그라인 — h2(랜딩 h1 다음). 큰 사이즈로 정체성 강조.
              leading-[1.15]로 큰 글자 사이 타이트하게 */}
          <h2 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            관찰한 페인포인트를 프로덕트로 구현하는 사람.
          </h2>
          {/* About 문단들 — leading-[1.85]로 편안하게 */}
          <div className="mt-8 space-y-4 leading-[1.85] text-[var(--foreground)]/75">
            <p>
              안녕하세요, 최정우입니다. 일상과 커뮤니티에서 발견한 페인포인트를
              실제 프로덕트로 옮기는 과정을 좋아합니다.
            </p>
            <p>
              지금은 서강대학교에서 Blackbox라는 창업동아리를 운영하고 있습니다.
              홈페이지 제작 외주도 받고 있어요.
            </p>
          </div>
          {/* CTA 버튼 — pill 형태, 흰 배경 + 부드러운 그림자.
              이전 "협업, 외주 문의" 인라인 링크를 이 버튼으로 승격. */}
          <a
            href="mailto:jungwoo5128@gmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── 우측: 포트레이트 카드 ──
            흰 배경 + 라운드 코너 + 그림자로 카드 느낌.
            상단은 사진 (4:5 세로 비율), 하단은 정보 블록. */}
        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-lg sm:mx-0">
          {/* 사진 — 원본이 4:5 세로(360×462)라 aspect-[4/5]로 매치 */}
          <Image
            src="/me.jpg"
            alt="최정우"
            width={320}
            height={400}
            className="aspect-[4/5] w-full object-cover"
            priority
          />
          {/* 정보 카드 — 이름(EN/KR) + 역할 + 스킬 태그 */}
          <div className="px-5 py-5">
            <p className="text-base font-bold text-[var(--foreground)]">
              Jeongwoo Choe
            </p>
            <p className="text-sm text-[var(--muted)]">최정우</p>
            <p className="mt-1 text-sm text-[var(--foreground)]/80">
              Product Builder
            </p>
            {/* 스킬 태그 — 이전 히어로에 있던 라인을 카드 안으로 이동.
                기획은 primary로 진하게, 나머지는 border-only pill로 조용히. */}
            <ul className="mt-4 flex flex-wrap gap-1.5">
              <li className="rounded-full bg-[var(--foreground)] px-2.5 py-1 text-xs font-medium text-[var(--background)]">
                기획
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                전략
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                Vibe coding
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                UI/UX design
              </li>
            </ul>
          </div>
        </div>
      </section>
      </Reveal>

      {/* ────────────── Education ────────────── */}
      <Reveal>
      <section className="mt-24">
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
      </Reveal>

      {/* ────────────── Awards ──────────────
          수상 이력을 연도별로 묶어서 접기/펼치기(details+summary) 처리.
          - <details> : 기본 접힘 상태 (open 속성이 붙으면 펼침 상태로 시작)
          - list-none + [&::-webkit-details-marker]:hidden : 브라우저 기본 삼각형 마커 숨김
          - group-open:rotate-90 : 열릴 때 커스텀 화살표 회전 애니메이션
          연도는 최신순(2026 → 2025). 각 그룹 안은 사용자 지정 순서 유지.
          Education과 Awards는 성격 비슷(이력) → mt-20으로 살짝 좁게. */}
      <Reveal>
      <section className="mt-20">
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
      </Reveal>

      {/* ────────────── Featured Projects ──────────────
          featured 프로젝트가 하나라도 있을 때만 섹션 자체를 렌더.
          Awards(이력) → Featured(작업)로 성격 바뀌므로 mt-24로 크게 벌림. */}
      {featured.length > 0 && (
        <Reveal>
        <section className="mt-24">
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
        </Reveal>
      )}
    </div>
  );
}
