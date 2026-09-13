import type { Metadata } from "next";
import Link from "next/link";
import GateForm from "./GateForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/profile-photo.png"
        alt="Daniel Aguilar Bishop"
        className="w-14 h-14 rounded-full object-cover"
      />

      <div className="max-w-sm">
        <p className="text-white text-lg font-semibold">
          Daniel Aguilar Bishop
        </p>
        <h1
          className="text-2xl italic mt-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          This is my lab.
        </h1>
        <p className="text-white/70 text-sm leading-relaxed mt-4">
          A private space where I prototype ideas — marketing, product,
          front-end — for clients I&apos;m genuinely excited to work with,
          before any of it becomes a formal pitch. If you have login details,
          I have something to show you.
        </p>
      </div>

      <GateForm from={from ?? "/lab"} />

      <Link
        href="/"
        className="text-white/40 hover:text-white/70 text-xs transition-colors"
      >
        ← back to danieldev.me
      </Link>
    </main>
  );
}
