import TitleLine from '@/components/atoms/titleline'
import Post from '@/components/molecules/post'
import getData from '@/utils/getData'
import { Article } from '@/utils/postDataType'


async function PostRelated({postId}: {
  postId: string
}) {
  const endpoint = `blogs/${postId}/`
  const microData = await getData(endpoint)
  const relatedData = microData.relatedPost

  return(
    !!relatedData?.length &&
    <div className="post-related">
      <div className="post-related__header">
        <TitleLine size='small'><strong>関連記事</strong></TitleLine>
      </div>
      <div className="post-related__4col">
        { relatedData.map((itemData: Article) => Post(itemData)) }
      </div>
    </div>
  )
}

export default PostRelated