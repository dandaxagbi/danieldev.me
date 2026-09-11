import { useEffect, useRef } from 'react'
import { Linkedin, Mail, MessageCircle } from 'lucide-react'

const HERO_VIDEO_URL = 'videos/hero.mp4'

const CONTACT_EMAIL = 'danielaguilarbishop@gmail.com'
const WHATSAPP_NUMBER = '15716649245'
const LINKEDIN_URL = 'https://www.linkedin.com/in/daniel-aguilar-bishop/'
const CV_FILE_URL = 'CV-Daniel-Aguilar-Bishop.pdf'

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
  // CloudFront serves this file without a "faststart" moov atom, so while it's
  // still downloading, Chrome can briefly report a much shorter `duration`
  // than the real one. Track the largest duration we've observed and ignore
  // any smaller/unstable reading, otherwise the "near the end" check below
  // fires too early and repeatedly, looking like the video is looping every
  // 1-2 seconds during the initial load.
  const maxDurationRef = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.style.opacity = '0'
    maxDurationRef.current = 0

    const handleCanPlay = () => {
      video.play().catch(() => {})
      animateOpacity(video, 0, 1, 500)
    }

    const MIN_RELIABLE_DURATION = 2 // seconds

    const handleTimeUpdate = () => {
      const reported = video.duration
      if (!reported || Number.isNaN(reported) || !Number.isFinite(reported)) {
        return
      }
      if (reported > maxDurationRef.current) {
        maxDurationRef.current = reported
      }
      const duration = maxDurationRef.current
      if (duration < MIN_RELIABLE_DURATION) return

      const remaining = duration - video.currentTime
      if (remaining <= 0.55 && remaining >= 0 && !isFadingOutRef.current) {
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
        // @ts-expect-error fetchPriority is valid HTML but missing from React's video element types
        fetchpriority="high"
        style={{ opacity: 0 }}
      />

      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="profile-photo.png"
              alt="Daniel Aguilar Bishop"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-lg ml-2">
              Daniel Aguilar Bishop
            </span>
            <div className="hidden md:flex items-center gap-8 ml-8">
              <a
                href="#about"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Work
              </a>
              <a
                href="#education"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Education
              </a>
              <a
                href="#contact"
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm font-medium hidden sm:inline hover:text-white/80 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={CV_FILE_URL}
              target="_blank"
              rel="noreferrer"
              download
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Download CV
            </a>
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

        <p className="text-white text-sm leading-relaxed px-4 max-w-xl">
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
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
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
