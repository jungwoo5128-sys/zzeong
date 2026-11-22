import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const description =
  "관찰한 페인포인트를 프로덕트로 구현하는 사람. 최정우의 퍼스널 사이트.";

export const metadata: Metadata = {
  metadataBase: new URL("https://zzeong.com"),
  title: {
    default: "zzeong",
    template: "%s — zzeong",
  },
  description,
  openGraph: {
    title: "zzeong",
    description,
    url: "https://zzeong.com",
    siteName: "zzeong",
    type: "website",
  },
  // 큰 이미지 카드 — OG 이미지(app/opengraph-image.tsx)를 가로로 크게 노출.
  twitter: {
    card: "summary_large_image",
    title: "zzeong",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
