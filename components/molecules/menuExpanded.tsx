import Link from 'next/link'
import Social from '@/components/molecules/social'
import Divider from '@/components/atoms/divider'
import getData from '@/utils/getData'
import { Button } from '@/utils/postDataType'

type Link = {
  name: string,
  href: string
}

async function MenuExpanded() {
  const endpointSettings = 'settings/'
  const settingsData = await getData(endpointSettings)

  const endpointMenus = 'menus/'
  const menusData = await getData(endpointMenus)
  const menuMain = menusData.menuMain
  const menuOther = menusData.menuOther
  const social = settingsData.social
  
  return(
    <div className={'menu-expanded'}>
      <div className="menu-expanded__body">
        <div className="menu-expanded__main">
          <div className="container">
            <div className="menu-expanded__main__inner">
              <div className="menu-expaned__left">
                { menuMain?.length && 
                  <ul className='menu-expanded__list menu-expanded--main'>
                    { menuMain.map((link: Button, index: number) => 
                      <li key={index} className='menu-expanded__link'>
                        <Link href={link.href} target={link.openNewTab ? '_blank' : undefined}>{link.name}</Link>
                      </li>
                    )}
                  </ul>
                }
              </div>

              <Divider type={'slash'} className={'sp'} />

              <div className="menu-expaned__right">
                { menuOther?.length && 
                  <ul className='menu-expanded__list menu-expanded--other'>
                    { menuOther.map((link: Button, index: number) => 
                      <li key={index} className='menu-expanded__link'>
                        <Link href={link.href} target={link.openNewTab ? '_blank' : undefined}>{link.name}</Link>
                      </li>
                    )}
                  </ul>
                }
              </div>
            </div>
          </div>
        </div>

        { social?.length &&
          <div className="menu-expanded__footer">
            <div className="container">
              <div className="menu-expanded__footer__inner">
                <Social list={social} size='xlarge' />
              </div>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default MenuExpanded