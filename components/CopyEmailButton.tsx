"use client";

// 이메일 주소를 클립보드에 복사하는 버튼.
// 클릭하면 라벨이 잠깐 "Copied!" 로 바뀌었다가 원래대로 돌아옴.
// navigator.clipboard 실패 시(구버전/HTTP) mailto 링크로 폴백.

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      // 2초 뒤에 원래 라벨로 복귀
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API 실패 시 그냥 메일 앱 열기
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="w-full rounded-full bg-[var(--foreground)] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--background)] transition-all hover:opacity-90 active:scale-[0.98]"
    >
      {copied ? "Copied!" : "Copy Email"}
    </button>
  );
}
