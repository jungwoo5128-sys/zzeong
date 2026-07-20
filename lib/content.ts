import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Award,
  AwardFrontmatter,
  Post,
  PostFrontmatter,
  Project,
  ProjectFrontmatter,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const AWARDS_DIR = path.join(CONTENT_DIR, "awards");

function readMdxFiles(dir: string): { file: string; raw: string }[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => ({
      file,
      raw: fs.readFileSync(path.join(dir, file), "utf8"),
    }));
}

export function getProjects(): Project[] {
  const items = readMdxFiles(PROJECTS_DIR).map(({ raw }) => {
    const { data, content } = matter(raw);
    return { ...(data as ProjectFrontmatter), body: content };
  });
  return items.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

export function getProject(slug: string): Project | null {
  return getProjects().find((p) => p.slug === slug) ?? null;
}

export function getPosts(): Post[] {
  const items = readMdxFiles(POSTS_DIR).map(({ raw }) => {
    const { data, content } = matter(raw);
    return { ...(data as PostFrontmatter), body: content };
  });
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  return getPosts().find((p) => p.slug === slug) ?? null;
}

// 수상 이력 상세 (content/awards/*.mdx). 파일 없는 수상은 null 반환.
export function getAwards(): Award[] {
  return readMdxFiles(AWARDS_DIR).map(({ raw }) => {
    const { data, content } = matter(raw);
    return { ...(data as AwardFrontmatter), body: content };
  });
}

export function getAward(slug: string): Award | null {
  return getAwards().find((a) => a.slug === slug) ?? null;
}

export function getNow(): string | null {
  const p = path.join(CONTENT_DIR, "now.mdx");
  if (!fs.existsSync(p)) return null;
  const { content } = matter(fs.readFileSync(p, "utf8"));
  return content;
}
