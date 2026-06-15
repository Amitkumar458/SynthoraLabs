'use client'

import { useState } from 'react'
import {
  HelpCircle,
  Shield,
  Clock,
  Code2,
  Link2,
  LayoutGrid,
  Search,
  X,
  Plus,
  ShieldCheck,
  Check,
  Cpu,
  Database,
  Monitor,
  Phone,
  DollarSign,
  MessageSquare,
  Phone as PhoneIcon,
} from 'lucide-react'
import { Button } from '../common/button'

// ─── Types ───────────────────────────────────────────────
type Category = 'all' | 'security' | 'ai' | 'technical' | 'integration'

interface Badge {
  icon: React.ReactNode
  label: string
  color: 'violet' | 'indigo' | 'sky' | 'emerald'
}

interface FAQItem {
  id: number
  category: Exclude<Category, 'all'>
  question: string
  answer: string
  icon: React.ReactNode
  badge: Badge
}

// ─── Data ────────────────────────────────────────────────
const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    category: 'security',
    question:
      'What does it mean to have an "air-gapped" or locally deployed AI?',
    answer:
      'Unlike cloud-based AI services that send your prompts to third-party servers, a locally deployed model runs entirely on your own infrastructure. "Air-gapped" means the system can operate without an active internet connection, ensuring your proprietary data never leaves your secure environment.',
    icon: <Shield size={22} />,
    badge: {
      icon: <Shield size={16} />,
      label: 'Zero data leaves your perimeter',
      color: 'violet',
    },
  },
  {
    id: 2,
    category: 'security',
    question: 'Is our corporate data used to train public AI models?',
    answer:
      'No. By utilizing localized Large Language Models (LLMs), your data remains strictly within your perimeter. We do not use your internal documents, customer interactions, or operational data to train external or public models.',
    icon: <ShieldCheck size={22} />,
    badge: {
      icon: <Check size={16} />,
      label: 'Your data stays yours — always',
      color: 'violet',
    },
  },
  {
    id: 3,
    category: 'ai',
    question:
      'What is the difference between a standard chatbot and an "Agentic" AI?',
    answer:
      'A standard chatbot simply retrieves text to answer a question. Agentic AI acts as an autonomous worker — it can reason through multi-step problems, execute scripts, and actively interact with your existing software (querying a database, updating a customer record) to complete complex workflows without human intervention.',
    icon: <Cpu size={22} />,
    badge: {
      icon: <Code2 size={16} />,
      label: 'Autonomous multi-step reasoning',
      color: 'indigo',
    },
  },
  {
    id: 4,
    category: 'technical',
    question:
      'Can the AI securely search through our internal company documents?',
    answer:
      'Yes. We deploy localized vector embedding models to create a Retrieval-Augmented Generation (RAG) pipeline. This allows the AI agent to instantly search and synthesize answers from your specific PDFs, manuals, and internal wikis — all while respecting your internal access controls.',
    icon: <Search size={22} />,
    badge: {
      icon: <Search size={16} />,
      label: 'RAG pipeline with access controls',
      color: 'sky',
    },
  },
  {
    id: 5,
    category: 'technical',
    question: 'Can the AI pull reports directly from our databases?',
    answer:
      'Absolutely. Our agents can be configured with automated Text-to-SQL data architectures, allowing your team to simply ask questions in plain English, and the AI will securely query your relational databases to retrieve the correct metrics.',
    icon: <Database size={22} />,
    badge: {
      icon: <Code2 size={16} />,
      label: 'Text-to-SQL — plain English queries',
      color: 'sky',
    },
  },
  {
    id: 6,
    category: 'technical',
    question: 'What kind of hardware is required to run AI models on-premise?',
    answer:
      'Hardware requirements depend on the size of the model and the concurrency of requests. We architect solutions that run on enterprise-grade local servers equipped with dedicated GPUs, or within your secure, private cloud tenancy — optimizing for both performance and cost.',
    icon: <Monitor size={22} />,
    badge: {
      icon: <Monitor size={16} />,
      label: 'GPU-optimized on-premise or private cloud',
      color: 'sky',
    },
  },
  {
    id: 7,
    category: 'integration',
    question:
      'Can these AI agents integrate with our existing contact center platform?',
    answer:
      'Yes. Localized AI agents can be seamlessly integrated into existing enterprise voice platforms. They handle SIP signaling and media control routing to act as intelligent, conversational voice bots — resolving customer queries before they ever reach a human agent.',
    icon: <Phone size={22} />,
    badge: {
      icon: <Link2 size={16} />,
      label: 'SIP & voice platform ready',
      color: 'emerald',
    },
  },
  {
    id: 8,
    category: 'technical',
    question: 'What is an AI "token," and how does it affect our local system?',
    answer:
      'A token is a fundamental unit of data roughly equivalent to ¾ of a word. With cloud AI, you pay a fee per token processed. With our locally deployed models, you pay nothing per token — instead, token volume dictates hardware requirements and speed. The "context window" (max tokens handled at once) determines how many documents the AI can analyze simultaneously. More tokens require more local VRAM.',
    icon: <DollarSign size={22} />,
    badge: {
      icon: <DollarSign size={16} />,
      label: 'No per-token cost on local models',
      color: 'sky',
    },
  },
]

