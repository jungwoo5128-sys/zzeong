// /timeline 페이지 — 개인 연혁(출생부터 지금까지) 전부 최신순으로 나열.
// 홈의 Education / Awards 요약을 상세하게 편 버전. 새 이력 추가는 아래 events 배열만 손보면 됨.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "최정우의 연혁 — 출생부터 지금까지.",
};

// 연혁 항목 타입. date는 화면 표기용 문자열, sort는 정렬용 키(YYYYMM 형태).
type Event = {
  date: string; // 표시용 (예: "2024.08")
  sort: number; // 정렬용 (예: 202408)
  label: string;
  note?: string; // 서브 라인(선택). 부가 설명이나 태그.
};

// 최신 → 과거 순으로 표시하기 위해 sort 내림차순으로 정렬함(아래 sort 호출).
// 수상 이력은 이 페이지에서 제외 — 홈의 Awards 섹션에서 별도로 관리.
const events: Event[] = [
  { date: "2026.09", sort: 202609, label: "Blackbox 33기 회장" },
  { date: "2026.07", sort: 202607, label: "여행 지도 어플 Trecord 출시" },
  { date: "2026.03", sort: 202603, label: "Blackbox 32기 회장" },
  { date: "2025.09", sort: 202509, label: "Blackbox 31기 부회장" },
  { date: "2025.03", sort: 202503, label: "서강대학교 중앙 창업동아리 Blackbox 가입" },
  { date: "2024.08", sort: 202408, label: "육군 15사단 전역" },
  { date: "2023.02", sort: 202302, label: "대한민국 육군 입대" },
  { date: "2022.02", sort: 202202, label: "서강대학교 경영학과 입학" },
  { date: "2020.02", sort: 202002, label: "진주 대아고등학교 졸업" },
  { date: "2017.03", sort: 201703, label: "진주 대아고등학교 입학" },
  { date: "2017.02", sort: 201702, label: "진주중학교 졸업" },
  { date: "2014.03", sort: 201403, label: "진주중학교 입학" },
  { date: "2014.02", sort: 201402, label: "진주 가좌초등학교 졸업" },
  { date: "2013.12", sort: 201312, label: "진주 가좌초등학교 전학 (귀국)" },
  { date: "2012.06", sort: 201206, label: "Hawthorn Elementary South 전학 (미국)" },
  { date: "2008.03", sort: 200803, label: "진주 가좌초등학교 입학" },
  { date: "2001.11", sort: 200111, label: "출생" },
];

export default function TimelinePage() {
  // 최신순 정렬 (sort 값 큰 것이 위로).
  const sorted = [...events].sort((a, b) => b.sort - a.sort);

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Timeline</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          지금까지 정우의 여정.
        </p>
      </header>

      {/*
        연혁 리스트. 각 항목은 2열 그리드:
          - 왼쪽 6.5rem: 날짜 (YYYY 또는 YYYY.MM)
          - 오른쪽 1fr: 이벤트 설명
        상하 border + 각 행 사이 divide.
      */}
      <ul className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {/* 최신 항목 위에 붙이는 "진행 중" 라벨 — 날짜 컬럼 대신 점 세개(…),
            우측은 유쾌한 톤의 문구. */}
        <li className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm">
          <span className="text-[var(--muted)]">…</span>
          <span className="italic text-[var(--foreground)]/70">
            계속 성장 중.....
          </span>
        </li>
        {sorted.map((e) => (
          <li
            key={`${e.sort}-${e.label}`}
            className="grid grid-cols-[6.5rem_1fr] gap-4 py-3 text-sm"
          >
            <span className="tabular-nums text-[var(--muted)]">{e.date}</span>
            <div>
              <p>{e.label}</p>
              {e.note && (
                <p className="mt-1 text-xs text-[var(--muted)]">{e.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
