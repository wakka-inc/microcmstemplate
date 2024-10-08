import ArticleDetail from '@/components/organisms/articleDetail'
import AuthorContributed from '@/components/organisms/authorContributed'
import PostRelated from '@/components/organisms/postRelated'
import Sidebar from '@/components/organisms/sidebar'
import { ResolvingMetadata } from 'next'
import getData from '@/utils/getData'
import NotFound from '@/app/not-found'
import Error from '@/app/error'
import { defaultSettings } from '@/contants/defaultSettings'

type Props = {
  params: {
    pid: string
  },
  searchParams: {
    draftKey: string,
  }
}

/** MetaData */
export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata) {
  const settingsData = await getData('settings/')
  const parentData = await(parent)
  const postEndpoint = `blogs/${params.pid}/`
  const postData = await getData(postEndpoint)
  
  const description = `${postData.description || ''}`
  const previousPreview = parentData.openGraph?.images || []
  const sitePreviews = postData.thumbnail ? [postData.thumbnail] : previousPreview
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

  // Title page
  let titlePage = postData.title
  let siteName = `| ${settingsData.siteName}`
  if (postData.status === 401) {
    titlePage = defaultSettings.serverError
    siteName = ''
  }
  else if (postData.status === 404) {
    titlePage = defaultSettings.pageNotFound
  }
  const title = `${titlePage} ${siteName}`

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      images: [...sitePreviews],
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

export default async function ArticlePage({params, searchParams}: Props) {
  const postEndpoint = `blogs/${params.pid}/`
  const postData = await getData(postEndpoint)

  // [MICROCMS_API_KEY] not valid
  if (postData.status === 401) {
    return <Error />
  }
  // Page not found
  else if (postData.status === 404) {
    return <NotFound />
  }

  return (
    <div className="main__wrapper page--article">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <ArticleDetail postId={params.pid} draftKey={searchParams.draftKey} />
            <AuthorContributed postId={params.pid} />
            <PostRelated postId={params.pid} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}
