import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Golden Face Ratio — measure your facial proportions",
  description:
    "A free, private browser tool that detects 468 facial landmarks and measures ten facial proportions against the golden ratio. Runs entirely on your device.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
