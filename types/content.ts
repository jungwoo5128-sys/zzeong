export type Lang = "ko" | "en" | "ja";

export type ProjectLink = {
  name: string;
  url: string;
};

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  lang: Lang;
  summary: string;
  role: string;
  stack: string[];
  period: string;
  links: ProjectLink[];
  featured: boolean;
  // 캐러셀 카드에 쓸 대표 이미지 (public/ 기준 경로). 없으면 placeholder 렌더.
  image?: string;
  // 카드 이미지 오버레이에 노출할 짧은 카테고리 라벨 (예: "iOS · Android", "COMING SOON").
  tag?: string;
};

export type Project = ProjectFrontmatter & {
  body: string;
};

// ─── Award (수상 이력 상세) ───
// 홈 Awards 섹션의 특정 항목을 클릭하면 열리는 모달용.
// content/awards/*.mdx 로 관리. 파일 있는 수상만 모달 활성화, 없는 건 정적 텍스트로 유지.
export type AwardFrontmatter = {
  title: string;         // 모달 헤더에 쓰는 완전한 제목
  slug: string;          // 파일명 = URL·매칭 키
  lang: Lang;
  event: string;         // 대회명 (예: "Upstage Low-code AI Startup Hackathon")
  tier: string;          // 등급 (예: "최우수상")
  date: string;          // "YYYY.MM" 표시용
  year: number;          // 홈 Awards 리스트와 매칭 정렬용
  organizer?: string;    // 주최
  team?: string;         // 팀명
  pdf?: string;          // PPT/피치덱 PDF 경로 (public 기준)
  thumbnail?: string;    // 대표 썸네일 이미지 경로
  photos?: string[];     // 추가 사진 경로들
  certificateImage?: string; // 상장 이미지 (PNG 등, 모달에 크게 노출)
  certificatePdf?: string;   // 상장 원본 PDF (다운로드용, 선택)
};

export type Award = AwardFrontmatter & {
  body: string;
};

export type PostFrontmatter = {
  title: string;
  slug: string;
  lang: Lang;
  date: string;
  summary: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  body: string;
};
