export type Lang = "ko" | "en" | "ja";

export type ProjectLink = {
  name: string;
  url: string;
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  lang: Lang;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  links: ProjectLink[];
  featured: boolean;
  // 캐러셀 카드에 쓸 대표 이미지 (public/ 기준 경로). 없으면 placeholder 렌더.
  image?: string;
  // 카드 이미지 오버레이에 노출할 짧은 카테고리 라벨 (예: "iOS · Android", "COMING SOON").
  tag?: string;
};

export type Project = ProjectFrontmatter & {
  body: string;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  lang: Lang;
  date: string;
  summary: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  body: string;
};
