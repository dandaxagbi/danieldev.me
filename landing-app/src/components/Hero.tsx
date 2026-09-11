import { useEffect, useRef } from 'react'
import { ArrowRight, Globe, Linkedin, Mail, MessageCircle } from 'lucide-react'

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4'

const CONTACT_EMAIL = 'danielaguilarbishop@gmail.com'
const WHATSAPP_NUMBER = '15716649245'

function animateOpacity(
  video: HTMLVideoElement,
  from: number,
  to: number,
  duration: number,
) {
  const start = performance.now()

  const step = (now: number) => {
    const elapsed = now - start
    const t = Math.min(elapsed / duration, 1)
    video.style.opacity = String(from + (to - from) * t)
    if (t < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isFadingOutRef = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'

    const handleCanPlay = () => {
      video.play().catch(() => {})
      animateOpacity(video, 0, 1, 500)
    }

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return
      const remaining = video.duration - video.currentTime
      if (remaining <= 0.55 && !isFadingOutRef.current) {
        isFadingOutRef.current = true
        const currentOpacity = parseFloat(video.style.opacity || '1')
        animateOpacity(video, currentOpacity, 0, 500)
      }
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      window.setTimeout(() => {
        video.currentTime = 0
        video.play().catch(() => {})
        isFadingOutRef.current = false
        animateOpacity(video, 0, 1, 500)
      }, 100)
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        src={HERO_VIDEO_URL}
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Globe size={24} className="text-white" />
            <span className="text-white font-semibold text-lg ml-2">
              Daniel Aguilar Bishop
            </span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <a
                href="#services"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-medium hidden sm:inline">
              LinkedIn
            </span>
            <button
              type="button"
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Download CV
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Strategy meets <em className="italic">code</em>.
        </h1>

        <a href={`mailto:${CONTACT_EMAIL}`} className="max-w-xl w-full">
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              readOnly
              className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 cursor-pointer"
            />
            <div className="bg-white rounded-full p-3 text-black">
              <ArrowRight size={20} />
            </div>
          </div>
        </a>

        <p className="text-white text-sm leading-relaxed px-4 mt-6 max-w-xl">
          Front-end development, AI-driven marketing, and 14+ years turning
          strategy into results.
        </p>

        <a
          href="#services"
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-8"
        >
          See my experience
        </a>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="#"
          aria-label="LinkedIn"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Linkedin size={20} />
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          aria-label="Email"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <Mail size={20} />
        </a>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
        >
          <MessageCircle size={20} />
        </a>
      </div>
    </div>
  )
}
