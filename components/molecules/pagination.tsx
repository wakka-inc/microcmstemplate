import Link from 'next/link'
import { defaultSettings } from '@/contants/defaultSettings'
import getData from '@/utils/getData'

type Props = {
  totalCount: number,
  pageCurrent?: number,
  basePath?: string,
  q?: string,
  isRouteMV?: boolean,
}

async function Pagination({ totalCount = 0, pageCurrent = 1, basePath = '', q, isRouteMV = false }: Props) {
  const settingsData = await getData('settings/')
  const postLimit = settingsData.postLimit || defaultSettings.postLimit
  const MVpostLimit = isRouteMV ? defaultSettings.postMainVisualLimit : 0
  const pagesCount = Math.ceil((totalCount - MVpostLimit) / postLimit)
  const pages = Array.from({ length: pagesCount }).map((_, i) => i + 1)
  const pagesFirstLast = ['first', ...pages, 'last']

  function RenderItem(page: number|string) {

    /** CASE: first page */
    if (page.toString() == 'first') {
      if (pageCurrent != 1) {
        const pageLink = `${basePath}` + ((page.toString() == 'first') ? `/page/${pageCurrent-1}` : '') + (q ? `?q=${q}` : '')
        return (
          <li className={`pagination__item pagination__item__first`} key={page}>
            <Link href={pageLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="black">
                <path d="M5 1L1 5L5 9" strokeLinecap ="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </li>
        )
      }
    }
    /** CASE: last page */
    else if (page.toString() == 'last') {
      if (pageCurrent != pagesCount) {
        const pageLink = `${basePath}/page/${pageCurrent+1}` + (q ? `?q=${q}` : '')
        return (
          <li className={`pagination__item pagination__item__last`} key={page}>
            <Link href={pageLink}>
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none" stroke="black">
                <path d="M1 9L5 5L1 1" strokeLinecap ="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </li>
        )
      }
    }
    /** CASE: other page the current */
    else if (pageCurrent != page) {
      let pageLink = `${basePath}` + ((page != 1) ? `/page/${page}` : '') + (q ? `?q=${q}` : '')
      if (!pageLink) pageLink = '/'

      return (
        <li className={`pagination__item`} key={page}>
          <Link href={pageLink}>{page}</Link>
        </li>
      )
    }
    /** CASE: current page */
    else {
      return (
        <li className={`pagination__item pagination--active`} key={page}>
          <span>{page}</span>
        </li>
      )
    }
  }

  return (
    (pagesCount > 0) &&
    <div className={`pagination pagination--count-${pagesCount}`}>
      <ul className="pagination__list">
        { pagesFirstLast.map(page => RenderItem(page) )}
      </ul>
    </div>
  )
}

export default Pagination