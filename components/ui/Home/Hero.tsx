import Link from 'next/link'
import AnimatedNetworkBackground from '@/components/ui/shared/AnimatedNetworkBackground'

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 pt-10 pb-14 text-center">
      
      {/* Glow Orbs */}
      <div className="pointer-events-none absolute -left-16 -top-20 h-[300px] w-[300px] rounded-full bg-indigo-600 opacity-[0.15] blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-[200px] w-[200px] rounded-full bg-cyan-400 opacity-[0.15] blur-[60px]" />

      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedNetworkBackground />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">

        {/* Pill Badge — fade up, delay 100ms */}
        <div className="animate-[fadeUp_0.6s_ease_0.1s_both] mb-6 flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.08] px-3.5 py-1">
          <span className="h-2 w-2 animate-[badge-pulse_1.6s_infinite] rounded-full bg-indigo-500" />
          <span className="text-[16px] font-semibold tracking-[0.08em] text-indigo-500 uppercase">
            AI Services · RAG · Automation
          </span>
        </div>

        {/* Headline — fade up, delay 300ms */}
        <h1 className="animate-[fadeUp_0.7s_ease_0.3s_both] mb-[18px] max-w-[840px] lg:text-5xl leading-[1.18] font-bold text-[#0f0d2a] md:text-[54px] text-[36px]">
          Build{' '}
          <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
            intelligent systems
          </span>{' '}
          that work for your business - Turn complex workflows into Automatic success
        </h1>
        {/* Subtext — fade up, delay 500ms */}
        <p className="animate-[fadeUp_0.7s_ease_0.5s_both] mb-8 max-w-[640px] text-[18px] leading-[1.75] text-gray-600">
          Struggling with slow data retrieval? Bottlenecked in customer support? 
          We build custom AI Agents that work 24/7 so your human team can focus on what they do best. 
        </p>

        {/* CTA Buttons — fade up, delay 700ms */}
        <div className="animate-[fadeUp_0.7s_ease_0.7s_both] flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/services"
            className="rounded-[10px] bg-indigo-500 px-6 py-3 text-md font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(99,102,241,0.35)] hover:bg-indigo-600"
          >
            Speak with us!
          </Link>
        </div>

      </div>
    </section>
  )
}