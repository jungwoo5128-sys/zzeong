# Claude Code 시작 프롬프트

아래 내용을 프로젝트 루트에서 Claude Code에 그대로 붙여넣으세요.

---

퍼스널 브랜드 웹사이트 "zzeong"을 새로 만든다. 나는 이미 Next.js/TS/Tailwind/Vercel에 익숙하니 설명은 최소화하고 바로 구축해줘.

## 목표
사이트명/브랜드명은 **zzeong** (내가 여러 채널에서 쓰는 핸들). "제품을 만드는 사람"으로서의 나(빌더 + 창업동아리 대표 + 블로거 + 일본 관련 활동)를 하나의 서사로 보여주는 사이트. 단순 포트폴리오가 아니라 퍼스널 브랜드.

- 브랜드명 zzeong은 로고/네비/메타데이터(사이트 title, OG)에 일관되게 사용.
- 핸들만으로는 정체성이 안 드러나므로 Hero 카피가 "관찰해서 만드는 사람"을 설명하는 역할을 한다.

## 스택 (확정)
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- MDX (콘텐츠 파일 기반, DB 없음)
- Vercel 배포, 전면 SSG
- 콘텐츠는 `content/` 디렉토리에 파일로 관리
  - `content/projects/*.mdx`
  - `content/posts/*.mdx`
- 각 MDX frontmatter에 `lang` 필드를 미리 넣어둔다 (지금은 'ko'만 쓰되, 나중에 i18n 붙이기 쉽게)

## 페이지 구조
1. `/` — Hero + About. 상단에 브랜드명 "zzeong", 그 아래 "관찰한 실제 페인포인트를 제품으로 만드는 사람"이라는 정체성을 한 문장 카피로. 아래에 간단한 소개 문단.
2. `/projects` — projects MDX 목록. 카드 그리드. 각 프로젝트 상세는 `/projects/[slug]`.
3. `/writing` — posts MDX 목록(최신순). 상세는 `/writing/[slug]`. 네이버 블로그는 외부 링크로 별도 연결.
4. `/now` — 지금 하고 있는 것(동아리, 교환학생 준비, 진행 중 프로젝트). 단일 MDX 또는 간단한 페이지.

공통: 상단 네비게이션(좌측 로고 "zzeong"), 하단 푸터(GitHub / 네이버 블로그 / 이메일 링크). `app/layout.tsx` metadata의 title/description/OG에 zzeong 브랜드 반영.

## 콘텐츠 스키마
projects frontmatter:
```
title, slug, lang, summary, role, stack (string[]), period, links (name+url[]), featured (boolean)
```
posts frontmatter:
```
title, slug, lang, date, summary, tags (string[])
```

## 요구사항
- frontmatter 파싱은 gray-matter, MDX 렌더는 next-mdx-remote 또는 @next/mdx 중 App Router SSG에 맞는 방식으로.
- 콘텐츠 로딩 유틸을 `lib/content.ts`로 분리 (getProjects, getProject, getPosts, getPost).
- 타입은 `types/content.ts`에 정의.
- 반응형. 모바일 우선.
- 디자인은 지금은 미니멀·정갈하게. 나중에 다듬을 거니 과하게 꾸미지 말고 구조와 타이포 위주.

## 진행 방식
1. 먼저 프로젝트 구조(디렉토리 트리)와 설치할 패키지를 제안하고 확인받은 뒤 진행.
2. 스캐폴딩 → 콘텐츠 유틸 → 페이지 순으로.
3. 각 프로젝트/글은 샘플 1개씩만 더미로 넣어둔다. 실제 콘텐츠는 내가 채운다.
4. `npm run build`가 통과하는 상태로 마무리.
