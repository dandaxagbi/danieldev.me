import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { logout } from "../actions";

const CONTACT_EMAIL = "danielaguilarbishop@gmail.com";
const WHATSAPP_NUMBER = "15716649245";
const CV_FILE_URL = "/CV-Daniel-Aguilar-Bishop.pdf";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "about", label: "What is TWS" },
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

function ContactCTA() {
  return (
    <div className="liquid-glass rounded-2xl px-5 py-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/profile-photo.png"
          alt="Daniel Aguilar Bishop"
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <p className="text-white font-medium text-sm">
            Daniel Aguilar Bishop
          </p>
          <p className="text-white/50 text-xs mt-0.5">
            Happy to talk this through, Mark.
          </p>
        </div>
      </div>

      <a
        href={CV_FILE_URL}
        target="_blank"
        rel="noreferrer"
        className="liquid-glass rounded-full px-4 py-2 text-white text-xs font-medium text-center hover:bg-white/5 transition-colors"
      >
        Download CV
      </a>

      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
        >
          <Mail size={14} />
          {CONTACT_EMAIL}
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-white/60 hover:text-white text-xs transition-colors"
        >
          <MessageCircle size={14} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function RetailSchedulingHub() {
  return (
    <main className="min-h-screen pb-20">
      {/* HEADER */}
      <nav className="px-6 py-6">
        <div className="liquid-glass rounded-full max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/profile-photo.png"
              alt="Daniel Aguilar Bishop"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-sm">
              Daniel Aguilar Bishop
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-white/60 hover:text-white text-xs transition-colors"
            >
              ← danieldev.me
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="text-white/60 hover:text-white text-xs transition-colors"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-4 pb-12 border-b border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <span>Lab</span>
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
          <section id="about" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              What is TWS
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              TimeWellScheduled is workforce management software for teams
              that work in shifts — scheduling, time &amp; attendance, and
              payroll integration in one place, built mostly for retail,
              restaurants, hospitality, and long-term care. There&apos;s a
              lot of ground we could cover together. This hub is one
              possible starting point: creative advertising campaigns built
              around what TWS actually looks like, not stock photography.
            </p>
          </section>

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

          {/* Mobile-only: the desktop sidebar is hidden below md, so the
              contact CTA moves here instead of disappearing entirely. */}
          <div className="md:hidden">
            <ContactCTA />
          </div>
        </div>

        <aside className="hidden md:block">
          <div className="flex flex-col gap-4 sticky top-8">
            <div className="liquid-glass rounded-2xl overflow-hidden">
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

            <ContactCTA />
          </div>
        </aside>
      </div>
    </main>
  );
}
