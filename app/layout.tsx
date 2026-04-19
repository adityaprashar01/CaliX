import type { Metadata, Viewport } from "next";
import { ResetDemoButton } from "@/components/kid/BottomNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "CaliX — Build Your Base",
  description:
    "CaliX is a polished mobile-first calisthenics demo for kids and parents, with real-time AI encouragement and a calm parent dashboard.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3B5BFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--calix-bg)] antialiased">
        <ResetDemoButton />
        {children}
      </body>
    </html>
  );
}
