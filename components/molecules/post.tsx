import Link from 'next/link'
import Image from 'next/image'
import { Article, Contributed } from '@/utils/postDataType'
import noThumbnail from '@/public/images/no-thumbnail.svg'
import AuthorOnClient from '@/components/molecules/authorOnClient'


function Post(article: Article, isPriority?: boolean) {
  const previewImage = article.thumbnail
  const previewImageLink = previewImage ? previewImage.url : noThumbnail.src
  const postLink = `/${article.id}`

  // Get full author infomation if no data
  const contributed = article.contributed
  let author = contributed ? contributed[0] : {} as Contributed
  const authorLink = author ?  `/author/${author.id}` : ''

  const date = new Date(article.publishedAt)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const fullDay = (day < 10) ? ('0' + day) : day
  const fullMonth = (month < 10) ? ('0' + month) : month
  const formatDate = `${date.getFullYear()}.${fullMonth}.${fullDay}`;

  return (
    <div className="postitem" key={article.id}>
      <Link href={postLink} className="postitem__thumbnail">
        <span className="postitem__thumbnail__img">
          <Image
            src={previewImageLink}
            alt={article.title}
            width={300}
            height={185}
            style={{width: '100%', height: 'auto'}}
            priority={isPriority}
            />
        </span>
      </Link>
      
      <div className="postitem__text">
        <div className="postitem__title">
          <Link href={postLink}>{article.title}</Link>
        </div>

        {/** Author */}
        { author && author.name &&
          <div className="postitem__author">
            { author.avatar &&
              <Link href={authorLink} className="postitem__author__avatar">
                <Image
                  src={author.avatar.url}
                  alt={author.name}
                  width={32}
                  height={32}
                  style={{width: '100%', height: 'auto'}}
                />
              </Link>
            }
            <div className="postitem__author__info">
              <Link href={authorLink} className="postitem__author__name">{author.name}</Link>
              <span className="postitem__author__name__divider">/</span>
              <span className="postitem__author__date">{formatDate}</span>
            </div>
          </div>
        }
        { author && !author.name &&
          <AuthorOnClient
            authorId={author.id}
            formatDate={formatDate}
            apiKey={process.env.MICROCMS_API_KEY}
            serviceDomain={process.env.MICROCMS_SERVICE_DOMAIN}
          />
        }

        {/** Date */}
        <div className="postitem__date">
          <i className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="black">
              <path d="M11.5 5.5H0.5M8.5 0.5V2.5M3.5 0.5V2.5M3.7 12.5H8.3C9.42011 12.5 9.98016 12.5 10.408 12.3038C10.7843 12.1312 11.0903 11.8559 11.282 11.5172C11.5 11.1321 11.5 10.6281 11.5 9.62V4.58C11.5 3.57191 11.5 2.86786 11.282 2.48282C11.0903 2.14413 10.7843 1.86876 10.408 1.69619C9.98016 1.5 9.42011 1.5 8.3 1.5H3.7C2.5799 1.5 2.01984 1.5 1.59202 1.69619C1.21569 1.86876 0.909734 2.14413 0.717987 2.48282C0.5 2.86786 0.5 3.57191 0.5 4.58V9.62C0.5 10.6281 0.5 11.1321 0.717987 11.5172C0.909734 11.8559 1.21569 12.1312 1.59202 12.3038C2.01984 12.5 2.57989 12.5 3.7 12.5Z" strokeLinecap ="round" strokeLinejoin="round"/>
            </svg>
          </i>
          <span>{formatDate}</span>
        </div>
      </div>
    </div>
  )
}

export default Post