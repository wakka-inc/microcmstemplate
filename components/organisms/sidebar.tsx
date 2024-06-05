import SideAds from '@/components/molecules/sideAds'
import InputSearch from '@/components/molecules/inputSearch'
import SideRanking from './sideRanking'
import Divider from '@/components/atoms/divider'
import getData from '@/utils/getData'
import { Adsvertisment } from '@/utils/postDataType'


async function Sidebar() {
  const endpointSidebar = 'sidebar/'
  const sidebarData = await getData(endpointSidebar)
  const adsTop: Adsvertisment[] = sidebarData.adsTop
  const adsBottom: Adsvertisment[] = sidebarData.adsBottom

  return (
    <aside className="sidebar">
      <div className="sidebar__ads sidebar--top">
        <SideAds listAds={adsTop} isPriority={false} />
      </div>
      
      <div className="sidebar__inputsearch">
        <InputSearch />
      </div>
      <SideRanking />
      <Divider className="pc" />
      <div className="sidebar__ads sidebar--bottom">
        <SideAds listAds={adsBottom} />
      </div>
    </aside>
  )
}

export default Sidebar