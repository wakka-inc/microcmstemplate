'use client'

import image500 from '@/public/images/500.svg'
import image500_sp from '@/public/images/500-sp.svg'
import Image from 'next/image'
import TitleLine from '@/components/atoms/titleline'
import { defaultSettings } from '@/contants/defaultSettings'

export default function Error({error, reset}: {
  error: Error & { digest?: string }
  reset: () => void
}){
  const title = defaultSettings.error500Title
  return (
  <div className="main__wrapper page--error page--500">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <div className="page404">
              <div className="page404__img">
                <Image
                  src={image500.src}
                  width={image500.width}
                  height={image500.height}
                  alt={'500'}
                  className='pc'
                  />
                <Image
                  src={image500_sp.src}
                  width={image500_sp.width}
                  height={image500_sp.height}
                  alt={'500'}
                  className='sp'
                  />
              </div>
              <TitleLine size="small">{title}</TitleLine>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
