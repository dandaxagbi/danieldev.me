import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="bg-black pt-32 md:pt-44 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          About Me
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
        >
          Fourteen years turning{' '}
          <span
            className="italic text-white/60"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            strategy
          </span>{' '}
          into shipped products
          <br className="hidden md:block" />
          for teams that{' '}
          <span
            className="italic text-white/60"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            build, launch, and grow.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-5 mt-8 max-w-2xl"
        >
          <img
            src="profile-photo.png"
            alt="Daniel Aguilar Bishop"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover shrink-0"
          />
          <p className="text-white/70 text-lg md:text-xl">
            I&apos;m Daniel Aguilar Bishop, AI/Prompt Engineer, Front-End
            Developer, and Senior Digital Marketer based in Cochabamba,
            Bolivia.
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/50 text-sm md:text-base mt-6 max-w-2xl"
        >
          I&apos;ve also written a book on medical marketing, El Médico
          Visible, and spoken internationally on healthcare technology at
          FISODERMA 2.0 in Asunción, Paraguay.
        </motion.p>
      </div>
    </section>
  )
}
