import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/utils/postDataType'
import noThumbnail from '@/public/images/no-thumbnail.svg'
import getData from '@/utils/getData'
import { defaultSettings } from '@/contants/defaultSettings'


async function LinkCard({article}: {article: Article}) {
  const previewImage = article.thumbnail
  const previewImageLink = previewImage ? previewImage.url : noThumbnail.src
  const postLink = `/${article.id}`

  const settingsData = await getData('settings/')
  const siteName = settingsData.siteName || defaultSettings.siteName
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  return (
    <div className="linkcard" key={article.id}>
      <Link href={postLink} className="linkcard__link">
        <div className="linkcard__thumbnail">
          <span className="linkcard__thumbnail__img">
            <Image
              src={previewImageLink}
              alt={article.title}
              width={150}
              height={92}
              style={{width: '100%', height: 'auto'}}
              />
          </span>
        </div>
        
        <div className="linkcard__text">
          <div className="linkcard__info">
            <div className="linkcard__favicon">
              <Image
                src={faviconUrl}
                alt={siteName}
                width={favicon.width}
                height={favicon.height}
                style={{width: '100%', height: 'auto'}}
                />
            </div>
            <div className="linkcard__sitename">{siteName}</div>
          </div>
          <div className="linkcard__title">{article.title}</div>
        </div>
      </Link>
    </div>
  )
}

export default LinkCard