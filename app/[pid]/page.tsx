import ArticleDetail from '@/components/organisms/articleDetail'
import AuthorContributed from '@/components/organisms/authorContributed'
import PostRelated from '@/components/organisms/postRelated'
import Sidebar from '@/components/organisms/sidebar'
import { ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import getData from '@/utils/getData'

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
  const title = `${postData.title} | ${settingsData.siteName}`
  const description = `${postData.description || ''}`
  const previousPreview = parentData.openGraph?.images || []
  const sitePreviews = postData.thumbnail ? [postData.thumbnail] : previousPreview
  const favicon = settingsData.favicon
  const faviconUrl = favicon ? favicon.url : '/images/favicon.ico'

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


export default function ArticlePage({params, searchParams}: Props) {
  
  /** Redirect to Home page */
  const routesToHome = ['category', 'tag', 'author']
  if (routesToHome.includes(params.pid)) {
    redirect('/')
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
