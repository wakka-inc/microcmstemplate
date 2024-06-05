import Link from "next/link"

function Btn({ children, href = '#', _blank = false, type = 'border', size = 'normal' }: {
  children: React.ReactNode,
  href: string,
  _blank?: boolean,
  type?: string,
  size?: string,
}) {
  const typeClass = type ? (' btn--' + type) : '' 
  const sizeClass = size ? (' btn--' + size) : ''
  const linkTarget = _blank ? '_blank' : undefined
  return(
    <div className={'btn' + typeClass + sizeClass}>
      <Link href={href} target={linkTarget} className="btn__link">{children}</Link>
    </div>
  )
}

export default Btn