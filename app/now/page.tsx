import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import { getNow } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
  description: "지금 하고 있는 것들.",
};

export default async function NowPage() {
  const body = getNow() ?? "";
  const { content } = await compileMDX({
    source: body,
    options: { parseFrontmatter: false },
  });

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Now</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          지금 시간을 쓰고 있는 것들.{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            /now 페이지란?
          </a>
        </p>
      </header>
      <div className="prose-basic">{content}</div>
    </div>
  );
}
