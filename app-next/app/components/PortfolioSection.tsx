"use client";

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    tag: 'Development',
    title: 'AIM Internet Marketing',
    description:
      'Independently designed and built a new multilingual (DE/EN/ES) marketing website from scratch, spanning 40+ service and case-study pages, with a secure client reporting portal, AI-powered chat widget, and automated QA testing. I also run the technical SEO/GEO audits and structured-data (JSON-LD/Schema.org) work for AIM\'s clients.',
    href: 'https://aimnewwebsite.vercel.app/',
    image: '/projects/aim-website.jpg',
    stats: ['Next.js · React · TypeScript', '40+ pages', 'DE / EN / ES'],
    gradient: 'from-indigo-500/30 via-black to-black',
  },
  {
    tag: 'Founder',
    title: 'Bizlytics',
    description:
      'My own venture, founded January 2026: an AI-driven WhatsApp chatbot with multi-LLM lead qualification, a CRM with real-time lead capture and Kanban pipelines, an e-learning platform (Bizlytics Academy), and vertical SaaS products for Latin American businesses, from an audio-transcription tool to a school management system.',
    href: 'https://www.bizlyticsgrowth.com',
    image: '/projects/bizlytics.jpg',
    stats: ['WhatsApp AI Chatbot', 'CRM', 'Bizlytics Academy'],
    gradient: 'from-emerald-500/30 via-black to-black',
  },
  {
    tag: 'Author',
    title: 'El Médico Visible',
    description:
      'A 20-chapter, 90-day system guiding medical practices toward ethical online visibility, covering SEO and GEO (optimization for AI answer engines like ChatGPT, Gemini, and Perplexity) for medical marketing.',
    href: 'https://elmedicovisible.com',
    image: '/projects/el-medico-visible.jpg',
    stats: ['20 chapters', '90-day system', 'SEO & GEO'],
    gradient: 'from-amber-500/30 via-black to-black',
  },
  {
    tag: 'Speaker',
    title: 'FISODERMA 2.0',
    description:
      'International speaker in Asunción, Paraguay, on business intelligence and digital transformation for medical practices.',
    href: null,
    image: '/projects/fisoderma.jpg',
    stats: ['Asunción, Paraguay', 'August 2026'],
    gradient: 'from-rose-500/30 via-black to-black',
  },
]

export default function PortfolioSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section
      id="portfolio"
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
            Selected work
          </h2>
          <span className="text-white/40 text-sm hidden md:inline">
            Portfolio
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.12} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  tag,
  title,
  description,
  href,
  image,
  stats,
  gradient,
  delay,
}: {
  tag: string
  title: string
  description: string
  href: string | null
  image: string | null
  stats: string[] | null
  gradient: string
  delay: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const Wrapper = href ? 'a' : 'div'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="h-full"
    >
      <Wrapper
        {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
        className="liquid-glass rounded-3xl overflow-hidden group flex flex-col h-full"
      >
        <div
          className={`aspect-[21/9] relative overflow-hidden shrink-0 ${
            image ? '' : `bg-gradient-to-br ${gradient}`
          } flex items-end p-6 md:p-8`}
        >
          {image && (
            <>
              <img
                src={image}
                alt={`${title} website screenshot`}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            </>
          )}
          <h3
            className="relative text-white/90 text-3xl md:text-4xl tracking-tight transition-transform duration-500 group-hover:-translate-y-1"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {title}
          </h3>
        </div>

        <div className="p-6 md:p-8 pt-5 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-4">
            <span className="uppercase tracking-widest text-white/40 text-xs">
              {tag}
            </span>
            {href && (
              <div className="liquid-glass rounded-full p-2">
                <ArrowUpRight size={16} className="text-white" />
              </div>
            )}
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {description}
          </p>
          {stats && (
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {stats.map((stat) => (
                <span
                  key={stat}
                  className="liquid-glass rounded-full px-3 py-1 text-white/70 text-xs"
                >
                  {stat}
                </span>
              ))}
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  )
}