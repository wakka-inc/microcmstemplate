import Link from "next/link"

function BtnIcon({children, href}: {
  children: React.ReactNode,
  href: string
}) {
  return (
    <div className="btn-icon">
      <Link
        href={href}
      >{children}</Link>
    </div>
  )
}

export default BtnIcon