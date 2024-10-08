import Sidebar from '@/components/organisms/sidebar'
import PostRecent from '@/components/organisms/postRecent'
import Pagination from '@/components/molecules/pagination'
import { defaultSettings } from '@/contants/defaultSettings'
import getData from '@/utils/getData'
import { ResolvingMetadata } from 'next'
import NotFound from '@/app/not-found'
import Error from '@/app/error'

/** Dymanic Metadata */
export async function generateMetadata({params}: {params: {current: string}}, parent: ResolvingMetadata) {
  const parentData = await(parent)
  const settingsData = await getData('settings/')
  const previousPreview = parentData.openGraph?.images || []
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  const pageCurrent = Number(params.current)
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const MVpostLimit = defaultSettings.postMainVisualLimit
  const offset = (postLimit * (pageCurrent - 1)) + MVpostLimit

  const fields = defaultSettings.queryFields
  const limitOffset = `limit=${postLimit}&offset=${offset}`
  const postsEndpoint = `blogs/?${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)

  // Title page
  const siteTitle = settingsData.siteTitle || defaultSettings.title
  let titlePage = siteTitle
  let siteName = `| ${settingsData.siteName}`
  let descriptionPage = settingsData.siteDescription || defaultSettings.description
  if (postsData.status === 401) {
    titlePage = defaultSettings.serverError
    siteName = ''
    descriptionPage = ''
  }
  else if (isNaN(pageCurrent)) {
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
      type: 'website',
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

export default async function Home({params}: {params: {current: string}}) {
  const settingsData = await getData('settings/')

  /**Get 3 feature posts */
  const f_filters = `filters=featurePost[equals]true`
  const f_limitOffset = `limit=3`
  const f_postsEndpoint = `blogs/?fields=id&${f_limitOffset}&${f_filters}`
  const f_postsData = await getData(f_postsEndpoint)
  const f_articles = f_postsData.contents
  
  let filtersNotFeaturePosts = `filters=`
  f_articles.map( (data:any, i:number) => {
    if (i > 0) filtersNotFeaturePosts += '[and]'
    filtersNotFeaturePosts += 'id[not_equals]' + data.id
  })

  /** Get post without feature posts */
  const pageCurrent = Number(params.current)
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const MVpostLimit = defaultSettings.postMainVisualLimit
  const offset = (postLimit * (pageCurrent - 1)) + MVpostLimit

  const fields = defaultSettings.queryFields
  const limitOffset = `limit=${postLimit}&offset=${offset}`
  const postsEndpoint = `blogs/?${fields}&${limitOffset}&${filtersNotFeaturePosts}`
  const postsData = await getData(postsEndpoint)

  // [MICROCMS_API_KEY] not valid
  if (postsData.status === 401) {
    return <Error />
  }
  // Page not found
  else if (isNaN(pageCurrent)) {
    return <NotFound />
  }
  
  return (
    <div className={`main__wrapper page--home home--pagenum-${pageCurrent}`}>
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <PostRecent articles={postsData.contents} />
            <Pagination totalCount={postsData.totalCount} pageCurrent={pageCurrent} isRouteMV={true} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
