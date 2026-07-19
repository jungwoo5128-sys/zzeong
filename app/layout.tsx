import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const description =
  "관찰한 실제 페인포인트를 제품으로 만드는 사람. 빌더 · 창업동아리 · 기록.";

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
  twitter: {
    card: "summary",
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
