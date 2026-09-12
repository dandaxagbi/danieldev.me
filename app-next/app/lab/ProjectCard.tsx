type ProjectCardProps = {
  title: string;
  status: string;
  href?: string;
};

export default function ProjectCard({ title, status, href }: ProjectCardProps) {
  const content = (
    <div className="liquid-glass rounded-2xl px-6 py-5 w-full text-left">
      <p className="text-white font-medium">{title}</p>
      <p className="text-white/50 text-xs uppercase tracking-wide mt-1">
        {status}
      </p>
    </div>
  );

  if (!href) {
    return <div className="cursor-default opacity-90">{content}</div>;
  }

  return (
    <a href={href} className="block hover:bg-white/5 transition-colors rounded-2xl">
      {content}
    </a>
  );
}
