import Link from "next/link";
import type { Post } from "@/types/content";

export default function PostListItem({ post }: { post: Post }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group block border-b border-[var(--border)] py-5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-medium tracking-tight group-hover:underline underline-offset-4">
          {post.title}
        </h3>
        <time className="shrink-0 text-xs text-[var(--muted)]">
          {post.date}
        </time>
      </div>
      {post.summary && (
        <p className="mt-1 text-sm text-[var(--muted)]">{post.summary}</p>
      )}
    </Link>
  );
}
