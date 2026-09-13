import Link from "next/link";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  { title: "retail-scheduling", status: "In progress" },
];

export default function LabPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <nav className="px-6 py-6">
        <div className="liquid-glass rounded-full max-w-2xl mx-auto px-6 py-3 flex items-center justify-between">
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
          <Link
            href="/"
            className="text-white/60 hover:text-white text-xs transition-colors"
          >
            ← back to the site
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center px-6 py-12 gap-10 max-w-md mx-auto text-center">
        <div>
          <h1
            className="text-4xl italic"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            /lab
          </h1>
          <p className="text-white/80 text-sm leading-relaxed mt-4">
            I build things here for clients I&apos;m genuinely excited to work
            with, before any of it becomes a formal project.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              status={project.status}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
