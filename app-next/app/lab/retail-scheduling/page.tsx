import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "video", label: "Concept video" },
  { id: "images", label: "Campaign images" },
  { id: "next", label: "What's next" },
];

const IMAGE_CONCEPTS = [
  {
    title: "End of WhatsApp chaos",
    copy: "Stop chasing availability over WhatsApp.",
  },
  {
    title: "Full floor visibility",
    copy: "You know who's working right now. Always.",
  },
  {
    title: "Payroll without surprises",
    copy: "Payroll errors that stop being your problem.",
  },
];

export default function RetailSchedulingHub() {
  return (
    <main className="min-h-screen pb-20">
      {/* HERO */}
      <section className="px-6 pt-16 pb-12 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/lab" className="hover:text-white/70 transition-colors">
              Lab
            </Link>
            <span>›</span>
            <span className="text-white/60">retail-scheduling</span>
          </div>

          <h1
            className="text-4xl md:text-5xl italic mb-4"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Welcome, Mark.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-xl">
            A first pass at a retail-focused campaign concept for
            TimeWellScheduled — real product screens instead of generic
            mockups, built around what actually shows up on the floor:
            scheduling chaos, staff visibility, and payroll accuracy.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="max-w-5xl mx-auto px-6 pt-12 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12">
        <div className="flex flex-col gap-16">
          <section id="video" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Concept video
            </h2>
            <div className="liquid-glass rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-white/40 text-sm">
                Video in production — coming soon.
              </p>
            </div>
          </section>

          <section id="images" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Campaign images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {IMAGE_CONCEPTS.map((concept) => (
                <div
                  key={concept.title}
                  className="liquid-glass rounded-2xl overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/5] flex items-center justify-center border-b border-white/10">
                    <p className="text-white/30 text-xs px-4 text-center">
                      Coming soon
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-white text-sm font-medium">
                      {concept.title}
                    </p>
                    <p className="text-white/50 text-xs mt-1 leading-relaxed">
                      {concept.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="next" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              What&apos;s next
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              This is just a first pass — I&apos;m still finishing the video
              and images. Happy to keep iterating on this if it&apos;s useful
              to you.
            </p>
          </section>
        </div>

        <aside className="hidden md:block">
          <div className="liquid-glass rounded-2xl overflow-hidden sticky top-8">
            <div className="px-5 py-4 border-b border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-widest">
                In this hub
              </p>
            </div>
            <nav className="flex flex-col">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-5 py-3 text-white/60 hover:text-white hover:bg-white/5 text-sm transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </main>
  );
}
