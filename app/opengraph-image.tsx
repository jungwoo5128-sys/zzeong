// 링크 미리보기(OG) 이미지 — 그림은 lib/og.tsx 공용 렌더러, 여기선 언어만 지정.
// 이 경로 아래 페이지들(프로젝트 등)도 별도 이미지가 없으면 이 이미지를 물려받음.
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Jeongwoo Choe. Personal Site";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage("ko");
}
