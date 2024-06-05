import type { Metadata, ResolvingMetadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import '@/assets/scss/styles.scss'
import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import MenuExpanded from '@/components/molecules/menuExpanded'
import Inquiries from '@/components/organisms/inquiries'


const noto = Noto_Sans_JP({
  subsets: ['latin']
})

/** MetaData */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || ''),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    images: '/images/image-preview.png',
  },
  icons: {
    icon: [
      {
        url: '/images/favicon.ico',
        href: '/images/favicon.ico',
      },
    ]
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={noto.className}>
        <main id="main" className={'main'}>
          <Header />
          {children}
          <Inquiries />
          <Footer />
          <MenuExpanded />
        </main>
      </body>
    </html>
  )
}
