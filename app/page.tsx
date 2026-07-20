import Image from "next/image";
import Link from "next/link";
import { getAward, getProjects } from "@/lib/content";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";
import AwardModal from "@/components/AwardModal";

// 홈 페이지(/) — Landing + About + Education + Awards + Projects 캐러셀 순서로 배치.
export default function HomePage() {
  // featured=true 프로젝트를 캐러셀에 노출. placeholder는 뒤로 정렬(실제 프로젝트 우선).
  const featured = getProjects()
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aPlaceholder = a.slug.startsWith("placeholder-");
      const bPlaceholder = b.slug.startsWith("placeholder-");
      if (aPlaceholder !== bPlaceholder) return aPlaceholder ? 1 : -1;
      return 0;
    });

  // 상세 콘텐츠(MDX)가 있는 수상만 모달 활성화. 없으면 정적 텍스트 유지.
  const upstageAward = getAward("upstage-mailman");
  const bell1stAward = getAward("bell-1st-ideathon");
  const bell2ndAward = getAward("bell-2nd-ideathon");
  const blackbox31Award = getAward("blackbox-31-demoday");

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
      <div className="relative flex min-h-[calc(100svh-10rem)] flex-col overflow-hidden text-center">
        {/* 하단 웜 글로우 — 부드러운 오렌지 라디얼이 바닥에서 은은하게 배어나옴.
            width 60% / height 32% 크기, 하단 -10% 위치로 살짝 잘려서 아래로 흘러넘치는 인상.
            매우 넓게 퍼지도록 (transparent 70%까지). 정적 (모션 없음). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[10%] left-1/2 h-[32%] w-[60%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 138, 76, 0.45), rgba(255, 138, 76, 0.15) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* 중앙 정렬 콘텐츠 — 이름이 주역, 좌우명이 서포팅.
            gap-12 sm:gap-16으로 두 블록 사이 공간 확보.
            relative + z-10 으로 배경 글로우 위에 오도록. */}
        <div className="relative z-10 flex flex-1 flex-col justify-center gap-12 sm:gap-16">
          {/* ── 주역: 이름 (이탤릭 세리프로 kyne 톤 채용) ──
              font-serif italic + 소문자 → 세련된 매거진 편집체 느낌.
              마침표(.) 하나 더 붙여서 완결감. */}
          <div>
            <h1
              className="hanja-char font-serif text-5xl italic leading-[1.05] tracking-tight sm:text-7xl"
              style={{ animationDelay: "0ms" }}
            >
              Jeongwoo Choe.
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
          {/* 태그라인 — h2(랜딩 h1 다음). 한글이라 이탤릭 대신 세리프 upright.
              font-hanja(한글 세리프 스택) + font-medium으로 편집체 톤 유지. */}
          <h2 className="font-hanja mt-6 text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl">
            관찰한 페인포인트를 프로덕트로 구현하는 사람.
          </h2>
          {/* About 문단들 — leading-[1.85]로 편안하게 */}
          <div className="mt-8 space-y-4 leading-[1.85] text-[var(--foreground)]/75">
            <p>
              안녕하세요, 최정우입니다. 일상에서 발견한 페인포인트를
              실제 프로덕트로 옮기는 과정을 좋아합니다.
            </p>
            <p>
              지금은 서강대학교에서 Blackbox라는 창업동아리를 운영하고 있습니다.
              
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
                Vibe coding
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                AI 업무 자동화
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
              {/* Upstage 수상 — 상세 콘텐츠(MDX) 있으면 AwardModal로 감싸서 클릭 가능.
                  없으면 정적 텍스트로 폴백. */}
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">최우수상</span>
                {upstageAward ? (
                  <AwardModal award={upstageAward}>
                    <span>Upstage 주관 Low-code AI Startup Hackathon</span>
                  </AwardModal>
                ) : (
                  <span>Upstage 주관 Low-code AI Startup Hackathon</span>
                )}
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
                {bell1stAward ? (
                  <AwardModal award={bell1stAward}>
                    <span>서강대학교 제1회 아이디어톤 BELL</span>
                  </AwardModal>
                ) : (
                  <span>서강대학교 제1회 아이디어톤 BELL</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">1등</span>
                {blackbox31Award ? (
                  <AwardModal award={blackbox31Award}>
                    <span>서강대학교 창업동아리 Blackbox 31기 데모데이</span>
                  </AwardModal>
                ) : (
                  <span>서강대학교 창업동아리 Blackbox 31기 데모데이</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">우수상</span>
                {bell2ndAward ? (
                  <AwardModal award={bell2ndAward}>
                    <span>서강대학교 제2회 아이디어톤 BELL</span>
                  </AwardModal>
                ) : (
                  <span>서강대학교 제2회 아이디어톤 BELL</span>
                )}
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

      {/* ────────────── Projects 캐러셀 ──────────────
          레퍼런스(Junbeom Park) 스타일 참조 — 큰 정사각 이미지 카드 하나가
          중앙에 sharp/크게, 좌우 형제는 blur+scale로 서포팅.
          featured=true 프로젝트만 노출. placeholder 프로젝트는 실제 프로젝트 뒤로 정렬. */}
      {featured.length > 0 && (
        <Reveal>
        <section className="mt-24">
          {/* 섹션 헤더 — SELECTED PROJECTS 라벨 + 큰 PROJECTS 제목 + 얇은 구분선.
              편집체 매거진 마스트헤드 느낌. */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Selected Projects
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Projects
            </h2>
            <div className="mt-6 h-px w-full bg-[var(--border)]" />
          </div>

          {/* 캐러셀 — 클라이언트 컴포넌트. 뷰포트 폭 전체로 breakout. */}
          <div className="mt-12">
            <ProjectCarousel projects={featured} />
          </div>

          {/* 하단 CTA — 전체 프로젝트 리스트 페이지로 이동. About 섹션 CTA와 동일한 pill 스타일. */}
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              View all works
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        </Reveal>
      )}

      {/* ────────────── Contact ──────────────
          홈 페이지의 마지막 섹션 — 방문자가 스크롤 여정 끝에서 만나는 CTA.
          레퍼런스(Junbeom Park) 스타일:
          - 좌측: CONTACT 라벨 + 큰 한글 헤딩 + 짧은 설명
          - 우측: 2개 카드 (Direct Inquiry + Elsewhere) */}
      <Reveal>
      <section className="mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-20">
          {/* ── 좌측: 섹션 헤더 + 설명 ── */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Contact
            </p>
            {/* 한글 세리프로 매거진 헤드라인 톤 */}
            <h2 className="mt-6 font-hanja text-3xl font-medium leading-[1.25] tracking-tight sm:text-4xl">
              새로운 협업을
              <br />
              기다리고 있습니다.
            </h2>
            <div className="mt-8 max-w-md space-y-4 leading-[1.85] text-[var(--foreground)]/75">
              <p>
                홈페이지 제작 외주, 프로덕트 파트너십 등 다양한 형태의 협업을
                환영합니다.
              </p>
              <p>아래 채널로 자유롭게 연락 주세요.</p>
            </div>
          </div>

          {/* ── 우측: 2개 카드 나란히 (모바일은 스택) ── */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 1: Direct Inquiry — 이메일 + Copy 버튼 */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Direct Inquiry
              </p>
              <p className="mt-4 break-all font-bold text-[var(--foreground)]">
                jungwoo5128@gmail.com
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Jeongwoo Choe / 최정우
              </p>
              {/* flex-1로 위 컨텐츠와 버튼 사이 자동 spacer — 카드 높이 어긋나도 버튼은 하단 정렬 */}
              <div className="mt-8 flex-1" />
              <div className="border-t border-[var(--border)] pt-5">
                <CopyEmailButton email="jungwoo5128@gmail.com" />
              </div>
              {/* 모바일 번호 — 이메일이 어려운 경우 대비.
                  tel: 링크로 걸어 모바일 브라우저에서 탭 시 전화 앱 실행. */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Mobile
                </p>
                <a
                  href="tel:+821059365128"
                  className="mt-1 block font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  010-5936-5128
                </a>
              </div>
            </div>

            {/* Card 2: Elsewhere — 다른 채널 링크 */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Elsewhere
              </p>
              <p className="mt-4 text-sm text-[var(--foreground)]/80">
                다른 채널에서도 만날 수 있어요.
              </p>
              {/* 링크 리스트 — 각 항목은 호버 시 액센트 컬러 + 화살표 이동 */}
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a
                    href="https://github.com/jungwoo5128-sys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-[var(--border)] py-2 transition-colors hover:text-[var(--accent)]"
                  >
                    <span>GitHub</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
    </div>
  );
}
