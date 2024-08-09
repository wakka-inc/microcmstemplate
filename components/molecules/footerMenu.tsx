import Link from 'next/link'
import getData from '@/utils/getData'
import { Button } from '@/utils/postDataType'


async function FooterMenu() {
  const menusData = await getData('menus/')
  const menusFooter = menusData.menuOnFooter

  return(
    <>
      { menusFooter &&
      <div className="footer-menu">
        <ul className="footer-menu__list">
          { menusFooter.map((link: Button, index: number) =>
            <li className="footer-menu__item" key={index}>
              <Link href={link.href} target={link.openNewTab ? '_blank' : undefined}>{link.name}</Link>
            </li>
          )}
        </ul>
      </div>
      }
    </>
  )
}

export default FooterMenu