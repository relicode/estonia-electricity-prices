import './globals.css'

import localFont from 'next/font/local'

import type { Metadata, Viewport } from 'next/types'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Estonia electricity prices',
  description: `Estonia electricity prices ${new Date().toLocaleTimeString()}`,
  applicationName: 'Electricity prices',
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
  userScalable: true,
  width: 'device-width',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
