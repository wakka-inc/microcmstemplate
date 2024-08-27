import Image from 'next/image'
import Link from 'next/link'
import { Adsvertisment } from '@/utils/postDataType'


function AdsItem(ads: Adsvertisment, isPriority?: boolean) {
  const imageAds = ads.image
  const linkAds = ads.link
  const embedCode = ads.embedCode
  const linkTarget = ads.openNewTab ? '_blank' : undefined

  const codeRender = () => (
    !!embedCode &&
    <div className="sidebar__ads__embeded" dangerouslySetInnerHTML={{__html: embedCode}}></div>
  )
  const bannerRender = () => (
    !!imageAds &&
      !!linkAds ?
        <Link href={linkAds} target={linkTarget} className="sidebar__ads__img">
          <Image
            src={imageAds.url}
            alt={ads.name}
            width={320}
            height={Math.round(imageAds.height * 320 / imageAds.width)}
            priority={isPriority}
          />
        </Link>
        :
        <span className="sidebar__ads__img">
          <Image
            src={imageAds.url}
            alt={ads.name}
            width={320}
            height={Math.round(imageAds.height * 320 / imageAds.width)}
            priority={isPriority}
          />
        </span>
  )

  return (
    <div className="sidebar__ads__item">
      { !!embedCode ? codeRender() : bannerRender() }
    </div>
  )
}

function SideAds({listAds, isPriority}: {listAds: Adsvertisment[], isPriority?: boolean }) {
  return (
    !!listAds?.length && listAds.map(ads => AdsItem(ads, isPriority))
  )
}

export default SideAds