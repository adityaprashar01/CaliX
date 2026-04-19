import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Be_Vietnam_Pro } from "next/font/google";
import { ResetDemoButton } from "@/components/kid/BottomNav";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "CaliX — Build Your Base",
  description:
    "CaliX is a polished mobile-first calisthenics demo for kids and parents, with real-time AI encouragement and a calm parent dashboard.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10131f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} ${beVietnam.variable} min-h-screen bg-[var(--calix-bg)] antialiased`}>
        <ResetDemoButton />
        {children}
      </body>
    </html>
  );
}
