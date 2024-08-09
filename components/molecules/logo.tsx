import Image from 'next/image'
import Link from 'next/link'
import { ImageThumbnail } from '@/utils/postDataType'

function Logo({logo, alt} : {logo: ImageThumbnail, alt: string}) {
  return (
    <div className="logo">
      { logo && 
        <Link href={'/'}>
          <Image
            src={logo.url}
            alt={alt}
            width={logo.width}
            height={logo.height}
            />
        </Link>
      }
    </div>
  )
}

export default Logo