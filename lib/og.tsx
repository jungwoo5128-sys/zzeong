// OG(링크 미리보기) 이미지 공용 렌더러. 랜딩 화면과 같은 톤:
// 밝은 배경 + 이탤릭 세리프 이름 + 한자 좌우명 + 바닥 오렌지 글로우.
// app/opengraph-image.tsx, app/en/…, app/ja/… 가 캡션 문구만 바꿔서 호출.
// 빌드 시 한 번 1200×630 PNG로 생성됨(정적).

import { ImageResponse } from "next/og";
import type { Lang } from "@/types/content";

export const ogSize = { width: 1200, height: 630 };

const MOTTO = ["今", "我", "異", "昨", "我"];

// 좌우명 아래 캡션 — 랜딩의 언어별 문구와 동일.
const captions: Record<Lang, string> = {
  ko: "오늘의 나는 어제의 나와 다르다.",
  en: "Today’s self differs from yesterday’s.",
  ja: "今日の私は、昨日の私とは違う。",
};

// Google Fonts에서 필요한 글자만(text=) 잘라 받아옴. 빌드 시점에 한 번만 실행.
// User-Agent를 안 보내면 Google이 satori가 읽을 수 있는 TTF 주소를 돌려줌.
async function loadGoogleFont(family: string, text: string): Promise<ArrayBuffer> {
  const css = await (
    await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    )
  ).text();
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error(`OG font not found: ${family}`);
  return (await fetch(url)).arrayBuffer();
}

export async function renderOgImage(lang: Lang) {
  const name = "Jeongwoo Choe.";
  const caption = captions[lang];

  // 이름: 이탤릭 세리프(랜딩의 font-serif italic 대응)
  // 한자·캡션: 한·중·일 글자를 모두 담은 Noto Serif 계열
  const cjkFamily = lang === "ja" ? "Noto+Serif+JP:wght@500" : "Noto+Serif+KR:wght@500";
  const [nameFont, cjkFont, labelFont] = await Promise.all([
    loadGoogleFont("Newsreader:ital,opsz,wght@1,72,400", name),
    loadGoogleFont(cjkFamily, MOTTO.join("") + caption),
    loadGoogleFont("Inter:wght@500", "PERSONAL SITE zzeong.com"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#fafafa",
          color: "#171717",
        }}
      >
        {/* 바닥 웜 글로우 — 사이트 랜딩의 오렌지 라디얼을 그대로 옮김.
            satori는 blur 필터를 지원하지 않아서, 그라디언트 정지점을 넓게 잡아 부드럽게. */}
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: 200,
            width: 800,
            height: 460,
            display: "flex",
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(255,138,76,0.42) 0%, rgba(255,138,76,0.16) 38%, rgba(255,138,76,0) 70%)",
          }}
        />

        {/* 이름 + PERSONAL SITE */}
        <div
          style={{
            fontFamily: "Newsreader",
            fontStyle: "italic",
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: "Inter",
            fontSize: 22,
            letterSpacing: "0.3em",
            color: "#6b7280",
          }}
        >
          PERSONAL SITE
        </div>

        {/* 한자 좌우명 + 짧은 구분선 + 캡션 */}
        <div
          style={{
            marginTop: 72,
            display: "flex",
            gap: 30,
            fontFamily: "CJK",
            fontSize: 44,
            color: "rgba(23,23,23,0.75)",
          }}
        >
          {MOTTO.map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div
          style={{
            marginTop: 26,
            width: 40,
            height: 1,
            background: "rgba(23,23,23,0.2)",
          }}
        />
        <div
          style={{
            marginTop: 20,
            fontFamily: "CJK",
            fontSize: 22,
            letterSpacing: "0.12em",
            color: "#6b7280",
          }}
        >
          {caption}
        </div>

        {/* 우하단 도메인 — 미리보기에서 어디 링크인지 알 수 있게 작게. */}
        <div
          style={{
            position: "absolute",
            right: 56,
            bottom: 44,
            fontFamily: "Inter",
            fontSize: 20,
            letterSpacing: "0.08em",
            color: "#9ca3af",
          }}
        >
          zzeong.com
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Newsreader", data: nameFont, style: "italic", weight: 400 },
        { name: "CJK", data: cjkFont, style: "normal", weight: 500 },
        { name: "Inter", data: labelFont, style: "normal", weight: 500 },
      ],
    },
  );
}
