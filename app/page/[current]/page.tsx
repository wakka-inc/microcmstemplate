import Sidebar from '@/components/organisms/sidebar'
import PostRecent from '@/components/organisms/postRecent'
import Pagination from '@/components/molecules/pagination'
import { defaultSettings } from '@/contants/defaultSettings'
import getData from '@/utils/getData'
import defaultImagePreview from '@/public/images/image-preview.png'

/** Dymanic Metadata */
export async function generateMetadata() {
  const settingsData = await getData('settings/')
  const title = settingsData.siteTitle || defaultSettings.title
  const description = settingsData.siteDescription || defaultSettings.description
  const sitePreviews = settingsData.sitePreview || {url: defaultImagePreview.src}
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      images: [sitePreviews],
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

  const pageCurrent = Number(params.current)
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const MVpostLimit = defaultSettings.postMainVisualLimit
  const offset = (postLimit * (pageCurrent - 1)) + MVpostLimit

  const fields = defaultSettings.queryFields
  const limitOffset = `limit=${postLimit}&offset=${offset}`
  const postsEndpoint = `blogs/?${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)
  
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
