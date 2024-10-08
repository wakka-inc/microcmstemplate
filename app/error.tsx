'use client'

import image500 from '@/public/images/500.svg'
import image500_sp from '@/public/images/500-sp.svg'
import Image from 'next/image'
import { defaultSettings } from '@/contants/defaultSettings'

/** MetaData */
export async function generateMetadata() {
  const title = `${defaultSettings.error500Title}`
  return {
    title: title,
    description: '',
    openGraph: {
      title: title,
      type: 'article',
    }
  }
}

export default function Error() {
  const pageDescription = defaultSettings.error500Title

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
              <p className='text-center' dangerouslySetInnerHTML={{ __html: pageDescription }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
