// 프로젝트 목록 (/en/projects) — 화면 본체는 components/ProjectsIndex.tsx 에서 언어별로 공유.

import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’ve built and am building.",
  alternates: {
    canonical: "/en/projects",
    languages: { ko: "/projects", en: "/en/projects", ja: "/ja/projects" },
  },
};

export default function ProjectsEnPage() {
  return <ProjectsIndex lang="en" />;
}
