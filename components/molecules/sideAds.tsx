import Image from 'next/image'
import Link from 'next/link'
import { Adsvertisment } from '@/utils/postDataType'


function AdsItem(ads: Adsvertisment, isPriority?: boolean) {
  const image = ads.image
  const embedCode = ads.embedCode
  const linkTarget = ads.openNewTab ? '_blank' : undefined

  const codeRender = () => (
    !!embedCode &&
    <div className="sidebar__ads__embeded" dangerouslySetInnerHTML={{__html: embedCode}}></div>
  )
  const imageRender = () => (
    !!image &&
    <Link href={ads.link} target={linkTarget} className="sidebar__ads__img">
      <Image
        src={image.url}
        alt={ads.name}
        width={320}
        height={Math.round(image.height * 320 / image.width)}
        priority={isPriority}
      />
    </Link>
  )

  return (
    <div className="sidebar__ads__item">
      { !!embedCode ? codeRender() : imageRender() }
    </div>
  )
}

function SideAds({listAds, isPriority}: {listAds: Adsvertisment[], isPriority?: boolean }) {
  return (
    listAds && listAds.length && listAds.map(ads => AdsItem(ads, isPriority))
  )
}

export default SideAds