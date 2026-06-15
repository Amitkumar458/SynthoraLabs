import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Synthora AI Labs — AI for Modern Businesses",
  description: "RAG solutions, AI data analysis, and business automation.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-[#f8f9ff] antialiased`}>
        {children}
      </body>
    </html>
  )
}