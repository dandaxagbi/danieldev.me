import Link from 'next/link'
import { Linkedin, Mail, MessageCircle } from 'lucide-react'

const CONTACT_EMAIL = 'danielaguilarbishop@gmail.com'
const WHATSAPP_NUMBER = '15716649245'
const LINKEDIN_URL = 'https://www.linkedin.com/in/daniel-aguilar-bishop/'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black px-6 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="w-full h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm order-2 md:order-1">
            © {year} Daniel Aguilar Bishop. Cochabamba, Bolivia.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 order-1 md:order-2">
            <a
              href="#about"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Work
            </a>
            <a
              href="#education"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Education
            </a>
            <a
              href="#contact"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Contact
            </a>
            <Link
              href="/lab"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Lab
            </Link>
          </div>

          <div className="flex items-center gap-3 order-3">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email"
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <Mail size={16} />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/5 transition-all"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
