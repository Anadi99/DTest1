import type React from "react"
import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Deutchnames - German Vocabulary Through Codenames",
  description:
    "Master German vocabulary (A1-B2) through strategic Codenames-style gameplay. Perfect for language learners seeking interactive practice with authentic German words.",
  keywords: ["German", "language learning", "vocabulary", "Codenames", "multiplayer", "A1", "A2", "B1", "B2", "CEFR", "educational game"],
  authors: [{ name: "Deutchnames Team" }],
  openGraph: {
    title: "Deutchnames - German Vocabulary Through Codenames",
    description: "Master German vocabulary (A1-B2) through strategic Codenames-style gameplay. Interactive language learning for daily conversations.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Deutchnames v1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable} antialiased`}>
      <body className="font-sans">
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div id="skip-link" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
              <a href="#main-content" className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
                Skip to main content
              </a>
            </div>
            <main id="main-content">{children}</main>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
