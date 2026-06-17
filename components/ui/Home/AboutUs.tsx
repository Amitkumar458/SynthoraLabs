"use client";

import { useState, useEffect, useRef } from "react";
import {
  Building2,
  ShieldCheck,
  Server,
  Cloud,
  Bot,
  Cpu,
  Sparkles,
  Brain,
  Zap,
} from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutUs() {
  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: missionRef, inView: missionInView } = useInView();
  const { ref: agentsRef, inView: agentsInView } = useInView();

  return (
    <section id="about" className="relative isolate overflow-hidden w-full py-0 px-4 sm:px-6 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.04),transparent_24%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.11),transparent_28%),linear-gradient(180deg,rgba(247,248,255,0.98),rgba(237,242,255,0.95),rgba(245,251,255,0.98))]" />
        <div className="absolute -top-8 left-6 h-36 w-36 rounded-full bg-indigo-200/70 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-4 left-1/3 h-32 w-32 rounded-full bg-emerald-100/65 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div
          ref={heroRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-10 transition-all duration-700 ease-out ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-4">
              <Building2 size={20} />
              About synthoralabs
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              A founder-led Agentic AI lab building{" "}
              <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">private intelligence</span>{" "}
              for the enterprise
            </h2>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              We specialize in architecting custom AI applications tailored precisely to your organization — intelligent agents designed to automate complex workflows with data sovereignty and privacy at their core.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 shadow-xs">
                <ShieldCheck size={16} /> Data sovereign
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 shadow-xs">
                <Server size={16} /> On-premise ready
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 shadow-xs">
                <Cloud size={16} /> Any cloud
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 shadow-xs">
                <Bot size={16} /> Agentic AI
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] border border-gray-200 shadow-sm group">
            <img
              src="/images/aboutus.png"
              alt="Neural Network Concept"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/800x600/1a103a/a78bfa?text=About+Us+Hero+Image";
              }}
            />

            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-right">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-xs text-white/70">Docs indexed</div>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center gap-2.5">
              <Cpu className="text-indigo-400" size={20} />
              <span className="text-sm font-medium text-white">Local AI · Zero cloud</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* ── MISSION ── */}
        <div
          ref={missionRef}
          className={`relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 sm:p-10 shadow-sm transition-all duration-700 ease-out ${missionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-600 to-cyan-500" />
          <div className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-3">Our mission</div>
          <div className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed mb-4 italic">
            "To make sovereign, private AI accessible to every enterprise — platform-agnostic, infrastructure-flexible, and built to multiply your output without expanding headcount."
          </div>
          <div className="text-md text-gray-600">
            Our agents run on your hardware, your cloud, or your data center. Your data never leaves your perimeter.
          </div>
        </div>

        {/* ── WHAT ARE AI AGENTS ── */}
        <div
          ref={agentsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-10 transition-all duration-700 ease-out ${agentsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <div className="relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] border border-gray-200 shadow-sm group">
            {/* Using dummy image as requested, user will place image in public/image */}
            <img
              src="/images/aboutsecond.png"
              alt="Neural Network Concept"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/800x600/1a103a/a78bfa?text=About+Us+Hero+Image";
              }}
            />
          </div>

          <div className="order-1 lg:order-2 flex flex-col">
            <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest text-indigo-600 uppercase mb-6">
              <Sparkles size={20} />
              What are AI agents?
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-900 mb-4">
              A <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">superpower</span> for your workforce — not a replacement
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-4">
              AI Agents are not a replacement for your people. You still need your brilliant business analysts and Chartered Accountants — but now you can equip them with tools that exponentially increase their efficiency.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              Tasks that previously took weeks — reconciling accounts, gathering research, querying databases — are synthesized in hours. Every department gets the exact data and insights they need, instantly.
            </p>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 textmd font-semibold">
                <Zap size={20} />
                Humans × AI = exponential output
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
