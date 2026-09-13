import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { logout } from "../actions";
import { ConceptVideo } from "./ConceptVideo";
import { ImageCarousel, type CampaignSlide } from "./ImageCarousel";

const CONTACT_EMAIL = "danielaguilarbishop@gmail.com";
const WHATSAPP_NUMBER = "15716649245";
const CV_FILE_URL = "/CV-Daniel-Aguilar-Bishop.pdf";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const TOC = [
  { id: "about", label: "Why this angle" },
  { id: "video", label: "Concept video" },
  { id: "images", label: "Campaign images" },
  { id: "persona", label: "Buyer persona" },
  { id: "next", label: "What's next" },
];

const CAMPAIGN_SLIDES: CampaignSlide[] = [
  {
    id: "whatsapp-4x5",
    title: "End of WhatsApp chaos",
    copy: "Stop chasing availability over WhatsApp.",
    image: "/lab/retail-scheduling/images/image1.jpg",
    size: "1080×1350 (4:5, feed)",
    angle:
      "Survival instinct — the threat of losing control of scheduling, resolved.",
  },
  {
    id: "whatsapp-1x1",
    title: "End of WhatsApp chaos",
    copy: "Stop chasing availability over WhatsApp.",
    image: "/lab/retail-scheduling/images/image1-square.jpg",
    size: "1080×1080 (1:1, feed/grid)",
    angle:
      "Survival instinct — the threat of losing control of scheduling, resolved.",
  },
  {
    id: "visibility-4x5",
    title: "Full floor visibility",
    copy: "Know who's working right now. Always.",
    image: "/lab/retail-scheduling/images/image2.jpg",
    size: "1080×1350 (4:5, feed)",
    angle: "Status instinct — looking in control in front of leadership.",
  },
  {
    id: "visibility-1x1",
    title: "Full floor visibility",
    copy: "Know who's working right now. Always.",
    image: "/lab/retail-scheduling/images/image2-square.jpg",
    size: "1080×1080 (1:1, feed/grid)",
    angle: "Status instinct — looking in control in front of leadership.",
  },
  {
    id: "payroll-4x5",
    title: "Payroll without surprises",
    copy: "Payroll errors that stop being your problem.",
    image: "/lab/retail-scheduling/images/image3.jpg",
    size: "1080×1350 (4:5, feed)",
    angle: "Survival instinct, loss framing — what today's errors cost her.",
  },
  {
    id: "payroll-1x1",
    title: "Payroll without surprises",
    copy: "Payroll errors that stop being your problem.",
    image: "/lab/retail-scheduling/images/image3-square.jpg",
    size: "1080×1080 (1:1, feed/grid)",
    angle: "Survival instinct, loss framing — what today's errors cost her.",
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
      <section className="relative px-6 pt-4 pb-16 min-h-[420px] flex items-end border-b border-white/10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lab/retail-scheduling/images/hero-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[65%_15%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/50" />

        <div className="relative max-w-5xl mx-auto">
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
            A retail-focused campaign concept for TimeWellScheduled — built
            around the real product and the real reasons a store manager
            switches: scheduling chaos, staff visibility, and payroll
            accuracy. No stock photography, no generic mockups.
          </p>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <div className="max-w-5xl mx-auto px-6 pt-12 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-12">
        <div className="flex flex-col gap-16">
          <section id="about" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Why this angle
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              Most workforce-management ads in this category — Homebase,
              Deputy, 7shifts included — lean on generic stock photography of
              &quot;stressed manager, empty schedule board.&quot; TWS already
              has something they don&apos;t: real customers, real screens,
              real results (Canadian Tire, Party City, Lina&apos;s Italian
              Market). This concept is built entirely around that — the
              actual product, shown to the person who actually decides to buy
              it, for the reason she actually buys it.
            </p>
          </section>

          <section id="video" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Concept video
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mb-4">
              A 36-second spot built around a single turn: the tension of
              scheduling chaos, resolved the moment TWS shows up on screen.
            </p>
            <div className="liquid-glass rounded-2xl overflow-hidden">
              <ConceptVideo src="/lab/retail-scheduling/concept-video.mp4" />
            </div>
          </section>

          <section id="images" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Campaign images
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mb-4">
              Three static concepts, each isolating one of TWS&apos;s
              highest-leverage moments — sized and ready for feed placement.
            </p>
            <ImageCarousel slides={CAMPAIGN_SLIDES} />
          </section>

          <section id="persona" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              Buyer persona — the reasoning behind the campaign
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mb-6">
              Before writing a single line of copy, I mapped who actually
              decides to buy or renew TWS at a multi-store retail chain, using
              a consumer-psychology framework (evolutionary instincts,
              Kahneman &amp; Tversky&apos;s loss aversion, trust theory).
              Here&apos;s the short version.
            </p>

            <div className="flex flex-col gap-5 max-w-xl">
              <div className="liquid-glass rounded-2xl px-5 py-5">
                <p className="text-white text-sm font-medium mb-1">
                  Who she is
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  &quot;Renata&quot; — an Operations / District Manager
                  running 3–12 retail locations, 32–48 years old. She
                  doesn&apos;t own the business and didn&apos;t build the
                  software; she&apos;s the one who lives the operational pain
                  daily and pushes upward to get a tool like TWS approved or
                  renewed.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl px-5 py-5">
                <p className="text-white text-sm font-medium mb-1">
                  The instinct driving her
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  <span className="text-white/80">Survival, first</span> —
                  every miscalculated hour, uncovered shift, and payroll error
                  is a direct threat to budget, time, and her own standing.{" "}
                  <span className="text-white/80">Status, second</span> —
                  being the manager whose store &quot;never has surprises&quot;
                  in front of her peers. TWS&apos;s current messaging talks
                  about features (scheduling, punch clock, reports), not the
                  threat it actually removes.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl px-5 py-5">
                <p className="text-white text-sm font-medium mb-1">
                  What she&apos;s really buying
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Not &quot;scheduling software&quot; — <span className="text-white/80">operational peace of mind</span>{" "}
                  and a version of herself that has everything under control
                  in front of her team and her boss. Initial tension:
                  building schedules by hand, chasing availability over
                  WhatsApp at 6am, discovering payroll errors after payday.
                  Desired state: feeling in control, not exposed.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl px-5 py-5">
                <p className="text-white text-sm font-medium mb-1">
                  The loss-aversion angle
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Following Kahneman &amp; Tversky: don&apos;t frame this as
                  &quot;save X hours a week&quot; — frame it as{" "}
                  <span className="text-white/80">
                    what not having this is already costing her today
                  </span>{" "}
                  (lost hours, payroll mistakes, time spent chasing people
                  down). Loss framing lands harder than gain framing here.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl px-5 py-5">
                <p className="text-white text-sm font-medium mb-1">
                  Why the campaign stays grounded
                </p>
                <p className="text-white/60 text-xs leading-relaxed">
                  Some public app-store reviews mention friction on the
                  employee side. Rather than promise a flawless app the
                  campaign can&apos;t back up, this concept leans on the
                  flows that already land well — scheduling and real-time
                  &quot;Who&apos;s Working&quot; visibility. Keeping the
                  promise and the product in sync is what builds trust
                  (Prahalad &amp; Ramaswamy&apos;s DART model) instead of
                  eroding it.
                </p>
              </div>
            </div>
          </section>

          <section id="next" className="scroll-mt-24">
            <h2 className="text-white text-lg font-medium mb-4">
              What&apos;s next
            </h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              This is a first pass, built to test the idea rather than sell
              it — if the direction resonates, I can adapt it for other
              verticals (restaurants, hospitality, long-term care), test
              variants, or take it further toward something launch-ready.
              Tell me what you&apos;d change.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <Mail size={15} />
                Email me
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass rounded-full px-5 py-2.5 flex items-center gap-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp me
              </a>
            </div>
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
