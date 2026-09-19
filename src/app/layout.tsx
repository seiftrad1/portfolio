import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seif Trad | Full-Stack Engineer',
  description: 'Full-stack engineer with 4+ years building fintech web applications end to end with Symfony, React and Next.js.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
