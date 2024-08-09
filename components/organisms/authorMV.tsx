import Image from 'next/image'
import Social from '@/components/molecules/social'
import getData from '@/utils/getData'
import { Article, Contributed } from '@/utils/postDataType'

import avatar from '@/public/images/avatar-1.png'


async function AuthorMV({authorId, draftKey}: {
  authorId: string,
  draftKey: string,
}) {
  const socialList = [
    {
      name: 'x',
      url: '#',
    },
    {
      name: 'facebook',
      url: '#',
    },
  ]

  /** Get data */
  const endpoint = `people/${authorId}${draftKey ? ('?draftKey=' + draftKey) : ''}`
  const peopleData: Contributed = await getData(endpoint)
  const postData = await getData(`blogs/?fields=id&filters=contributed[contains]${authorId}`)

  return (
    <div className="author-mv">
      <div className="container">
        <div className="author-mv__inner">
          <div className="author-mv__left">

            { peopleData.avatar &&
              <div className="author-mv__avatar">
                <div className="author-mv__avatar__img">
                  <Image
                    src={peopleData.avatar.url}
                    width={200}
                    height={200}
                    alt={peopleData.name}
                    style={{width: '100%', height: 'auto'}}
                    />
                </div>
              </div>
            }

            <div className="author-mv__text">
              { peopleData.name &&
                <div className="author-mv__name">{peopleData.name}</div>
              }
              { peopleData.description &&
                <div className="author-mv__bio" dangerouslySetInnerHTML={{__html: peopleData.description}}></div>
              }
            </div>
          </div>
          <div className="author-mv__right">
            <div className="author-mv__info">
            { postData.totalCount &&
              <div className="author-mv__info__item">
                <i className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="black" >
                    <path d="M15 12.7611L14.2221 13.612C13.8096 14.0632 13.2501 14.3166 12.6668 14.3166C12.0834 14.3166 11.524 14.0632 11.1114 13.612C10.6983 13.1617 10.1389 12.9089 9.55571 12.9089C8.97253 12.9089 8.41312 13.1617 7.99999 13.612M1 14.3166H2.30242C2.6829 14.3166 2.87314 14.3166 3.05216 14.2736C3.21089 14.2355 3.36262 14.1727 3.5018 14.0874C3.65878 13.9912 3.7933 13.8567 4.06234 13.5876L13.8334 3.81659C14.4777 3.17225 14.4777 2.12758 13.8334 1.48325C13.189 0.838917 12.1444 0.838917 11.5 1.48325L1.72898 11.2543C1.45994 11.5233 1.32543 11.6578 1.22923 11.8148C1.14394 11.954 1.08109 12.1057 1.04298 12.2645C1 12.4435 1 12.6337 1 13.0142V14.3166Z" strokeLinecap ="round" strokeLinejoin="round"/>
                  </svg>
                </i>
                <span>記事数: {postData.totalCount}</span>
              </div>
              }

              { peopleData.email &&
                <div className="author-mv__info__item">
                    <i className="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="black" >
                        <path d="M10.8 5.20005V8.70005C10.8 9.257 11.0213 9.79115 11.4151 10.185C11.8089 10.5788 12.343 10.8 12.9 10.8C13.457 10.8 13.9911 10.5788 14.3849 10.185C14.7788 9.79115 15 9.257 15 8.70005V8.00005C14.9999 6.42017 14.4654 4.88679 13.4833 3.64922C12.5012 2.41166 11.1294 1.54271 9.59085 1.18366C8.05231 0.824613 6.43756 0.996583 5.00915 1.67161C3.58074 2.34664 2.42268 3.48502 1.72329 4.90166C1.02389 6.31829 0.824283 7.92987 1.15692 9.47433C1.48956 11.0188 2.33489 12.4053 3.55545 13.4084C4.776 14.4116 6.30001 14.9723 7.87965 14.9995C9.4593 15.0266 11.0017 14.5186 12.256 13.558M10.8 8.00005C10.8 9.54645 9.5464 10.8 8 10.8C6.45361 10.8 5.20001 9.54645 5.20001 8.00005C5.20001 6.45365 6.45361 5.20005 8 5.20005C9.5464 5.20005 10.8 6.45365 10.8 8.00005Z" strokeLinecap ="round" strokeLinejoin="round"/>
                      </svg>
                    </i>
                    <span>Eメール: {peopleData.email}</span>
                </div>
              }
            </div>
            <div className="author-mv__social">
              <Social list={peopleData.socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorMV