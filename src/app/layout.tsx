import './globals.css'

import type { Metadata, Viewport } from 'next'
import { Big_Shoulders, DM_Mono, Familjen_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-big-shoulders',
  display: 'swap',
})

const familjen = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-familjen',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PulsePass Backoffice',
  description: 'Backoffice do PulsePass para organizadores de eventos.',
}

export const viewport: Viewport = {
  themeColor: '#edf2ef',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bigShoulders.variable} ${familjen.variable} ${dmMono.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-right"
          visibleToasts={3}
          offset={{ top: 'var(--spacing-md)', right: 'var(--spacing-3xl)' }}
          mobileOffset={{ top: 'var(--spacing-xs)' }}
          toastOptions={{ unstyled: true }}
        />
      </body>
    </html>
  )
}
