import Btn from '@/components/atoms/btn'
import TitleLine from '@/components/atoms/titleline'
import getData from '@/utils/getData'
import { InquiriesType } from '@/utils/postDataType'


async function Inquiries() {
  
  /** Get data */
  const settingsData = await getData('settings/')
  const inquiries: InquiriesType = settingsData.footerInquiries || {}

  return(
    !!inquiries?.isShow &&
    <div className="inquiries">
      <div className="inquiries__container container">
        <div className="inquiries__inner">
          { !!inquiries?.title &&
            <div className="inquiries__title">
              <TitleLine>{inquiries.title}</TitleLine>
            </div>
          }

          { !!inquiries?.description &&
            <div className="inquiries__text">
              <p dangerouslySetInnerHTML={{__html: inquiries.description}}></p>
            </div>
          }

          { !!inquiries?.buttons?.length &&
            <div className="inquiries__btns">
              { inquiries.buttons.map((btn, index) =>
                <Btn href={btn.href} _blank={btn.openNewTab} size="large" key={btn.name}>
                  { btn.icon && <i className="icon" dangerouslySetInnerHTML={{__html: btn.icon}}></i> }
                  { btn.name && <span>{btn.name}</span> }
                </Btn>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Inquiries