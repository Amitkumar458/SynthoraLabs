"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bot,
  FileSearch,
  Headphones,
  Lightbulb,
  Database,
  Brain,
  MessageSquare,
  BarChart3,
  Shield,
  Zap,
  Globe,
  FileText,
  Phone,
  Mic,
  ScanText,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "../common/button";

const tabs = [
  {
    id: "agents",
    label: "Custom AI agents",
    shortLabel: "AI agents",
    heading: "Custom AI agent development",
    description:
      "We engineer agents built precisely around your business logic — automating complex, multi-step workflows so your team spends time on strategy, not repetition.",
    accent: "from-violet-500 to-purple-600",
    accentLight: "bg-violet-50",
    accentText: "text-violet-600",
    accentBorder: "border-violet-200",
    dot: "bg-violet-500",
    items: [
      {
        icon: Database,
        title: "SQL & database agents",
        desc: "to intelligently query your internal data, surface insights, and flag anomalies in hours — not weeks",
      },
      {
        icon: Brain,
        title: "Multi-step reasoning agents",
        desc: "to plan, execute, and self-correct across complex workflows with minimal human oversight",
      },
      {
        icon: Zap,
        title: "Process automation",
        desc: "to eliminate repetitive manual tasks, reduce error rates, and accelerate throughput across every department",
      },
      {
        icon: Globe,
        title: "Platform-agnostic deployment",
        desc: "to run securely on your hardware, private cloud, AWS, Azure, Google Cloud, or VPS — your infrastructure, your control",
      },
      {
        icon: Shield,
        title: "Data sovereignty by design",
        desc: "to ensure your sensitive data never leaves your environment, with privacy and compliance baked into the architecture",
      },
      {
        icon: BarChart3,
        title: "Analytics & anomaly detection",
        desc: "to monitor live operational data, detect outliers early, and surface the signals that matter to decision-makers",
      },
    ],
  },
  {
    id: "documents",
    label: "Document intelligence",
    shortLabel: "Documents",
    heading: "Intelligent document solutions",
    description:
      "RAG-based systems that turn your document library into an instantly queryable knowledge base — across up to 50,000 files, with pinpoint accuracy.",
    accent: "from-teal-500 to-emerald-600",
    accentLight: "bg-teal-50",
    accentText: "text-teal-600",
    accentBorder: "border-teal-200",
    dot: "bg-teal-500",
    items: [
      {
        icon: FileSearch,
        title: "Instant document retrieval",
        desc: "to surface the exact clause, figure, or policy across thousands of files — in seconds, not hours",
      },
      {
        icon: ScanText,
        title: "Automated OCR & extraction",
        desc: "to convert unstructured files into structured, actionable data without manual data entry",
      },
      {
        icon: FileText,
        title: "Compliance checking",
        desc: "to automatically validate documents against regulatory standards and flag non-conformance before it becomes a liability",
      },
      {
        icon: Brain,
        title: "RAG architecture",
        desc: "to connect LLMs directly to your document base, giving every team member instant access to institutional knowledge",
      },
      {
        icon: BarChart3,
        title: "Format analysis & classification",
        desc: "to automatically categorize, tag, and route incoming documents across your organization",
      },
      {
        icon: Shield,
        title: "Secure private deployment",
        desc: "to process sensitive documents entirely within your environment — zero data exposure to external systems",
      },
    ],
  },
  {
    id: "contact",
    label: "Contact center AI",
    shortLabel: "Contact center",
    heading: "Omnichannel contact center solutions",
    description:
      "Intelligent AI layered onto your existing telephony and routing infrastructure — reducing handle times, cutting costs by up to 70%, and improving outcomes on every interaction.",
    accent: "from-blue-500 to-indigo-600",
    accentLight: "bg-blue-50",
    accentText: "text-blue-600",
    accentBorder: "border-blue-200",
    dot: "bg-blue-500",
    items: [
      {
        icon: Mic,
        title: "Real-time transcription",
        desc: "to capture every word from voice and video calls instantly — fully searchable, timestamped, and audit-ready",
      },
      {
        icon: MessageSquare,
        title: "Voice & chat AI agents",
        desc: "to handle routine queries autonomously across phone, chat, and messaging — freeing your team for complex cases",
      },
      {
        icon: TrendingUp,
        title: "Sentiment analysis",
        desc: "to detect customer emotion in real time and alert agents before a conversation escalates",
      },
      {
        icon: Brain,
        title: "Agent assist (RAG-powered)",
        desc: "to surface the right knowledge base article during a live call — so your agents always have the answer at hand",
      },
      {
        icon: Globe,
        title: "Live translation",
        desc: "to break language barriers across every customer interaction without adding headcount or delay",
      },
      {
        icon: Phone,
        title: "Call outcome classification",
        desc: "to automatically tag call results, disposition codes, and next-best-actions — eliminating after-call work",
      },
    ],
  },
  {
    id: "consulting",
    label: "AI consultation",
    shortLabel: "Consulting",
    heading: "AI consultation & strategy",
    description:
      "From auditing your existing AI stack to building a budgeted, phased adoption roadmap — we give you the strategic clarity to invest in AI with confidence, not guesswork.",
    accent: "from-amber-500 to-orange-500",
    accentLight: "bg-amber-50",
    accentText: "text-amber-600",
    accentBorder: "border-amber-200",
    dot: "bg-amber-500",
    items: [
      {
        icon: Lightbulb,
        title: "AI infrastructure audit",
        desc: "to evaluate your current tools, identify gaps, and uncover quick-win automation opportunities across your operations",
      },
      {
        icon: BarChart3,
        title: "ROI & budget planning",
        desc: "to build a clear, justified business case for AI investment — with realistic timelines and measurable payback periods",
      },
      {
        icon: TrendingUp,
        title: "Strategic AI roadmap",
        desc: "to sequence AI adoption across your organization in the right order, at the right cost, with the right partners",
      },
      {
        icon: Bot,
        title: "LLM & model selection",
        desc: "to evaluate and recommend the precise models for your use case — balancing performance, cost, and data requirements",
      },
      {
        icon: Shield,
        title: "Governance & compliance advisory",
        desc: "to ensure your AI deployments meet regulatory standards, internal policies, and enterprise security requirements",
      },
      {
        icon: Headphones,
        title: "Ongoing optimization",
        desc: "to continuously monitor, retrain, and improve deployed agents as your data and business needs evolve",
      },
    ],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function WhatWeDo() {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState(0);
  const { ref: sectionRef, inView } = useInView();

  const handleTabChange = (idx: number) => {
    if (idx === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setDisplayTab(idx);
      setActiveTab(idx);
      setAnimating(false);
    }, 220);
  };

  const tab = tabs[displayTab];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate overflow-hidden w-full bg-[linear-gradient(180deg,#f7f8ff_0%,#edf2ff_45%,#f5fbff_100%)] pt-16 pb-10 px-4 sm:px-6 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,140,248,0.14),transparent_24%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.11),transparent_28%),linear-gradient(180deg,rgba(247,248,255,0.98),rgba(237,242,255,0.95),rgba(245,251,255,0.98))]" />
        <div className="absolute -top-8 left-6 h-36 w-36 rounded-full bg-indigo-200/70 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
        <div className="absolute right-0 top-10 h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
        <div className="absolute bottom-4 left-1/3 h-32 w-32 rounded-full bg-emerald-100/65 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
      </div>
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-start lg:gap-16 mb-6 transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="lg:w-1/2">
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              How we help you{" "}
              <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                operationalize AI
              </span>{" "}
              for your business
            </h2>
          </div>
          <div className="lg:w-1/2 mt-6 lg:mt-2 flex items-start">
            <p className="text-xl text-gray-600 leading-relaxed">
              We architect intelligent systems that plug directly into your
              operations — automating the workflows that drain your team's time,
              so they can focus on the work that actually moves the needle.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={
            inView
              ? "motion-safe:animate-fadeUpDelayed opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        >
          {/* Tab bar */}
          <div className="relative border-b border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-0 min-w-max">
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => handleTabChange(i)}
                  className={`relative px-5 py-4 text-lg font-semibold whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                    activeTab === i
                      ? "text-gray-900"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="hidden sm:inline">{t.label}</span>
                  <span className="sm:hidden">{t.shortLabel}</span>
                  {/* Active underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${t.accent} transition-all duration-300 ${
                      activeTab === i ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    } origin-left`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div
            className={`transition-all duration-220 ease-out ${
              animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Sub heading + desc */}
            <div className="mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {tab.heading}
              </h3>
              <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
                {tab.description}
              </p>
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {tab.items.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 group"
                    style={{
                      transitionDelay: `${i * 60}ms`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-lg ${tab.accentLight} ${tab.accentText} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                    >
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div>
                      <p className={`font-semibold text-gray-900 text-lg mb-1 flex items-center gap-1.5`}>
                        {item.title}
                        <ChevronRight
                          size={13}
                          className={`${tab.accentText} opacity-0 group-hover:opacity-100 transition-opacity duration-150 -ml-0.5`}
                        />
                      </p>
                      <p className="text-md text-gray-700 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA row */}
            <div className="mt-10 pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                variant="default"
                size="lg"
                className="group inline-flex items-center gap-2 text-base"
              >
                Schedule a consultation
                <ChevronRight
                  size={15}
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </Button>
              <p className="text-md text-gray-400">
                Free 30-min discovery call · No commitment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}