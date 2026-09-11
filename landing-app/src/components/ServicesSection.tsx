import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const CARDS = [
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    tag: 'Marketing & SEO/GEO',
    title: 'Strategy & Visibility',
    description:
      'Technical SEO/GEO audits, structured data (JSON-LD/Schema.org), and Google and Meta Ads campaigns, built from 14+ years at AIM Internet Marketing, HCMedic, and my own agency, Adwise Online Marketing. Recent work includes shipping a 398-instance JSON-LD architecture with zero validation errors, auditing 2,491 URLs for a public-sector client, and running AI-visibility baselines across Google, Perplexity, and ChatGPT.',
    stats: ['SEO/GEO Audits', 'Structured Data (JSON-LD)', 'Google & Meta Ads'],
  },
  {
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    tag: 'Development',
    title: 'Front-End & AI Tooling',
    description:
      'I ship real products end to end: the new AIM Internet Marketing site (40+ pages, multilingual), and Bizlytics, my own venture, including a WhatsApp chatbot with multi-LLM lead qualification, a CRM, and an e-learning platform. AI-assisted development with Claude Code lets me build and QA faster without cutting corners.',
    stats: ['React · Next.js · TypeScript', 'Claude Code', 'Multi-LLM Products'],
  },
]

export default function ServicesSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="services"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight">
            What I do
          </h2>
          <span className="text-white/40 text-sm hidden md:inline">
            My services
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CARDS.map((card, index) => (
            <ServiceCard key={card.title} {...card} delay={index * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  video,
  tag,
  title,
  description,
  stats,
  delay,
}: {
  video: string
  tag: string
  title: string
  description: string
  stats: string[]
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      <a
        href="#portfolio"
        className="liquid-glass rounded-3xl overflow-hidden group block"
      >
        <div className="aspect-video relative overflow-hidden">
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src={video}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <span className="uppercase tracking-widest text-white/40 text-xs">
              {tag}
            </span>
            <div className="liquid-glass rounded-full p-2">
              <ArrowUpRight size={16} className="text-white" />
            </div>
          </div>
          <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight">
            {title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {stats.map((stat) => (
              <span
                key={stat}
                className="liquid-glass rounded-full px-3 py-1 text-white/70 text-xs"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  )
}
