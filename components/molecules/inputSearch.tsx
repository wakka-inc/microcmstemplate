'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useRef, useState } from 'react'

function InputSearch() {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const defaultQuery = searchParams.get('q') || ''
  const [href, setHref] = useState(`/search?q=${defaultQuery}`)

  const handleKeyup: React.KeyboardEventHandler = useCallback(
    (e) => {
      const linkCurrent = `/search?q=${inputRef.current?.value}`
      setHref(linkCurrent)

      if (e.code == 'Enter') {
        location.href = linkCurrent
      }
    }, [href]
  )

  return (  
    <div className="form-input">
      <input
        type="search"
        name="q"
        ref={inputRef}
        placeholder="検索"
        onKeyUp={handleKeyup}
        defaultValue={defaultQuery}
        />
      <div className="btn-icon">
        <Link href={href} aria-label="search">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="black">
            <g>
              <path d="M16.5 16.5L10.7585 10.7267M12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5Z" strokeLinecap ="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default InputSearch