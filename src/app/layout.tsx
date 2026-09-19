import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEIF | Software Engineer • Photographer • Digital Creator',
  description: 'Three parallel universes. One creative mind.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
