import BlogMV from '@/components/organisms/blogMV'
import Sidebar from '@/components/organisms/sidebar'
import PostRecent from '@/components/organisms/postRecent'
import Pagination from '@/components/molecules/pagination'
import { defaultSettings } from '@/contants/defaultSettings'
import getData from '@/utils/getData'
import Error from '@/app/error'
import defaultImagePreview from '@/public/images/image-preview.png'


/** Dymanic Metadata */
export async function generateMetadata() {
  const settingsData = await getData('settings/')
  const title = settingsData.siteTitle || defaultSettings.title
  const description = settingsData.siteDescription || defaultSettings.description
  const sitePreviews = settingsData.sitePreview ? [settingsData.sitePreview] : [{url: defaultImagePreview.src}]
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      images: [...sitePreviews],
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


export default async function Page() {
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
  const fields = defaultSettings.queryFields
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const MVpostLimit = defaultSettings.postMainVisualLimit
  const limitOffset = `limit=${postLimit}&offset=${MVpostLimit}`
  const postsEndpoint = `blogs/?${fields}&${limitOffset}&${filtersNotFeaturePosts}`
  const postsData = await getData(postsEndpoint)

  // [MICROCMS_API_KEY] not valid
  if (postsData.status === 401) {
    return <Error />
  }
  
  return (
    <div className="main__wrapper page--home">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <BlogMV />
            <PostRecent title='新着記事' articles={postsData.contents} />
            <Pagination totalCount={postsData.totalCount} pageCurrent={1} isRouteMV={true} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
