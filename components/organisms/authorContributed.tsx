import Image from 'next/image'
import TitleLine from '@/components/atoms/titleline'
import { Article, Contributed } from '@/utils/postDataType'
import getData from '@/utils/getData'
import Link from 'next/link'


function AuthorItem(authorData: Contributed) {
  const authorName = authorData.name || ''
  const authorDescription = authorData.description || '著者の説明はありません | No author description'
  const authorLink = `/author/${authorData.id}/`

  return (
    <div className="author-contributed__item" key={authorData.id}>
      <div className="author-contributed__avatar">
        { authorData.avatar && 
          <Link href={authorLink} className="author-contributed__img">
            <Image
              src={authorData.avatar.url}
              alt={authorName}
              width={180}
              height={180}
              style={{width: '100%', height: 'auto'}}
              />
          </Link>
        }
      </div>
      <div className="author-contributed__text">
        <div className="author-contributed__name"><Link href={authorLink}>{authorName}</Link></div>
        <div className="author-contributed__bio" dangerouslySetInnerHTML={{__html: authorDescription}}></div>
      </div>
    </div>
  )
}

async function AuthorContributed({postId}: {postId: string}) {
  const endpoint = `blogs/${postId}/`
  const microData = await getData(endpoint) as Article
  const contributed = microData.contributed

  return (
    <div className="author-contributed">
      { contributed && contributed.length &&
        <>
          <div className="author-contributed__header">
            <TitleLine size='small'><strong>この記事に携わった人</strong></TitleLine>
          </div>
          <div className="author-contributed__list"> 
            { contributed.map(author => AuthorItem(author)) }
          </div>
        </>
      }
    </div>
  )
}

export default AuthorContributed