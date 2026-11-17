// 프로젝트 목록 (/projects) — 화면 본체는 components/ProjectsIndex.tsx 에서 언어별로 공유.

import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description: "만든 것과 만드는 중인 것.",
  alternates: {
    canonical: "/projects",
    languages: { ko: "/projects", en: "/en/projects", ja: "/ja/projects" },
  },
};

export default function ProjectsKoPage() {
  return <ProjectsIndex lang="ko" />;
}
