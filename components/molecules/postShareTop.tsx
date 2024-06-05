'use client'
import Social from '@/components/molecules/social'
import { useEffect, useState } from 'react'

type TSocial = {
  type: string,
  name: string[],
  link: string,
}

export default function PostShareTop({ socialShares } : { socialShares: string[] }) {
  
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
    <div className="article__sharetop">
      <Social list={socialList} />
    </div>
  )
}