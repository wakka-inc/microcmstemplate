import Pagination from '@/components/molecules/pagination'
import PostRecent from '@/components/organisms/postRecent'
import Sidebar from '@/components/organisms/sidebar'
import TitleMV from '@/components/organisms/titleMV'
import { defaultSettings } from '@/contants/defaultSettings'
import { ResolvingMetadata } from 'next'
import getData from '@/utils/getData'

type Props = {
  params: {
    slug: string,
  },
  searchParams: {
    draftKey: string,
  }
}

/** MetaData */
export async function generateMetadata({params}: Props, parent: ResolvingMetadata) {
  const settingsData = await getData('settings/')
  const catEndpoint = `category/${params.slug}/`
  const catData = await getData(catEndpoint)
  const parentData = await(parent)

  const title = `《${catData.name}》カテゴリ一覧 | ${settingsData.siteName}`
  const previousPreview = parentData.openGraph?.images || []
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  return {
    title: title,
    description: `《${catData.name}》カテゴリの記事一覧ページです。`,
    openGraph: {
      title: title,
      images: [...previousPreview],
      type: 'article',
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


async function CategoryPage({ params, searchParams }: Props) {

  /** Get data */
  const draftKey = searchParams.draftKey
  const settingsData = await getData('settings/')
  const endpoint = `category/${params.slug}${ draftKey ? ('?draftKey=' + draftKey) : ''}`
  const microData = await getData(endpoint)
  
  const catName = microData.name
  const catId = microData.id
  const fields = defaultSettings.queryFields
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const limitOffset = `limit=${postLimit}&offset=${0}`
  const filters = `filters=category[equals]${catId}`
  const postsEndpoint = `blogs?${filters}&${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)
 
  return (
    <>
      <TitleMV title={catName} />
      <div className="main__wrapper page--category">
        <div className="main__container container">
          <div className="main__inner">
            <div className="main__content">
              <PostRecent articles={postsData.contents} />
              <Pagination totalCount={postsData.totalCount} basePath={`/category/${params.slug}`} pageCurrent={1} />
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage
