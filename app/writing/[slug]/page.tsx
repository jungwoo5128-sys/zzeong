import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.body,
    options: { parseFrontmatter: false },
  });

  return (
    <article>
      <Link
        href="/writing"
        className="text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
      >
        ← Writing
      </Link>
      <header className="mt-6 mb-8 space-y-2 border-b border-[var(--border)] pb-8">
        <time className="text-xs text-[var(--muted)]">{post.date}</time>
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        {post.summary && (
          <p className="text-[var(--muted)]">{post.summary}</p>
        )}
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((t) => (
              <li
                key={t}
                className="rounded border border-[var(--border)] px-1.5 py-0.5 text-xs text-[var(--muted)]"
              >
                #{t}
              </li>
            ))}
          </ul>
        )}
      </header>
      <div className="prose-basic">{content}</div>
    </article>
  );
}
