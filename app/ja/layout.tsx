// /ja 아래 모든 페이지(홈·프로젝트) 공통 래퍼.
// lang="ja" + .lang-ja 로 일본어 폰트와 줄바꿈 규칙(globals.css)을 한 번에 적용.
export default function JapaneseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ja" className="lang-ja">
      {children}
    </div>
  );
}
