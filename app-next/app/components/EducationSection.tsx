"use client";

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { VelocityScroll } from './VelocityScroll'

const CV_FILE_URL = '/CV-Daniel-Aguilar-Bishop.pdf'

const ALL_COURSES =
  'Introduction to AI • English Course to Work with AI Tools • ChatGPT Course • Creating web pages with ChatGPT • ChatGPT With Google Sheets • Prompt Engineering Course • AI for Content Marketing • AI for SEO • AI for Customer Service • AI for Finance • AI for Human Resources Management • Image Generation with AI • Video Generation with AI • Claude AI Course • Claude Code Course • Gemini Course • Claude Fable 5 Course • React.js Course • React.js Course: Professional State Management • React.js Course: Render and Composition Patterns • TypeScript Fundamentals Course • TypeScript Course: Object-Oriented Programming and Asynchronism • TypeScript Course: Advanced Types and Functions • Responsive Design Course: Mobile First • JavaScript Fundamentals Course • JavaScript Course: DOM Manipulation • AEO/GEO Course for Organic Search • Google Search Console Fundamentals for SEO • SEO Fundamentals Course: Search Engine Positioning • SEO Best Practices Course • SEO Consulting: Building and Selling SEO Services • Definitive HTML and CSS Course • Practical HTML and CSS Course • Tailwind CSS 1 Course • Tailwind CSS 2 Course • Professional Scrum Course • Software Testing Fundamentals Course • Introduction to Test Automation Course • NPM Course • Logical Thinking: Algorithms and Flowcharts • Logical Thinking: Data Handling, Structures, and Functions • Jira Fundamentals Badge • Meta Ads • Outbrain Native Advertising Strategy Expert • Outbrain Native Performance Expert • Native Advertising: Reach more customer with Taboola • Google Ads Search Advertising Certification • Google Ads Search Certification • Google Ads Fundamentals • Notion • Team Management and Productivity with Notion • Course to create your virtual office with Notion • Wild Sales 2.0 • Sales with WhatsApp • WhatsApp Business • Storytelling Course • Personal Branding Course • Professional Public Speaking Course • Assertive Communication Course • Consumer Psychology Course'

export default function EducationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="education"
      ref={ref}
      className="bg-black py-28 md:py-40 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          Education
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl text-white leading-[1.1] tracking-tight mb-10 md:mb-14"
        >
          Always{' '}
          <span
            className="italic text-white/60"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            learning
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/60 text-base md:text-lg leading-relaxed mb-10 md:mb-14 max-w-2xl"
        >
          I hold a degree in Communications &amp; Journalism from Aquino
          University, Bolivia (2005–2010), and I&apos;ve since completed
          60+ courses and certifications across AI &amp; prompt
          engineering, front-end development, digital marketing
          platforms, sales, and communication, scrolling below.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="border-y border-white/10 py-6 md:py-8 space-y-4 md:space-y-5 mb-10 md:mb-14"
      >
        <VelocityScroll
          text={ALL_COURSES}
          default_velocity={0.15}
          className="text-white/60 text-xl md:text-3xl tracking-tight px-4"
        />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.a
          href={CV_FILE_URL}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/50 text-sm hover:text-white transition-colors underline underline-offset-4"
        >
          Full list of certifications in my CV →
        </motion.a>
      </div>
    </section>
  )
}