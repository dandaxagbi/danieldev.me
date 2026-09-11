import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'

export default function PhilosophySection() {
  const headingRef = useRef(null)
  const videoRef = useRef(null)
  const textRef = useRef(null)

  const headingInView = useInView(headingRef, { once: true, margin: '-100px' })
  const videoInView = useInView(videoRef, { once: true, margin: '-100px' })
  const textInView = useInView(textRef, { once: true, margin: '-100px' })

  return (
    <section className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
        >
          Marketing{' '}
          <span
            className="italic text-white/40"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            x
          </span>{' '}
          Code
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, x: -40 }}
            animate={videoInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden aspect-[4/3]"
          >
            <video
              className="w-full h-full object-cover"
              src={VIDEO_URL}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>

          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: 40 }}
            animate={textInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="pb-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                Choose your space
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Fourteen-plus years in digital marketing, from founding and
                running Adwise Online Marketing to my current role at AIM
                Internet Marketing, have shaped how I approach strategy: SEO
                and GEO audits, structured data, Google and Meta Ads
                campaigns, and a focus on how AI-driven search is changing how
                people find and evaluate brands.
              </p>
            </div>

            <div className="w-full h-px bg-white/10" />

            <div className="pt-8">
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4">
                Shape the future
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                On the technical side, I build with React, TypeScript, and
                Next.js, and use Claude Code and MCP integrations to connect
                AI directly to tools like Google Search Console, Tag Manager,
                and GA4, turning marketing strategy into automated, working
                systems rather than static recommendations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
