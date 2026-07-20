import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import PostListItem from "@/components/PostListItem";

export const metadata: Metadata = {
  title: "Writing",
};

export default function WritingPage() {
  const posts = getPosts();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Writing</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          생각을 정리한 글.
        </p>
      </header>
      {posts.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">아직 등록된 글이 없습니다.</p>
      ) : (
        <div>
          {posts.map((p) => (
            <PostListItem key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
