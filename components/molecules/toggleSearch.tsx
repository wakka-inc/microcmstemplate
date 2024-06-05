'use client'
import { useState } from 'react'

function ToggleSearch() {
  const classActive = 'inputsearch--active'
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    const $inputSearch = document.getElementById('header__inputsearch')
    if (toggle) {
      $inputSearch?.classList.remove(classActive)
    }
    else {
      $inputSearch?.classList.add(classActive)
    }
    setToggle(!toggle)
  }

  return (
    <div className={`toggle-search ${toggle ? classActive : ''}`}>
      <div className="btn-icon">
        <button id="toggle-search__btn" onClick={handleToggle}>
          <span className="icon__1">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="black">
              <g>
                <path d="M16.5 16.5L10.7585 10.7267M12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5Z" strokeLinecap ="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </span>
          <span className="icon__2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15 1L1 15M1 1L15 15" stroke="white" strokeLinecap ="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default ToggleSearch