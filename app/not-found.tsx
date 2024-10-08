import image404 from '@/public/images/404.svg'
import image404_sp from '@/public/images/404-sp.svg'
import Image from 'next/image'
import getData from '@/utils/getData'
import { defaultSettings } from '@/contants/defaultSettings'

/** MetaData */
export async function generateMetadata() {
  const settingsData = await getData('settings/')
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  // Title
  let titlePage = defaultSettings.pageNotFound
  const title = `${titlePage} | ${settingsData.siteName}`

  return {
    title: title,
    description: '',
    openGraph: {
      title: title,
      type: 'article',
    },
    icons: {
      icon: [
        {
          url: faviconUrl,
          href: faviconUrl,
        }
      ]
    }
  }
}

export default function NotFound() {
  return (
   <>
    <div className="main__wrapper page--404">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <div className="page404">
              <div className="page404__img">
              <Image
                  src={image404.src}
                  width={image404.width}
                  height={image404.height}
                  alt={'404'}
                  className='pc'
                  />
                <Image
                  src={image404_sp.src}
                  width={image404_sp.width}
                  height={image404_sp.height}
                  alt={'404'}
                  className='sp'
                  />
              </div>
              <p className='text-center' dangerouslySetInnerHTML={{ __html: defaultSettings.notfoundTitle }}></p>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
