function TitleLine({children, size}: {
  children: React.ReactNode,
  size?: string
}) {
  const sizeClass = size ? ' titleline--' + size : ''
  return(
    <div className={'titleline' + sizeClass}>
      {children}
    </div>
  )
}

export default TitleLine