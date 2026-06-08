import type { Metadata } from "next";
import { ArcoProvider } from "@/components/providers/ArcoProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "撒砂系统 · 系统中台",
  description: "D项目撒砂系统 V2 系统中台 Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full">
        <ArcoProvider>{children}</ArcoProvider>
      </body>
    </html>
  );
}
