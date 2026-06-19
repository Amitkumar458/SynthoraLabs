'use client'

import Link from 'next/link'

import { useEffect, useRef, useState } from 'react'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../common/button'

const navLinks = [
  { label: 'Home', href: '#home' },

  { label: 'About', href: '#about' },

  { label: 'Services', href: '#services' },

  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollRef = useRef(0)
  const isOpenRef = useRef(isOpen)

  useEffect(() => {
    isOpenRef.current = isOpen
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (isOpenRef.current) return
      const current = window.scrollY
      if (current > lastScrollRef.current && current > 60) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      lastScrollRef.current = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`bg-gradient-to-br from-indigo-100/45 via-violet-100/65 to-cyan-100/15 sticky top-0 z-50 w-full lg:px-6 px-4 lg:py-4 py-2 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <nav className="flex items-center justify-between rounded-[14px] border border-indigo-800/15 bg-white/85 lg:pl-6 lg:pr-6 pl-3 pr-6 py-2 shadow-[0_1px_3px_rgba(99,102,241,0.08)] backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/Icon-PNG.png"
            alt="Synthora AI Labs logo"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
          <span className="text-md font-semibold tracking-tight text-[#1e1b4b]">
            Synthora AI Labs
          </span>
        </Link>

        {/* Desktop Nav Links */}

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[18px] font-medium text-gray-600 transition-colors duration-200 hover:text-gray-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}

        <div className="hidden items-center gap-3 md:flex">
          <Button
            onClick={() => {
              onContactClick();
            }}
            className="rounded-[9px] bg-indigo-500 px-[22px] py-2 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-indigo-600"
          >
            Get started
          </Button>
        </div>

        {/* Mobile Hamburger */}

        <button
          className="text-gray-500 transition-colors hover:text-gray-700 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}

      {isOpen && (
        <div className="mx-0 mt-2 flex flex-col gap-4 rounded-[14px] border border-indigo-500/15 bg-white/95 p-5 shadow-[0_1px_3px_rgba(99,102,241,0.08)] backdrop-blur-md md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Button
            onClick={() => {
              onContactClick();
            }}
            className="mt-1 rounded-[9px] bg-indigo-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-600"
          >
            Get started
          </Button>
        </div>
      )}
    </header>
  )
}
