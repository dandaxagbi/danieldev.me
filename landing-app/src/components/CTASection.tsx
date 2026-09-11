import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Download, Mail, MessageCircle } from 'lucide-react'

const CONTACT_EMAIL = 'danielaguilarbishop@gmail.com'
const WHATSAPP_NUMBER = '15716649245'
const CV_FILE_URL = 'CV-Daniel-Aguilar-Bishop.pdf'
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_URL}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_65%)]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl text-white tracking-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Let&apos;s work <em className="italic">together</em>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/60 text-base md:text-lg mb-12 max-w-xl mx-auto"
        >
          Open to new roles and projects in front-end development, AI
          tooling, and digital marketing strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={CV_FILE_URL}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full pl-6 pr-7 py-3 flex items-center gap-2.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Download size={18} />
            Download CV
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="liquid-glass rounded-full pl-6 pr-7 py-3 flex items-center gap-2.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Mail size={18} />
            Send an email
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="liquid-glass rounded-full pl-6 pr-7 py-3 flex items-center gap-2.5 text-white text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <MessageCircle size={18} />
            Message on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
