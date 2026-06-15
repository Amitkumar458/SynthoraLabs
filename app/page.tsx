import FAQSection from '@/components/ui/Home/FAQSection'
import Hero from '@/components/ui/Home/Hero'
import WhatWeDo from '@/components/ui/Home/WhatWeDo'
import CopyRight from '@/components/ui/shared/CopyRight'
import Navbar from '@/components/ui/shared/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7f8ff_0%,#edf2ff_45%,#f5fbff_100%)]">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <FAQSection />
      <CopyRight />
    </main>
  )
}
