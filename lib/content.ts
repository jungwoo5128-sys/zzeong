import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type {
  Award,
  AwardFrontmatter,
  Lang,
  Project,
  ProjectFrontmatter,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
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

// 프로젝트 목록. lang이 en/ja면 content/projects/<lang>/<slug>.mdx 번역본을 한국어 원본 위에 덮어씀.
// 번역본에는 바뀌는 필드(title, summary, role, period 등)와 본문만 적고,
// image·stack·links·order 같은 공통 값은 원본에서 그대로 물려받음.
// 번역본이 없는 프로젝트는 한국어 원본으로 폴백(lang 필드가 "ko"로 남음).
export function getProjects(lang: Lang = "ko"): Project[] {
  const translations = new Map<string, { data: Partial<ProjectFrontmatter>; content: string }>();
  if (lang !== "ko") {
    for (const { raw } of readMdxFiles(path.join(PROJECTS_DIR, lang))) {
      const { data, content } = matter(raw);
      translations.set(data.slug, { data, content });
    }
  }

  const items = readMdxFiles(PROJECTS_DIR).map(({ raw }) => {
    const { data, content } = matter(raw);
    const base = data as ProjectFrontmatter;
    const t = translations.get(base.slug);
    return t
      ? { ...base, ...t.data, body: t.content }
      : { ...base, body: content };
  });
  return items.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    // order 명시된 것 우선(작은 값이 앞), 없는 건 뒤로. 마지막 tiebreaker 는 제목.
    const ao = a.order ?? Number.POSITIVE_INFINITY;
    const bo = b.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
}

export function getProject(slug: string, lang: Lang = "ko"): Project | null {
  return getProjects(lang).find((p) => p.slug === slug) ?? null;
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
