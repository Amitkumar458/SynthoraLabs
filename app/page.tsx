'use client'

import { useState } from 'react'
import FAQSection from '@/components/ui/Home/FAQSection'
import Hero from '@/components/ui/Home/Hero'
import WhatWeDo from '@/components/ui/Home/WhatWeDo'
import CopyRight from '@/components/ui/shared/CopyRight'
import Navbar from '@/components/ui/shared/Navbar'
import ContactUs from '@/components/ui/shared/ContactUs'

export default function Home() {
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f8ff_0%,#edf2ff_45%,#f5fbff_100%)]">
      <Navbar />
      <Hero onContactClick={() => setIsContactUsOpen(true)} />
      <WhatWeDo onContactClick={() => setIsContactUsOpen(true)} />
      <FAQSection onContactClick={() => setIsContactUsOpen(true)}/>
      <CopyRight />
      <ContactUs open={isContactUsOpen} onClose={() => setIsContactUsOpen(false)} />
    </main>
  )
}
