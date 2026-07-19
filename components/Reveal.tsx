"use client";

// 스크롤 내려서 뷰포트에 들어오면 부드럽게 페이드 + 살짝 위로 슬라이드하며 나타나는 래퍼.
// IntersectionObserver로 요소가 뷰포트에 들어왔는지 감지 → data-reveal 속성 토글.
// CSS 실제 트랜지션은 app/globals.css의 [data-reveal] 규칙이 담당.

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number; // 등장 시점을 ms 단위로 지연 (여러 요소 순차 등장 연출 가능)
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 접근성: 시스템 설정에서 애니메이션 최소화 켜져 있으면 즉시 표시.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        // 뷰포트에 있으면 표시, 벗어나면 다시 숨김.
        // → 위로 스크롤했다가 다시 내려올 때 애니메이션이 재실행됨.
        setVisible(entry.isIntersecting);
      },
      {
        // 요소가 뷰포트 하단에서 10% 정도 여유를 두고 감지 시작
        // (완전히 화면에 들어오기 전에 등장 시작해서 자연스러움)
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : ""}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
