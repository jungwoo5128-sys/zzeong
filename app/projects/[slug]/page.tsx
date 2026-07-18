import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { content } = await compileMDX({
    source: project.body,
    options: { parseFrontmatter: false },
  });

  return (
    <article>
      <Link
        href="/projects"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Projects
      </Link>
      <header className="mt-6 mb-8 space-y-3 border-b border-[var(--border)] pb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="text-[var(--muted)]">{project.summary}</p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-[var(--muted)]">Role</dt>
          <dd>{project.role}</dd>
          <dt className="text-[var(--muted)]">Period</dt>
          <dd>{project.period}</dd>
          <dt className="text-[var(--muted)]">Stack</dt>
          <dd>{project.stack.join(", ")}</dd>
          {project.links.length > 0 && (
            <>
              <dt className="text-[var(--muted)]">Links</dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-1">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    {l.name}
                  </a>
                ))}
              </dd>
            </>
          )}
        </dl>
      </header>
      <div className="prose-basic">{content}</div>
    </article>
  );
}
