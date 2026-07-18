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
