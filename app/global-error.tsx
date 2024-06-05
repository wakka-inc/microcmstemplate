'use client'

import image502 from '@/public/images/502.svg'
import image502_sp from '@/public/images/502-sp.svg'
import Image from 'next/image'
import TitleLine from '@/components/atoms/titleline'
import { Noto_Sans_JP } from 'next/font/google'
import { defaultSettings } from '@/contants/defaultSettings'

const noto = Noto_Sans_JP({
  subsets: ['latin']
})

export default function GlobalError({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}){
  const title = defaultSettings.error502Title
  return (
    <html lang="ja">
      <body className={noto.className}>
        <main id="main" className={'main'} style={{paddingTop: 0}}>

          <div className="main__wrapper page--error page--502">
            <div className="main__container container">
              <div className="main__inner">
                <div className="main__content">
                  <div className="page502">
                    <div className="page502__img">
                      <Image
                        src={image502.src}
                        width={image502.width}
                        height={image502.height}
                        alt={'502'}
                        className='pc'
                        />
                      <Image
                        src={image502_sp.src}
                        width={image502_sp.width}
                        height={image502_sp.height}
                        alt={'502'}
                        className='sp'
                        />
                    </div>
                    <TitleLine size="small">{title}</TitleLine>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </body>
    </html>
  )
}
