import Pagination from '@/components/molecules/pagination'
import AuthorMV from '@/components/organisms/authorMV'
import Divider from '@/components/atoms/divider'
import PostRecent from '@/components/organisms/postRecent'
import Sidebar from '@/components/organisms/sidebar'
import { defaultSettings } from '@/contants/defaultSettings'
import { ResolvingMetadata } from 'next'
import getData from '@/utils/getData'

type Props = {
  params: {
    authorId: string,
  },
  searchParams: {
    draftKey: string,
  }
}

/** MetaData */
export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata) {
  const settingsData = await getData('settings/')
  const authorEndpoint = `people/${params.authorId}/`
  const authorData = await getData(authorEndpoint)
  const parentData = await(parent)

  const title = `${authorData.name} | ${settingsData.siteName}`
  const previousPreview = parentData.openGraph?.images || []
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  return {
    title: title,
    description: authorData.description,
    openGraph: {
      title: title,
      images: [...previousPreview],
      type: 'profile',
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


async function AuthorPage({params, searchParams}: Props) {
  
  /** Get data */
  const settingsData = await getData('settings/')
  const fields = defaultSettings.queryFields
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const limitOffset = `limit=${postLimit}&offset=${0}`
  const filters = `filters=contributed[contains]${params.authorId}`
  const postsEndpoint = `blogs/?${filters}&${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)

  return (
   <>
    <AuthorMV authorId={params.authorId} draftKey={searchParams.draftKey} />
    <Divider type={'slash'} />
    <div className="main__wrapper page--author">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <PostRecent title='携わった記事一覧' articles={postsData.contents} />
            <Pagination totalCount={postsData.totalCount} basePath={`/author/${params.authorId}`} pageCurrent={1} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
   </>
  )
}

export default AuthorPage
