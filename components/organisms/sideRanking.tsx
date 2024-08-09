import getData from '@/utils/getData'
import Post from '@/components/molecules/post'
import { Article } from '@/utils/postDataType'

async function SideRanking() {
  const endpointSidebar = 'sidebar/'
  const sidebarData = await getData(endpointSidebar)
  const rankingData = sidebarData.postRanking

  return (
    rankingData &&
    <div className="sideranking">
      <div className="sideranking__header">
        <div className="title">RANKING</div>
      </div>
      <div className="sideranking__main">
        <div className="sideranking__list">
          { rankingData.map((itemData: Article) => Post(itemData)) }
        </div>
      </div>
    </div>
  )
}

export default SideRanking