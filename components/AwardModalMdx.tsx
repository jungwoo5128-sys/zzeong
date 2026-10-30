// 수상 모달의 서버 쪽 래퍼 — 본문 MDX 를 서버에서 컴파일해서 클라이언트 모달에 넘긴다.
// (AwardModal 은 클라이언트 컴포넌트라 직접 MDX 를 컴파일할 수 없음)
import type { ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import AwardModal from "@/components/AwardModal";
import type { Award } from "@/types/content";

export default async function AwardModalMdx({
  award,
  children,
}: {
  award: Award;
  children: ReactNode;
}) {
  const { content } = await compileMDX({
    source: award.body,
    options: { parseFrontmatter: false },
  });

  return (
    <AwardModal award={award} content={content}>
      {children}
    </AwardModal>
  );
}
