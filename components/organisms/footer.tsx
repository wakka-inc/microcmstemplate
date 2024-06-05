import Social from '@/components/molecules/social'
import FooterMenu from '@/components/molecules/footerMenu'
import DrawLineCanvas from '@/utils/drawLineCanvas'
import getData from '@/utils/getData'
import Logo from '@/components/molecules/logo'


async function Footer() {
  const drawlineOption = {
    stroke: 'rgba(255,255,255,.2)',
    duration: 6000
  }

  const settingsData = await getData('settings/')
  const logoFooter = settingsData.logoFooter
  const copyright = settingsData.copyright || ''
  
  return (
    <footer id="footer" className="footer">
      <DrawLineCanvas id="drawline-footer" option={drawlineOption} />

      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <div className="logo">
              { !!logoFooter && <Logo logo={logoFooter} alt={settingsData.siteName} /> }
            </div>
          </div>
          <div className="footer__main">
            { settingsData.social && <Social list={settingsData.social} size="large" color="white" /> }
            <FooterMenu />
          </div>
          <div className="footer__copyright">{copyright}</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer