import Social from '@/components/molecules/social'
import FooterMenu from '@/components/molecules/footerMenu'
import DrawLineCanvas from '@/utils/drawLineCanvas'
import getData from '@/utils/getData'
import { defaultSettings } from '@/contants/defaultSettings'
import Logo from '@/components/molecules/logo'
import defaultLogo from '@/public/images/logo-mag-white.svg'


async function Footer() {
  const drawlineOption = {
    stroke: 'rgba(255,255,255,.2)',
    duration: 6000
  }

  const settingsData = await getData('settings/')
  const logoFooter = settingsData.logoFooter
  const social = settingsData.social
  const logoAlt = settingsData.siteName || defaultSettings.siteName
  const copyright = settingsData.copyright || ''
  
  return (
    (!!logoFooter || !!social || !!copyright) &&
    <footer id="footer" className="footer">
      <DrawLineCanvas id="drawline-footer" option={drawlineOption} />

      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <div className="logo">
              { logoFooter && <Logo logo={logoFooter} alt={logoAlt} /> }
            </div>
          </div>
          <div className="footer__main">
            { social && <Social list={social} size="large" color="white" /> }
            <FooterMenu />
          </div>
          <div className="footer__copyright">{copyright}</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer