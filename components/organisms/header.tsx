import Btn from '@/components/atoms/btn'
import Hamburger from '@/components/molecules/hamburger'
import Logo from '@/components/molecules/logo'
import DrawLineCanvas from '@/utils/drawLineCanvas'
import SetupHeaderMini from '@/utils/setupHeaderMini'
import getData from '@/utils/getData'
import { Button } from '@/utils/postDataType'
import InputSearch from '@/components/molecules/inputSearch'
import ToggleSearch from '../molecules/toggleSearch'
import { defaultSettings } from '@/contants/defaultSettings'
import defaultLogo from '@/public/images/logo-mag.svg'


function RenderButton(btn: Button, index: string) {
  const type = btn.type ? (btn.type[0] ? btn.type[0] : '') : ''
  return (
    btn.name &&
      <Btn href={btn.href} _blank={btn.openNewTab} type={type} key={btn.name}>
        { btn.icon && <i className="icon" dangerouslySetInnerHTML={{__html: btn.icon}}></i> }
        <span>{btn.name}</span>
      </Btn>
  )
}

async function Header() {
  /** Variables */
  const drawlineOption = {
    stroke: 'rgba(0,0,0,.2)',
    chieucaoToithieu: 20,
    chieucaoToida: 50,
    duration: 4000,
  }

  /** Get data */
  const settingsEndpoint = 'settings/'
  const settingsData = await getData(settingsEndpoint)

  const menusEndpoint = 'menus/'
  const menusData = await getData(menusEndpoint)
  const menuMain = menusData.menuMain
  const menuOther = menusData.menuOther
  const menuOnHeader = menusData.menuOnHeader
  const logoHeader = settingsData.logoHeader
  
  return (
    (!!logoHeader || !!menuMain?.length || !!menuOther?.length || !!menuOnHeader?.length) &&
    <header id="header" className="header">
      <SetupHeaderMini />
      <DrawLineCanvas id="drawline-header" option={drawlineOption} />
      
      <div className="header__container">
        <div className="header__inner">
          <div className="header__left">
            { (!!menuMain?.length || !!menuOther?.length) && <Hamburger /> }
          </div>
          <div className="header__center">
            { !!logoHeader && <Logo logo={logoHeader} alt={settingsData.siteName || defaultSettings.siteName} /> }
          </div>
          <div className="header__right">
            { !!menuOnHeader?.length &&
              <div className="btn-group">
                { menuOnHeader.map((btn: Button, index: string) => RenderButton(btn, index)) }
              </div>
            }
            
            <ToggleSearch />
          </div>
        </div>
      </div>

      <div id="header__inputsearch" className="header__inputsearch">
        <InputSearch />
      </div>
    </header>
  )
}

export default Header