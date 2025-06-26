import type { Metadata } from 'next'
import { Quantico } from 'next/font/google'
import '@/assets/styles/globals.css'
import QueryProviders from '@/components/global/layouts/QueryProviders'

export const metadata: Metadata = {
  title: 'Roasting Instagram',
  description: 'Mau keren ? harus diroasting dulu profile instagram',
}

const quantico = Quantico({
  variable: '--font-quantico',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={quantico.variable}>
        <QueryProviders>
          <main>
            {children}
          </main>
        </QueryProviders>
      </body>
    </html>
  )
}
