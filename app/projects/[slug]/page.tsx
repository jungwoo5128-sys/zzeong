// 프로젝트 상세 (/projects/[slug]) — 화면 본체는 components/ProjectDetail.tsx 에서 언어별로 공유.

import ProjectDetail, {
  projectMetadata,
  projectStaticParams,
} from "@/components/ProjectDetail";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectStaticParams();
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  return projectMetadata(slug, "ko");
}

export default async function ProjectKoPage({ params }: Params) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} lang="ko" />;
}
