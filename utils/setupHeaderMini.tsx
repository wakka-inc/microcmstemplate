'use client'

import { useEffect } from 'react'

function SetupHeaderMini() {
  const headerMiniClass = 'header-mini--active'

  function ToggleScrollActive() {
    const header = document.querySelector('.header') as Element
    const body = document.body

    const scrollY = window.scrollY
    const distance = header.clientHeight + 30

    /** Toggle class HeaderMiniActive */
    if (scrollY > distance) {
      body.classList.add(headerMiniClass)
    }
    else {
      body.classList.remove(headerMiniClass)
    }
  }

  useEffect(() => {
    ToggleScrollActive() // Setup at loaded page.
    document.addEventListener('scroll', ToggleScrollActive)
  }, [])

  return (
    <></>
  )
}

export default SetupHeaderMini