'use client'
import Link from 'next/link'
import { dataIconSocials } from '@/utils/dataIcons'
import {
  EmailShareButton,
  FacebookShareButton,
  GabShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share"

type TypeSocial = {
  type?: string,
  name: string[],
  link: string,
}


function SocialItem(itemData: TypeSocial) {
  const name = itemData.name != undefined ? itemData.name[0] : 'other'
  const icon = dataIconSocials[name]
  const className = `sns__item sns--${name}`

  const ItemInner = () => (
    <span className={`sns__item__inner`}>
      <i className="icon" dangerouslySetInnerHTML={{__html: dataIconSocials[name]}}></i>
    </span>
  )
  
  /** Type social = share */
  if (itemData.type == 'share') {
    const shareLink = window?.location?.href

    if (name == 'facebook') {
      return (
        <FacebookShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></FacebookShareButton>
      )
    }
    else if (name == 'x') {
      return (
        <TwitterShareButton url={shareLink} title={name} className={className} key={name} aria-label={name}><ItemInner /></TwitterShareButton>
      )
    }
    else if (name == 'twitter') {
      return (
        <TwitterShareButton url={shareLink} title={name} className={className} key={name} aria-label={name}><ItemInner /></TwitterShareButton>
      )
    }
    else if (name == 'linkedin') {
      return (
        <LinkedinShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></LinkedinShareButton>
      )
    }
    else if (name == 'line') {
      return (
        <LineShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></LineShareButton>
      )
    }
    else if (name == 'whatsapp') {
      return (
        <WhatsappShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></WhatsappShareButton>
      )
    }
    else if (name == 'telegram') {
      return (
        <TelegramShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></TelegramShareButton>
      )
    }
    else if (name == 'viber') {
      return (
        <ViberShareButton url={shareLink} className={className} key={name} aria-label={name}><ItemInner /></ViberShareButton>
      )
    }
  }
  
  /** Type social = link */
  return (
    <Link href={`${itemData.link}`} className={className} key={name} target='_blank' aria-label={name}>
      <span className={`sns__item__inner`}>
        { icon ? <i className="icon" dangerouslySetInnerHTML={{__html: icon }}></i> : <>{name}</> }
      </span>
    </Link>
  )
}


function Social({size = 'default', color = 'dark', list}: {
  list: Array<TypeSocial>,
  size?: string,
  color?: string
}) {
  const sizeClass = size ? (' sns--' + size) : ''
  const colorClass = color ? (' sns--' + color) : ''

  return (
    <div className={'sns' +  sizeClass + colorClass}>
      <div className="sns__list">
        { list && list.map((itemData) => SocialItem(itemData)) }
      </div>
    </div>
  )
}

export default Social