import image404 from '@/public/images/404.svg'
import image404_sp from '@/public/images/404-sp.svg'
import Image from 'next/image'
import TitleLine from '@/components/atoms/titleline'

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
              <TitleLine size="small">ページが見つかりません</TitleLine>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}
