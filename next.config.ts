import type { NextConfig } from "next";

// Next 15 App Router 기본 설정.
// outputFileTracingRoot: 로컬에서 상위 폴더의 lockfile 때문에 뜨는 워크스페이스 경고를
// 잡으려고 __dirname으로 지정했었으나, TS config 로더 컨텍스트에 따라
// Vercel 빌드에서 undefined가 되어 실패하는 케이스가 있어 제거.
// (Vercel은 리포 루트를 클론해서 빌드하므로 그 경고 자체가 안 남.)
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
