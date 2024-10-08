import Pagination from '@/components/molecules/pagination'
import PostRecent from '@/components/organisms/postRecent'
import Sidebar from '@/components/organisms/sidebar'
import TitleMV from '@/components/organisms/titleMV'
import { defaultSettings } from '@/contants/defaultSettings'
import { ResolvingMetadata } from 'next'
import getData from '@/utils/getData'
import NotFound from '@/app/not-found'
import Error from '@/app/error'

type Props = {
  params: {
    slug: string,
    current: string,
  },
  searchParams: {
    draftKey: string,
  }
}

/** MetaData */
export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata) {
  const settingsData = await getData('settings/')
  const catEndpoint = `category/${params.slug}/`
  const catData = await getData(catEndpoint)
  const parentData = await(parent)
  const previousPreview = parentData.openGraph?.images || []

  const draftKey = searchParams.draftKey
  const endpoint = `category/${params.slug}${ draftKey ? ('?draftKey=' + draftKey) : ''}`
  const microData = await getData(endpoint)

  // Title & description
  let titlePage = `《${catData.name}》カテゴリ一覧`
  let descriptionPage = `《${catData.name}》カテゴリの記事一覧ページです。`
  let siteName = `| ${settingsData.siteName}`
  if (microData.status === 401) {
    titlePage = defaultSettings.serverError
    descriptionPage = ''
    siteName = ''
  }
  else if (microData.status === 404) {
    titlePage = defaultSettings.pageNotFound
    descriptionPage = ''
  }
  const title = `${titlePage} ${siteName}`

  return {
    title: title,
    description: descriptionPage,
    openGraph: {
      title: title,
      images: [...previousPreview],
      type: 'article',
    }
  }
}


async function CategoryPage({ params }: Props) {

  /** Get data */
  const settingsData = await getData('settings/')
  const endpoint = `category/${params.slug}/`
  const microData = await getData(endpoint)
  
  const catName = microData.name
  const catId = microData.id
  const fields = defaultSettings.queryFields
  const postLimit = settingsData.postLimit || defaultSettings.postLimit

  const pageCurrent = Number(params.current)
  const offset = postLimit * (pageCurrent - 1)
  const limitOffset = `limit=${postLimit}&offset=${offset}`
  const filters = `filters=category[equals]${catId}`
  const postsEndpoint = `blogs?${filters}&${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)
  
  // [MICROCMS_API_KEY] not valid
  if (microData.status === 401) {
    return <Error />
  }
  // Page not found
  else if (microData.status === 404) {
    return <NotFound />
  }
 
  return (
    <>
      <TitleMV title={catName} />
      <div className="main__wrapper page--category">
        <div className="main__container container">
          <div className="main__inner">
            <div className="main__content">
              <PostRecent articles={postsData.contents} />
              <Pagination totalCount={postsData.totalCount} basePath={`/category/${params.slug}`} pageCurrent={pageCurrent} />
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}

export default CategoryPage
