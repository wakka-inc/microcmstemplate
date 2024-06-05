'use client'

import { useEffect, useState } from 'react'
import scrolltoAnchor from '@/utils/scrollToAnchor'

type Heading = {
  id: string,
  tag: string,
  text: string,
}

/** Readner Heading Item */
function HeadingItem(item: Heading, index: number) {
  return (
    <div
      data-href={`#${item.id}`}
      className={`article-index__${item.tag.toLowerCase()}`}
      key={index}
      onClick={scrolltoAnchor}
      >{item.text}</div>
  )
}


/** Main code */
function ArticleIndex() {
  const [heading, setHeading] = useState<Heading[]>([])
  const [hidden, setHidden] = useState('')
  const [toggle, setToggle] = useState(true)
  let index = 1

  const handleToggle = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    const search = document.querySelectorAll<HTMLElement>('.article__content h1, .article__content h2')
    let items: Heading[] = []

    search.forEach(item => {
      const headingID = item.getAttribute('id')
      const itemId = item.getAttribute('id')
      let indexId = itemId
      if (!indexId) {
        indexId = `{index++}`
        item.setAttribute('id', `article-heading-${indexId}`)
      }

      items.push({
        id: indexId,
        tag: item.tagName,
        text: item.innerText,
      })
    })

    /** Hidden ArticleIndex if no Heading tag */
    if (items.length == 0) {
      setHidden('article-index--hidden')
    }
    else {
      setHeading(items)
    }
  }, [1])
  
  return (
    <div className={`article-index ${hidden} ${"article-index--" + toggle}`}>
      <div className="article-index__header">
        <button className="article-index__btn" onClick={handleToggle}>
          <span>目次</span>
          <i className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="black" >
              <path d="M15 12L9 6L3 12" strokeLinecap ="round" strokeLinejoin="round"/>
            </svg>
          </i>
        </button>
      </div>
      <div className="article-index__main">
        { heading.map((item, index) => HeadingItem(item, index)) }
      </div>
    </div>
  )
}

export default ArticleIndex