// ─── Badge color maps ─────────────────────────────────────
const badgeStyles: Record<
  Badge['color'],
  { wrapper: string; dot: string; pill: string }
> = {
  violet: {
    wrapper: 'border-purple-400/30 text-purple-700 bg-purple-50',
    dot: 'bg-purple-500',
    pill: 'bg-purple-100/60 border-purple-300/40 text-purple-700',
  },
  indigo: {
    wrapper: 'border-indigo-400/30 text-indigo-700 bg-indigo-50',
    dot: 'bg-indigo-500',
    pill: 'bg-indigo-100/60 border-indigo-300/40 text-indigo-700',
  },
  sky: {
    wrapper: 'border-sky-400/30 text-sky-700 bg-sky-50',
    dot: 'bg-sky-400',
    pill: 'bg-sky-100/60 border-sky-300/40 text-sky-700',
  },
  emerald: {
    wrapper: 'border-emerald-400/30 text-emerald-700 bg-emerald-50',
    dot: 'bg-emerald-400',
    pill: 'bg-emerald-100/60 border-emerald-300/40 text-emerald-700',
  },
}

const catPillStyles: Record<Exclude<Category, 'all'>, string> = {
  security: 'bg-purple-100/70 border-purple-300/40 text-purple-700',
  ai: 'bg-indigo-100/70 border-indigo-300/40 text-indigo-700',
  technical: 'bg-sky-100/70 border-sky-300/40 text-sky-700',
  integration: 'bg-emerald-100/70 border-emerald-300/40 text-emerald-700',
}

const catDotStyles: Record<Exclude<Category, 'all'>, string> = {
  security: 'bg-purple-500',
  ai: 'bg-indigo-500',
  technical: 'bg-sky-400',
  integration: 'bg-emerald-400',
}

const catLabels: Record<Exclude<Category, 'all'>, string> = {
  security: 'Security & Data',
  ai: 'AI & Agents',
  technical: 'Technical',
  integration: 'Integration',
}

// ─── Sub-components ───────────────────────────────────────

