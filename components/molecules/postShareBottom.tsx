'use client'
import Social from '@/components/molecules/social'
import { useEffect, useState } from 'react'

type TSocial = {
  type: string,
  name: string[],
  link: string,
}

function PostShareBottom({ socialShares }: { socialShares: string[] }) {
  const [socialList, setSocialList] = useState([] as TSocial[])
  useEffect(() => {
    const list = socialShares.map(name => {
      return {
        type: 'share',
        name: [name],
        link: window?.location?.href,
      }
    })
    setSocialList(list)
  }, [])

  return (
    !!socialList?.length &&
    <div className="sharebottom">
      <div className="sharebottom__header">
        <div className="sharebottom__title">
          <i className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="black">
              <path d="M4.49989 0.610666C10.7546 11.5438 15.5 20.4475 15.5 21.2382C15.5 21.9467 4.06656 6.57667 1.16378 2.66303C0.808537 2.18408 0.951431 1.50545 1.46733 1.20638L3.131 0.241929C3.61031 -0.0359318 4.22477 0.129774 4.49989 0.610666Z" />
            </svg>
          </i>
          <span>SNSでシェア</span>
          <i className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="black">
              <path d="M11.5001 0.610666C5.24541 11.5438 0.5 20.4475 0.5 21.2382C0.5 21.9467 11.9334 6.57667 14.8362 2.66303C15.1915 2.18408 15.0486 1.50545 14.5327 1.20638L12.869 0.241929C12.3897 -0.0359318 11.7752 0.129774 11.5001 0.610666Z" />
            </svg>
          </i>
        </div>
      </div>
      <div className="sharebottom__list">
        <Social size="large" list={socialList} />
      </div>
    </div>
  )
}

export default PostShareBottom