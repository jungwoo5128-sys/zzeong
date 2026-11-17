// /en 아래 모든 페이지(홈·프로젝트) 공통 래퍼. 루트 <html lang="ko">를 영어로 덮어씀.
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
