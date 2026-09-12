import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Aguilar Bishop | AI/Prompt Engineer, Front-End Developer & Senior Digital Marketer",
  description:
    "Daniel Aguilar Bishop: AI/Prompt Engineer, Front-End Developer, and Senior Digital Marketer with 14+ years turning strategy into shipped products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
