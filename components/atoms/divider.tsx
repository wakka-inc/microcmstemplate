type TypeProps = {
  type?: string,
  className?: string,
}

function Divider(props: TypeProps) {
  // Default Value
  const {
    className = '',
    type = 'none',
  } = {...props}

  const typeClass = 'divider--' + type
  const allClass = `divider ${typeClass} ${className}`

  return(
    <div className={allClass}></div>
  )
}

export default Divider