function ShimmerBadge({ badge }: { badge: Badge }) {
  const s = badgeStyles[badge.color]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-md font-medium ${s.pill}`}
      style={{
        background:
          badge.color === 'violet'
            ? 'linear-gradient(90deg, rgba(139,92,246,0.08) 25%, rgba(167,139,250,0.16) 50%, rgba(139,92,246,0.08) 75%)'
            : badge.color === 'indigo'
              ? 'linear-gradient(90deg, rgba(99,102,241,0.08) 25%, rgba(129,140,248,0.16) 50%, rgba(99,102,241,0.08) 75%)'
              : badge.color === 'sky'
                ? 'linear-gradient(90deg, rgba(56,189,248,0.08) 25%, rgba(125,211,252,0.16) 50%, rgba(56,189,248,0.08) 75%)'
                : 'linear-gradient(90deg, rgba(52,211,153,0.08) 25%, rgba(110,231,183,0.16) 50%, rgba(52,211,153,0.08) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2.2s linear infinite',
      }}
    >
      {badge.icon}
      {badge.label}
    </span>
  )
}

function FAQCard({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
        isOpen
          ? 'border border-purple-400/40 shadow-[0_0_0_1px_rgba(167,139,250,0.15),0_8px_32px_rgba(139,92,246,0.10)]'
          : 'border border-purple-300/20 hover:border-purple-400/30'
      }`}
      style={{
        background: isOpen
          ? 'rgba(255,255,255,0.75)'
          : 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Trigger */}
      <button
        className="flex w-full items-start gap-4 px-5 py-5 text-left"
        onClick={onToggle}
      >
        {/* Icon box */}
        <div
          className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            isOpen
              ? 'bg-purple-200/60 text-purple-700'
              : 'bg-purple-100/60 text-purple-500'
          }`}
        >
          {item.icon}
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <span className="block text-lg leading-snug font-medium text-grey-800">
            {item.question}
          </span>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${catPillStyles[item.category]}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${catDotStyles[item.category]}`}
            />
            {catLabels[item.category]}
          </span>
        </div>

        {/* Toggle icon */}
        <div
          className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
            isOpen
              ? 'rotate-45 border-purple-400/40 bg-purple-100/70'
              : 'border-purple-300/30 bg-transparent'
          }`}
        >
          <Plus size={14} className="text-purple-600" />
        </div>
      </button>

      {/* Answer */}
      <div
        className="grid transition-all duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pl-[4.25rem]">
            <p className="text-md leading-relaxed text-slate-800">
              {item.answer}
            </p>
            <div className="mt-3">
              <ShimmerBadge badge={item.badge} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Tab button ───────────────────────────────────────────
const TAB_ICONS: Record<Category, React.ReactNode> = {
  all: <LayoutGrid size={16} />,
  security: <Shield size={16} />,
  ai: <Clock size={16} />,
  technical: <Code2 size={16} />,
  integration: <Link2 size={16} />,
}

const TAB_LABELS: Record<Category, string> = {
  all: 'All',
  security: 'Security & Data',
  ai: 'AI & Agents',
  technical: 'Technical',
  integration: 'Integration',
}

// ─── Main Component ───────────────────────────────────────
export default function FAQSection() {
  const [activeTab, setActiveTab] = useState<Category>('all')
  const [search, setSearch] = useState('')
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = FAQ_DATA.filter((item) => {
    const matchCat = activeTab === 'all' || item.category === activeTab
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const tabs: Category[] = ['all', 'security', 'ai', 'technical', 'integration']

  return (
    <>
      {/* Global shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          from { background-position: -200% 0; }
          to   { background-position:  200% 0; }
        }
        @keyframes blobDrift {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(30px,-20px) scale(1.08); }
          100% { transform: translate(-20px,30px) scale(0.95); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.45s ease both; }
      `}</style>

      <section id="faq" className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#f7f8ff_0%,#edf2ff_45%,#f5fbff_100%)] px-4 py-12 sm:px-6 lg:px-12">
        {/* Dot grid overlay */}
        <div className="pointer-events-none absolute inset-0" />

        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute h-96 w-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(167,139,250,0.28) 0%, transparent 70%)',
            top: '-6rem',
            left: '-8rem',
            filter: 'blur(60px)',
            animation: 'blobDrift 12s ease-in-out infinite alternate',
          }}
        />
        <div
          className="pointer-events-none absolute h-80 w-80 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 70%)',
            bottom: '2rem',
            right: '-6rem',
            filter: 'blur(60px)',
            animation: 'blobDrift 12s ease-in-out infinite alternate',
            animationDelay: '4s',
          }}
        />
        <div
          className="pointer-events-none absolute h-64 w-64 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(56,189,248,0.14) 0%, transparent 70%)',
            top: '50%',
            right: '10%',
            filter: 'blur(50px)',
            animation: 'blobDrift 12s ease-in-out infinite alternate',
            animationDelay: '2s',
          }}
        />

        {/* Top gradient bar */}
        <div className="bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto max-w-7xl">
          {/* Header */}
          <div className="animate-fade-up mb-6">
            {/* Eyebrow pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/40 px-3 py-1.5 backdrop-blur-sm">
              <HelpCircle size={14} className="text-purple-600" />
              <span className="text-[12px] font-semibold tracking-widest text-purple-800 uppercase">
                FAQ
              </span>
            </div>

            <h2 className="mb-1 text-3xl leading-tight font-semibold text-slate-800 md:text-4xl lg:text-5xl">
              Common{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 bg-clip-text text-transparent">
                  Questions
                </span>
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-xl" />
              </span>
            </h2>
            <p className="max-w-4xl text-lg leading-relaxed text-slate-500">
              Everything you need to know about local AI deployment, data
              security, and enterprise integration.
            </p>
          </div>

          {/* Search */}
          <div
            className="animate-fade-up relative mb-6"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Search size={20} className="text-slate-600" />
            </div>
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-purple-200 bg-white/50 py-3.5 pr-10 pl-13 text-md text-slate-700 placeholder-slate-600 backdrop-blur-sm transition-all duration-200 outline-none focus:border-purple-400/50 focus:shadow-[0_0_0_2px_rgba(139,92,246,0.20),0_0_20px_rgba(139,92,246,0.08)]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute inset-y-0 right-3 flex items-center px-1 text-slate-400 transition-colors hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div
            className="animate-fade-up mb-5 flex flex-wrap gap-2"
            style={{ animationDelay: '0.15s' }}
          >
            {tabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-md font-medium transition-all duration-200 ${
                  activeTab === cat
                    ? 'border-purple-400/50 bg-white/70 text-purple-700 shadow-sm'
                    : 'border-purple-200 bg-white/30 text-slate-500 hover:border-purple-300/40 hover:text-slate-700'
                }`}
              >
                {TAB_ICONS[cat]}
                {TAB_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="flex flex-col gap-3">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.05 + idx * 0.05}s` }}
              >
                <FAQCard
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() =>
                    setOpenId(openId === item.id ? null : item.id)
                  }
                />
              </div>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <div className="inline-flex flex-col items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/20 bg-white/40">
                  <Search size={24} className="text-slate-400" />
                </div>
                <p className="text-md text-slate-400">
                  No questions match your search
                </p>
                <button
                  onClick={() => setSearch('')}
                  className="text-md text-purple-600 underline underline-offset-2 transition-colors hover:text-purple-700"
                >
                  Clear search
                </button>
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-purple-300/25 p-6 sm:flex-row sm:items-center"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(238,234,248,0.55) 100%)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100/70">
              <MessageSquare size={20} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-md font-medium text-slate-800">
                Still have questions?
              </p>
              <p className="mt-0.5 text-md text-slate-600">
                Our team is happy to walk you through anything in detail.
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="group inline-flex items-center gap-2 text-base"
            >
              {' '}
              <PhoneIcon size={16} />
              Speak with us
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
