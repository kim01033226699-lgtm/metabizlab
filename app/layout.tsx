import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "META BIZLAB - 당신의 비즈니스에 전략을 더하다",
  description: "금융 자문, 리스크 관리, 세무 전략, 중소기업 컨설팅 - META BIZLAB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
