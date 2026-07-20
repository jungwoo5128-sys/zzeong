// English home page (/en) — mirrors app/page.tsx structure with English copy.
// Deep MDX content (project details, award modals, timeline entries) stays Korean
// since translating all of it is out of scope for the light EN version.
// Nav labels remain English on both sides (they were already English).

import Image from "next/image";
import Link from "next/link";
import { getAward, getProjects } from "@/lib/content";
import ProjectCarousel from "@/components/ProjectCarousel";
import Reveal from "@/components/Reveal";
import CopyEmailButton from "@/components/CopyEmailButton";
import AwardModal from "@/components/AwardModal";

export default function EnglishHomePage() {
  const featured = getProjects()
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aPlaceholder = a.slug.startsWith("placeholder-");
      const bPlaceholder = b.slug.startsWith("placeholder-");
      if (aPlaceholder !== bPlaceholder) return aPlaceholder ? 1 : -1;
      return 0;
    });

  // Award modals — same MDX content (Korean), just triggered from EN page too.
  const upstageAward = getAward("upstage-mailman");
  const bell1stAward = getAward("bell-1st-ideathon");
  const bell2ndAward = getAward("bell-2nd-ideathon");
  const blackbox31Award = getAward("blackbox-31-demoday");

  return (
    <div>
      {/* Landing — same visual as Korean version, English caption below hanja motto. */}
      <div className="flex min-h-[calc(100svh-10rem)] flex-col text-center">
        <div className="flex flex-1 flex-col justify-center gap-12 sm:gap-16">
          {/* Name (primary) + Personal Site subtitle */}
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

          {/* Hanja motto (supporting) — English caption. */}
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
              Today’s self differs from yesterday’s.
            </p>
          </div>
        </div>

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

      {/* About + Portrait card — English tagline & bio. Skill tags English. */}
      <Reveal>
      <section className="mt-16 grid gap-10 sm:mt-24 sm:grid-cols-[1fr_360px] sm:items-center sm:gap-24 lg:gap-32">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
            About
          </p>
          <h2 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
            A builder who turns observed pain points into products.
          </h2>
          <div className="mt-8 space-y-4 leading-[1.85] text-[var(--foreground)]/75">
            <p>
              Hi, I’m Jeongwoo Choe. I enjoy the process of turning pain points
              I notice in everyday life into products that actually work.
            </p>
            <p>
              I currently lead <span className="whitespace-nowrap">Blackbox</span>,
              a student-run startup club at Sogang University. I’m also open
              to freelance website work.
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

        <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-white shadow-lg sm:mx-0">
          <Image
            src="/me.jpg"
            alt="Jeongwoo Choe"
            width={320}
            height={400}
            className="aspect-[4/5] w-full object-cover"
            priority
          />
          <div className="px-5 py-5">
            <p className="text-base font-bold text-[var(--foreground)]">
              Jeongwoo Choe
            </p>
            <p className="text-sm text-[var(--muted)]">최정우</p>
            <p className="mt-1 text-sm text-[var(--foreground)]/80">
              Product Builder
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              <li className="rounded-full bg-[var(--foreground)] px-2.5 py-1 text-xs font-medium text-[var(--background)]">
                Product Strategy
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                Vibe Coding
              </li>
              <li className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)]">
                AI Automation
              </li>
            </ul>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Education — school names stay Korean (proper nouns); labels English. */}
      <Reveal>
      <section className="mt-24">
        <h2 className="mb-4 text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
          Education
        </h2>
        <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">Present</span>
            <span>
              Sogang University, Business Administration · Startup-linked
              Major
            </span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2020</span>
            <span>Daea High School, Jinju (Graduated)</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2017</span>
            <span>Jinju Middle School (Graduated)</span>
          </li>
          <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
            <span className="text-[var(--muted)]">2014</span>
            <div>
              <p>Gajwa Elementary School, Jinju (Graduated)</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Transferred to the US · Graduated from Hawthorn Elementary
                South (2013)
              </p>
            </div>
          </li>
        </ul>
      </section>
      </Reveal>

      {/* Awards — same modals (Korean detail). Section header English. */}
      <Reveal>
      <section className="mt-20">
        <h2 className="mb-4 text-sm font-medium tracking-widest text-[var(--muted)] uppercase">
          Awards
        </h2>
        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium">2026</span>
                <span className="text-xs text-[var(--muted)]">1 entry</span>
              </div>
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[7rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">Grand Prize</span>
                {upstageAward ? (
                  <AwardModal award={upstageAward}>
                    <span>Upstage Low-code AI Startup Hackathon</span>
                  </AwardModal>
                ) : (
                  <span>Upstage Low-code AI Startup Hackathon</span>
                )}
              </li>
            </ul>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium">2025</span>
                <span className="text-xs text-[var(--muted)]">4 entries</span>
              </div>
              <span className="text-xs text-[var(--muted)] transition-transform group-open:rotate-90">
                ▶
              </span>
            </summary>
            <ul className="pb-3">
              <li className="grid grid-cols-[7rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">Gold Prize</span>
                {bell1stAward ? (
                  <AwardModal award={bell1stAward}>
                    <span>Sogang University BELL Ideathon (1st)</span>
                  </AwardModal>
                ) : (
                  <span>Sogang University BELL Ideathon (1st)</span>
                )}
              </li>
              <li className="grid grid-cols-[7rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">1st Place</span>
                {blackbox31Award ? (
                  <AwardModal award={blackbox31Award}>
                    <span>Blackbox 31st Cohort Demo Day</span>
                  </AwardModal>
                ) : (
                  <span>Blackbox 31st Cohort Demo Day</span>
                )}
              </li>
              <li className="grid grid-cols-[7rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">Excellence</span>
                {bell2ndAward ? (
                  <AwardModal award={bell2ndAward}>
                    <span>Sogang University BELL Ideathon (2nd)</span>
                  </AwardModal>
                ) : (
                  <span>Sogang University BELL Ideathon (2nd)</span>
                )}
              </li>
              <li className="grid grid-cols-[7rem_1fr] gap-4 py-2 text-sm">
                <span className="text-[var(--muted)]">Excellence</span>
                <span>Sogang 2025 Startup Camp</span>
              </li>
            </ul>
          </details>
        </div>
        {/* Note that modals are Korean-only */}
        <p className="mt-4 text-xs text-[var(--muted)]">
          Award details (pitch deck, description) are documented in Korean.
        </p>
      </section>
      </Reveal>

      {/* Featured Projects — carousel same, header English. */}
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
            <ProjectCarousel projects={featured} />
          </div>
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

      {/* Contact */}
      <Reveal>
      <section className="mt-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-20">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Contact
            </p>
            <h2 className="mt-6 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
              Open to
              <br />
              new collaborations.
            </h2>
            <div className="mt-8 max-w-md space-y-4 leading-[1.85] text-[var(--foreground)]/75">
              <p>
                Website builds, product partnerships, and other forms of
                collaboration are all welcome.
              </p>
              <p>Feel free to reach out through the channels below.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
              <div className="mt-8 flex-1" />
              <div className="border-t border-[var(--border)] pt-5">
                <CopyEmailButton email="jungwoo5128@gmail.com" />
              </div>
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

            <div className="flex flex-col rounded-2xl bg-white p-6 shadow-lg">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Elsewhere
              </p>
              <p className="mt-4 text-sm text-[var(--foreground)]/80">
                You can also find me elsewhere.
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
