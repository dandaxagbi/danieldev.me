import type { Metadata } from "next";
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

      <div>
        <p className="text-white text-lg font-semibold">
          Daniel Aguilar Bishop
        </p>
        <h1
          className="text-2xl italic mt-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Un espacio donde pruebo ideas.
        </h1>
      </div>

      <GateForm from={from ?? "/lab"} />
    </main>
  );
}
