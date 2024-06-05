export default function Loading() {
  return (
    <div className="main__wrapper page--article page--loading">
      <div className="main__container container">
        <div className="main__inner">
          <div className="main__content">
            <article className="article">
              <div className="article__mv">
                <span className="loader loader--barstripe"></span>
              </div>
            </article>
          </div>
          
          <aside className="sidebar">
            <div className="sidebar__inner">
              <span className="loader loader--barstripe"></span>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}