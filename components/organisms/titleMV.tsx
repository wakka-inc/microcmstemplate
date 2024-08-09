function TitleMV({title, description}: {
  title: string,
  description?: string,
}) {
  return (
    <div className="title-mv">
      <div className="title-mv__deco">
        <span className="title-mv__deco__text">{title}</span>
      </div>
      <div className="container">
        <h1 className="title-mv__h1">{title}</h1>
        { description && <p className="title-mv__desc">{description}</p> }
      </div>
    </div>
  )
}

export default TitleMV