import Image from 'next/image'
import Link from 'next/link'
import PostShareBottom from '@/components/molecules/postShareBottom'
import ArticleIndex from '@/components/molecules/articleIndex'
import Divider from '@/components/atoms/divider'
import getData from '@/utils/getData'
import { Article, ArticleContent } from '@/utils/postDataType'
import { dataIcons } from '@/utils/dataIcons'
import PostShareTop from '@/components/molecules/postShareTop'
import LinkCard from '@/components/molecules/linkCard'


function ArticleAuthor({postData}: {postData: Article}) {
  const author = postData.contributed && postData.contributed[0]
  const authorId = author && author.id
  const authorLink = `/author/${authorId}`
  const category = postData.category
  const tags = postData.tags
  
  const date = new Date(postData.publishedAt)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const fullDay = (day < 10) ? ('0' + day) : day
  const fullMonth = (month < 10) ? ('0' + month) : month
  const formatDate = `${date.getFullYear()}.${fullMonth}.${fullDay}`;

  return (
    <div className="article__author">
      <div className="article__author__left">
        { author && author.avatar &&
          <Link href={authorLink} className="article__author__avatar">
            <Image
              src={author.avatar.url}
              alt={author.name}
              width={42}
              height={42}
              style={{width: '100%', height: 'auto'}}
              priority
              />
          </Link>
        }
      </div>
      <div className="article__author__right">
        { author && author.name &&
          <div className="article__author__name"><Link href={authorLink}>{author.name}</Link></div>
        }
        
        <div className="article__info">
          { category &&
            <div className="article__category">
              <i className="icon" dangerouslySetInnerHTML={{__html: dataIcons.category }}></i>
              <span className="article__category__list">
                <span key={category.id} className="article__category__item">
                  <Link href={`/category/${category.id}/`}>
                    <span>{category.name}</span>
                  </Link>
                </span>
              </span>
            </div>
          }

          { !!tags?.length &&
            <div className="article__tags">
              <i className="icon" dangerouslySetInnerHTML={{__html: dataIcons.tag}}></i>
              <span className="article__tags__list">
                { tags.map(tag => 
                  <span key={tag.id} className="article__tag">
                    <Link className="article__tag__item" href={`/tag/${tag.id}/`}>
                      <span>{tag.name}</span>
                    </Link>
                    <span className='separate'>、</span>
                  </span>
                )}
              </span>
            </div>
          }

          { formatDate &&
            <div className="article__date">
              <i className="icon" dangerouslySetInnerHTML={{__html: dataIcons.time}}></i>
              <span>{formatDate}</span>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

function PostInfoBottom({postData} : {postData: Article}) {
  const category = postData.category
  const tags = postData.tags

  return (
    <div className="article__infobottom">
      <Divider type={'slash'} />
      
      <div className="article__infobottom__inner">
        { category && 
          <div className="article__infobottom__category">
            <i className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="black">
                <path d="M2.5 4.92857C2.5 3.72846 2.5 3.1284 2.73356 2.67002C2.939 2.26682 3.26682 1.939 3.67002 1.73356C4.1284 1.5 4.72846 1.5 5.92857 1.5H9.07143C10.2715 1.5 10.8716 1.5 11.33 1.73356C11.7332 1.939 12.061 2.26682 12.2664 2.67002C12.5 3.1284 12.5 3.72846 12.5 4.92857V14.3571L7.5 11.5L2.5 14.3571V4.92857Z" strokeLinecap ="round" strokeLinejoin="round"/>
              </svg>
            </i>
            <div className="article__infobottom__category__list">
              <span key={category.id} className="article__infobottom__category__item">
                <Link href={`/category/${category.id}/`}>
                  <span>{category.name}</span>
                </Link>
              </span>
            </div>
          </div>
        }

        { !!tags?.length &&
          <div className="article__infobottom__tags">
            <i className="icon" dangerouslySetInnerHTML={{__html: dataIcons.tag}}></i>
            <span className="article__infobottom__tags__list">
              { tags.map(tag =>
                <span key={tag.id} className="article__infobottom__tag">
                  <Link className="article__infobottom__tags__item" href={`/tag/${tag.id}/`}>
                    <span>{tag.name}</span>
                  </Link>
                  <span className="separate">、</span>
                </span>
              )}
            </span>
          </div>
        }
      </div>
    </div>
  )
}

function ExpandedContent({postData, settingData}: {postData: Article, settingData: any}) {
  const expandedContent = postData?.expandedContent

  const html = expandedContent?.map((content: ArticleContent) => {
    if (content.fieldId == 'contentRichEditor') {
      const richEditor = content.richEditor ? content.richEditor : ''
      return (
        <div className="article__content__rich" dangerouslySetInnerHTML={{__html: richEditor}}></div>
      )
    }
    else if (content.fieldId == 'contentHTML') {
      const textarea = content.textarea ? content.textarea : ''
      return (
        <div className="article__content__html" dangerouslySetInnerHTML={{__html: textarea}}></div>
      )
    }
    else if (content.fieldId == 'contentLinkCard') {
      const linkCard = content.linkCard
      if (linkCard) {
        return <LinkCard article={linkCard} />
      }
    }
  })
  return html
}

async function ArticleDetail({ postId, draftKey }: {
  postId: string,
  draftKey: string|string[]|undefined,
}) {
  const endpoint = `blogs/${postId}${draftKey ? ('?draftKey=' + draftKey) : ''}`
  const microData = await getData(endpoint)
  const settingsData = await getData('settings/')

  const author = microData.contributed && microData.contributed[0]
  const thumbnail = microData.thumbnail

  return (
    <article className="article">
      <div className="article__mv">
        { microData.title &&
          <h1 className="article__title">{microData.title}</h1>
        }
        
        <div className="article__infotop">
          <ArticleAuthor postData={microData} />
          <PostShareTop socialShares={settingsData.articleSocialShares} />
        </div>

        { thumbnail &&
          <div className="article__preview">  
            <Image
              src={thumbnail.url}
              alt={author.name}
              width={940}
              height={580}
              style={{width: '100%', height: 'auto'}}
              priority
              />
          </div>
        }
      </div>
      <ArticleIndex />
      <div className="article__content">
        <div className="article__content__main" dangerouslySetInnerHTML={{__html: microData.content}}></div>
        <ExpandedContent postData={microData} settingData={settingsData} />
      </div>

      <PostInfoBottom postData={microData} />
      <PostShareBottom socialShares={settingsData.articleSocialShares} />
    </article>
  ) 
}

export default ArticleDetail