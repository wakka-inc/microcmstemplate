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
    current: string,
  }
}

/** MetaData */
export async function generateMetadata({params}: Props, parent: ResolvingMetadata) {
  const parentData = await(parent)
  const settingsData = await getData('settings/')
  const tagEndpoint = `tag/${params.slug}/`
  const tagData = await getData(tagEndpoint)
  
  const title = `《${tagData.name}》タグ一覧 | ${settingsData.siteName}`
  const previousPreview = parentData.openGraph?.images || []

  return {
    title: title,
    description: `《${tagData.name}》タグの記事一覧ページです。`,
    openGraph: {
      title: title,
      images: [...previousPreview],
      type: 'article',
    }
  }
}

async function TagPage({params}: Props) {

  /** Get data */
  const settingsData = await getData('settings/')
  const endpoint = `tag/${params.slug}/`
  const microData = await getData(endpoint)
  
  const tagName = microData.name
  const tagId = microData.id
  const fields = defaultSettings.queryFields
  const postLimit = settingsData.postLimit || defaultSettings.postLimit

  const pageCurrent = Number(params.current)
  const offset = postLimit * (pageCurrent - 1)
  const limitOffset = `limit=${postLimit}&offset=${offset}`
  const filters = `filters=tags[contains]${tagId}`
  const postsEndpoint = `blogs?${filters}&${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)
  
  return (
    <>
      <TitleMV title={tagName} />
      <div className="main__wrapper page--tag">
        <div className="main__container container">
          <div className="main__inner">
            <div className="main__content">
              <PostRecent articles={postsData.contents} />
              <Pagination totalCount={postsData.totalCount} basePath={`/tag/${params.slug}/`} pageCurrent={pageCurrent} />
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  )
}


export default TagPage