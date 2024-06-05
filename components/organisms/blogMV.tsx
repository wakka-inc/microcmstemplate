import Post from '@/components/molecules/post'
import getData from '@/utils/getData'
import { Article } from '@/utils/postDataType'
import { defaultSettings } from '@/contants/defaultSettings'


async function BlogMV() {
  const fields = defaultSettings.queryFields
  const limitOffset = `limit=3`
  const postsEndpoint = `blogs/?${fields}&${limitOffset}`
  const postsData = await getData(postsEndpoint)
  const articles = postsData.contents

  return(
    <>
      { !!articles && articles.length &&
        <div className="blog-mv">
            <div className="blog-mv__3col">
              { articles.map((article: Article) => Post(article, true)) }
            </div>
        </div>
      }
    </>
  )
}

export default BlogMV