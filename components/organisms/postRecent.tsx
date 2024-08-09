import TitleLine from '@/components/atoms/titleline'
import Post from '@/components/molecules/post'
import NoPost from '@/components/atoms/nopost'
import { Article } from '@/utils/postDataType'


function PostRecent({title, articles}: {
  title?: string,
  articles: Article[],
}) {

  return (
    <div className="postrecent">

      { /** Title */
        title && 
        <div className="postrecent__header">
          <TitleLine>{title}</TitleLine>
        </div>
      }

      { /** Post Recent */
        articles && articles.length ?
        <div className="postrecent__list">
          { articles.map((article: Article) => Post(article)) }
        </div>
      :
        <NoPost />
      }
    </div>
  )
}

export default PostRecent