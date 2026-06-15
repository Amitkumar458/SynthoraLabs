"use client"

import { useEffect, useRef } from "react"

type Node = { x: number; y: number; r: number; opacity: number }
type Line = { a: number; b: number; opacity: number }
type Pulse = { li: number; t: number; speed: number; dir: number }

const LINE_COLOR = "67,56,202"
const NODE_COLOR = "67,56,202"
const PULSE_COLOR = "rgba(67,56,202,0.82)"

function setupAnimation(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  onFrame: (id: number) => void,
) {
  let W = 0
  let H = 0
  let nodes: Node[] = []
  let lines: Line[] = []
  let pulses: (Pulse | null)[] = []
  let rafId = 0

  // Offscreen canvas for static layer (nodes + lines) — redrawn only on resize/init
  let offscreen: HTMLCanvasElement | null = null
  let offCtx: CanvasRenderingContext2D | null = null

  function getNodeCount() {
    return Math.min(90, Math.max(70, Math.floor((W * H) / 9000)))
  }

  function spawnPulse() {
    if (lines.length === 0) return
    const li = Math.floor(Math.random() * lines.length)
    pulses.push({
      li,
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
      dir: Math.random() < 0.5 ? 1 : -1,
    })
  }

  function buildStaticLayer() {
    if (!offCtx || !offscreen) return
    offCtx.clearRect(0, 0, W, H)

    // Draw lines
    lines.forEach((l) => {
      const a = nodes[l.a]
      const b = nodes[l.b]
      offCtx!.beginPath()
      offCtx!.moveTo(a.x, a.y)
      offCtx!.lineTo(b.x, b.y)
      offCtx!.strokeStyle = `rgba(${LINE_COLOR},${l.opacity})`
      offCtx!.lineWidth = 0.8
      offCtx!.lineCap = "round"
      offCtx!.stroke()
    })

    // Draw nodes
    nodes.forEach((n) => {
      offCtx!.beginPath()
      offCtx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
      offCtx!.fillStyle = `rgba(${NODE_COLOR},${n.opacity})`
      offCtx!.fill()

      if (n.r > 3) {
        offCtx!.beginPath()
        offCtx!.arc(n.x, n.y, n.r + 3, 0, Math.PI * 2)
        offCtx!.strokeStyle = `rgba(${NODE_COLOR},${n.opacity * 0.4})`
        offCtx!.lineWidth = 0.5
        offCtx!.stroke()
      }
    })
  }

  function init() {
    nodes = []
    lines = []
    pulses = []

    const count = getNodeCount()

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: 30 + Math.random() * (W - 60),
        y: 30 + Math.random() * (H - 60),
        r: Math.random() < 0.3 ? 3.5 : 2,
        opacity: 0.22 + Math.random() * 0.22,
      })
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 160) {
          lines.push({ a: i, b: j, opacity: 0.07 + Math.random() * 0.09 })
        }
      }
    }

    for (let i = 0; i < 14; i++) spawnPulse()

    buildStaticLayer()
  }

  function resize() {
    const parent = canvas.parentElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1

    W = rect.width
    H = rect.height

    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    // Sync offscreen canvas size
    if (!offscreen) {
      offscreen = document.createElement("canvas")
      offCtx = offscreen.getContext("2d")
    }
    offscreen.width = Math.round(W * dpr)
    offscreen.height = Math.round(H * dpr)
    offCtx!.setTransform(dpr, 0, 0, dpr, 0, 0)

    init()
  }

  function draw() {
    // Blit static layer (nodes + lines) from offscreen — no recompute
    ctx.clearRect(0, 0, W, H)
    if (offscreen) {
      ctx.drawImage(offscreen, 0, 0, W, H)
    }

    // Only animate pulses on main canvas
    pulses.forEach((p, idx) => {
      if (!p) return
      const l = lines[p.li]
      const a = nodes[l.a]
      const b = nodes[l.b]
      const x = a.x + (b.x - a.x) * p.t
      const y = a.y + (b.y - a.y) * p.t
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = PULSE_COLOR
      ctx.fill()
      p.t += p.speed * p.dir
      if (p.t > 1 || p.t < 0) {
        p.dir *= -1
        if (Math.random() < 0.3) {
          pulses[idx] = null
          spawnPulse()
        }
      }
    })

    pulses = pulses.filter(Boolean)
    if (pulses.length < 14) spawnPulse()

    rafId = requestAnimationFrame(draw)
    onFrame(rafId)
  }

  resize()
  draw()

  const onResize = () => resize()
  window.addEventListener("resize", onResize)

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener("resize", onResize)
  }
}

export default function AnimatedNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    return setupAnimation(canvas, ctx, (id) => {
      rafRef.current = id
    })
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-100vh pointer-events-none"
      aria-hidden="true"
    />
  )
}
