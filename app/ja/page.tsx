// 일본어 홈 페이지(/ja) — 한국어 홈(app/page.tsx)과 같은 구조에 일본어 카피만 교체.
// 프로젝트는 일본어 번역본(content/projects/ja)을 쓰고, 수상 모달·타임라인은 한국어 그대로 둠.
// 일본어 폰트·줄바꿈 규칙은 app/ja/layout.tsx 의 .lang-ja 래퍼에서 적용됨.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAward, getProjects } from "@/lib/content";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";
import AwardModalMdx from "@/components/AwardModalMdx";

// 검색·공유 시 보일 일본어 설명. 제목은 루트 레이아웃 기본값(zzeong) 유지.
const description =
  "観察したペインポイントをプロダクトとして形にする人。チェ・ジョンウのパーソナルサイト。";

export const metadata: Metadata = {
  description,
  openGraph: { description, locale: "ja_JP", url: "https://zzeong.com/ja" },
  alternates: {
    canonical: "/ja",
    languages: { ko: "/", en: "/en", ja: "/ja" },
  },
};

export default function JapaneseHomePage() {
  // featured=true 프로젝트를 캐러셀에 노출. placeholder는 뒤로 정렬.
  const featured = getProjects("ja")
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aPlaceholder = a.slug.startsWith("placeholder-");
      const bPlaceholder = b.slug.startsWith("placeholder-");
      if (aPlaceholder !== bPlaceholder) return aPlaceholder ? 1 : -1;
      return 0;
    });

  // 수상 모달 — 한국어 MDX 그대로 사용.
  const upstageAward = getAward("upstage-mailman");
  const bell1stAward = getAward("bell-1st-ideathon");
  const bell2ndAward = getAward("bell-2nd-ideathon");
  const blackbox31Award = getAward("blackbox-31-demoday");
  const estsoftEvSignalAward = getAward("estsoft-ev-signal");
  const roombapAward = getAward("sogang-ai-launchpad-roombap");
  const camp2025Award = getAward("sogang-2025-startup-camp");

  return (
    <div>
      {/* ────────────── Landing ──────────────
          한국어 버전과 동일한 비주얼. 한자 좌우명 아래 캡션만 일본어. */}
      <div className="relative flex min-h-[calc(100svh-10rem)] flex-col overflow-hidden text-center">
        {/* 하단 웜 글로우 — 한국어 페이지와 동일 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[10%] left-1/2 h-[32%] w-[60%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 138, 76, 0.45), rgba(255, 138, 76, 0.15) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col justify-center gap-12 sm:gap-16">
          {/* 이름 + Personal Site */}
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

          {/* 한자 좌우명 + 일본어 캡션 */}
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
              今日の私は、昨日の私とは違う。
            </p>
          </div>
        </div>

        {/* 하단 스크롤 큐 */}
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

      {/* ────────────── About + Portrait Card ────────────── */}
      <Reveal>
      <section className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-[1fr_360px] sm:items-center sm:gap-24 lg:gap-32">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            About
          </p>
          {/* 태그라인 — 명조체(.lang-ja .font-hanja) 헤드라인 */}
          <h2 className="font-hanja mt-6 text-3xl font-medium leading-[1.3] tracking-tight sm:text-4xl">
            {/* 문절 단위 inline-block → 「人。」만 다음 줄로 떨어지는 현상 방지 */}
            <span className="inline-block">観察した</span>
            <span className="inline-block">ペインポイントを、</span>
            <span className="inline-block">プロダクトとして</span>
            <span className="inline-block">形にする人。</span>
          </h2>
          <div className="mt-8 space-y-4 leading-[1.85] text-[var(--foreground)]/75">
            <p>
              はじめまして、チェ・ジョンウです。日常の中で見つけたペインポイントを、実際のプロダクトへと形にしていく過程が好きです。
            </p>
            <p>
              現在は西江大学で、
              <a
                href="https://sgublackbox.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Blackbox
              </a>
              という起業サークルを運営しています。
            </p>
          </div>
          <a
            href="mailto:jungwoo5128@gmail.com"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get in Touch
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* 포트레이트 카드 — 이름 아래에 카타카나 표기 + 한글 이름 */}
        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-lg sm:mx-0">
          <Image
            src="/me.jpg"
            alt="チェ・ジョンウ"
            width={320}
            height={400}
            className="aspect-[4/5] w-full object-cover"
            priority
          />
          <div className="px-5 py-5">
            <p className="text-base font-bold text-[var(--foreground)]">
              Jeongwoo Choe
            </p>
            <p className="text-sm text-[var(--muted)]">
              <span className="whitespace-nowrap">チェ・ジョンウ</span> / 최정우
            </p>
            <p className="mt-1 text-sm text-[var(--foreground)]/80">
              Product Builder
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              <li className="rounded-full bg-[var(--foreground)] px-2.5 py-1 text-xs font-medium text-[var(--background)]">
                企画
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                Vibe coding
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                AI業務自動化
              </li>
            </ul>
          </div>
        </div>
      </section>
      </Reveal>

      {/* ────────────── Education ──────────────
          한자 표기가 확실한 학교명은 한자로, 불확실한 건 카타카나로 표기. */}
      <Reveal>
      <section className="mt-24">
        <h2 className="mb-4 text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
          Education
        </h2>
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">現在</span>
            <span>西江大学 経営学科・スタートアップ連携専攻 在学中</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2020</span>
            <span>晋州 大亜高等学校 卒業</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2017</span>
            <span>晋州中学校 卒業</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2014</span>
            <div>
              <p>晋州 カジャ初等学校 卒業</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                アメリカへ転校・Hawthorn Elementary South 卒業（2013）
              </p>
            </div>
          </li>
        </ul>
      </section>
      </Reveal>

      {/* ────────────── Awards ──────────────
          연도별 접기/펼치기. 모달 본문은 한국어라 하단에 안내 문구 추가. */}
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
                <span className="text-xs text-[var(--muted)]">3件</span>
              </div>
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">最優秀賞</span>
                {upstageAward ? (
                  <AwardModalMdx award={upstageAward}>
                    <span>Upstage主催 Low-code AI Startup Hackathon</span>
                  </AwardModalMdx>
                ) : (
                  <span>Upstage主催 Low-code AI Startup Hackathon</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">奨励賞</span>
                {estsoftEvSignalAward ? (
                  <AwardModalMdx award={estsoftEvSignalAward}>
                    <span>ESTsoft主催 EST AI Challengers Hackathon</span>
                  </AwardModalMdx>
                ) : (
                  <span>ESTsoft主催 EST AI Challengers Hackathon</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">優秀賞</span>
                {roombapAward ? (
                  <AwardModalMdx award={roombapAward}>
                    <span>西江大学 SOGANG AI LAUNCHPAD AI起業キャンプ</span>
                  </AwardModalMdx>
                ) : (
                  <span>西江大学 SOGANG AI LAUNCHPAD AI起業キャンプ</span>
                )}
              </li>
            </ul>
          </details>

          {/* ── 2025년 그룹 ── */}
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium">2025</span>
                <span className="text-xs text-[var(--muted)]">4件</span>
              </div>
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">大賞</span>
                {bell1stAward ? (
                  <AwardModalMdx award={bell1stAward}>
                    <span>西江大学 第1回アイデアソン BELL</span>
                  </AwardModalMdx>
                ) : (
                  <span>西江大学 第1回アイデアソン BELL</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">1位</span>
                {blackbox31Award ? (
                  <AwardModalMdx award={blackbox31Award}>
                    <span>西江大学 起業サークル Blackbox 31期 デモデイ</span>
                  </AwardModalMdx>
                ) : (
                  <span>西江大学 起業サークル Blackbox 31期 デモデイ</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">優秀賞</span>
                {bell2ndAward ? (
                  <AwardModalMdx award={bell2ndAward}>
                    <span>西江大学 第2回アイデアソン BELL</span>
                  </AwardModalMdx>
                ) : (
                  <span>西江大学 第2回アイデアソン BELL</span>
                )}
              </li>
              <li className="grid grid-cols-[5.5rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">優秀賞</span>
                {camp2025Award ? (
                  <AwardModalMdx award={camp2025Award}>
                    <span>西江大学 2025 起業キャンプ</span>
                  </AwardModalMdx>
                ) : (
                  <span>西江大学 2025 起業キャンプ</span>
                )}
              </li>
            </ul>
          </details>
        </div>
        {/* 모달 상세가 한국어라는 안내 */}
        <p className="mt-4 text-xs text-[var(--muted)]">
          受賞の詳細（ピッチ資料・説明）は韓国語で記載しています。
        </p>
      </section>
      </Reveal>

      {/* ────────────── Projects 캐러셀 ────────────── */}
      {featured.length > 0 && (
        <Reveal>
        <section className="mt-24">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Selected Projects
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Projects
            </h2>
            <div className="mt-6 h-px w-full bg-[var(--border)]" />
          </div>
          <div className="mt-12">
            <ProjectCarousel projects={featured} lang="ja" />
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/ja/projects"
              className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              View all works
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        </Reveal>
      )}

      {/* ────────────── Contact ────────────── */}
      <Reveal>
      <section className="mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Contact
            </p>
            <h2 className="mt-6 font-hanja text-3xl font-medium leading-[1.3] tracking-tight sm:text-4xl">
              <span className="inline-block">新しい</span>
              <span className="inline-block">コラボレーションを</span>
              <br />
              <span className="inline-block">お待ちしています。</span>
            </h2>
            <div className="mt-8 max-w-md space-y-4 leading-[1.85] text-[var(--foreground)]/75">
              <p>
                ホームページ制作の受託、プロダクトのパートナーシップなど、さまざまな形のコラボレーションを歓迎します。
              </p>
              <p>下記のチャネルからお気軽にご連絡ください。</p>
            </div>
            {/* 홈페이지 제작 문의 폼(Tally) — 폼 자체는 한국어 */}
            <a
              href="https://tally.so/r/RG6PE9"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <span className="underline underline-offset-4">
                ホームページ制作のお問い合わせフォーム
              </span>
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Card 1: Direct Inquiry */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Direct Inquiry
              </p>
              <p className="mt-4 break-all font-bold text-[var(--foreground)]">
                jungwoo5128@gmail.com
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {/* 카타카나 이름이 「チェ・」에서 끊기지 않게 nowrap */}
                Jeongwoo Choe /{" "}
                <span className="whitespace-nowrap">チェ・ジョンウ</span>
              </p>
              <div className="mt-8 flex-1" />
              <div className="border-t border-[var(--border)] pt-5">
                <CopyEmailButton email="jungwoo5128@gmail.com" />
              </div>
              {/* 해외 방문자용이라 국가번호 포함 표기 (EN 페이지와 동일) */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                  Mobile
                </p>
                <a
                  href="tel:+821059365128"
                  className="mt-1 block font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
                >
                  +82 10-5936-5128
                </a>
              </div>
            </div>

            {/* Card 2: Elsewhere */}
            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Elsewhere
              </p>
              <p className="mt-4 text-sm text-[var(--foreground)]/80">
                他のチャネルでもお会いできます。
              </p>
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
