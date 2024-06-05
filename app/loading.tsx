export default function Loading() {
  return (
    <div className="page--common page--loading">
      <div className="author-mv">
        <div className="container">
          <div className="author-mv__inner">
            <span className="loader loader--barstripe"></span>
          </div>
        </div>
      </div>

      <div className="main__wrapper">
        <div className="main__container container">
          <div className="main__inner">
            <div className="main__content">
              <span className="loader loader--barstripe"></span>
            </div>

            <aside className="sidebar">
              <div className="sidebar__inner">
                <span className="loader loader--barstripe"></span>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  )
}