'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function Hamburger() {
  const menuActiveClass = 'is-active'
  const bodyActiveClass = 'menu-expanded--active'

  /**
   * Toggle class active menu expanded
   */
  const menuOpen = () => {
    const hamburgers = document.getElementsByClassName('hamburger')
    Array.prototype.slice.call(hamburgers).map(item => {
      item.classList.add(menuActiveClass)
    })
    document.body.classList.add(bodyActiveClass)
  }
  const menuClose = () => {
    const hamburgers = document.getElementsByClassName('hamburger')
    Array.prototype.slice.call(hamburgers).map(item => {
      item.classList.remove(menuActiveClass)
    })
    document.body.classList.remove(bodyActiveClass)
  }
  const inputSearchClose = () => {
    const toggleSearch = document.getElementById('toggle-search__btn')
    const inputSearch = document.getElementById('header__inputsearch')
    if (toggleSearch && inputSearch) {
      inputSearch.classList.contains('inputsearch--active') && toggleSearch.click()
    }
  }
  const menuToggle = () => {
    const isActive = document.body.classList.contains(bodyActiveClass)
    !isActive ? menuOpen() : menuClose()
    inputSearchClose()
  }


  /**
   * Close menu when change URL Path
   */
  const pathName = usePathname()
  useEffect(() => {
    const isActive = document.body.classList.contains(bodyActiveClass)
    isActive && menuClose()
    inputSearchClose()
  }, [pathName])

  return (
    <div className="header-hamburger">
      <button className={'hamburger hamburger--elastic'} onClick={menuToggle} type="button" title="Menu">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
        <span className="hamburger-label" data-text-normal="MENU" data-text-active="CLOSE"></span>
      </button>
    </div>
  )
}

export default Hamburger