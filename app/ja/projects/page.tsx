// 프로젝트 목록 (/ja/projects) — 화면 본체는 components/ProjectsIndex.tsx 에서 언어별로 공유.

import type { Metadata } from "next";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description: "作ったもの、作っているもの。",
  alternates: {
    canonical: "/ja/projects",
    languages: { ko: "/projects", en: "/en/projects", ja: "/ja/projects" },
  },
};

export default function ProjectsJaPage() {
  return <ProjectsIndex lang="ja" />;
}
