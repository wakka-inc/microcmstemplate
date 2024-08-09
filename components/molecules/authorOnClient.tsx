'use client'

import { Contributed } from '@/utils/postDataType'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from "react"

function AuthorOnClient({authorId, formatDate, apiKey, serviceDomain}: {
  authorId: string,
  formatDate: string,
  apiKey?: string,
  serviceDomain?: string
}) {
  
  const endpoint = `people/${authorId}/`
  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`

  const [author, setAuthor] = useState<Contributed>()
  const [authorLink, setAuthorLink] = useState('')
  useEffect(() => {
    try {
      fetch(url, {
        mode: 'cors',
        headers: new Headers({
          'X-MICROCMS-API-KEY': apiKey || ''
        })
      })
        .then((res) => res.json())
        .then((data: Contributed) => {
          setAuthor(data)
          setAuthorLink(`/author/${data.id}`)
        })
    }
    catch (error: any) {
      console.error(`Download error: ${error && error.message}`)
    }
  }, [])

  return (
    author &&
    <div className="postitem__author">
      { author.avatar &&
        <Link href={authorLink} className="postitem__author__avatar">
          <Image
            src={author.avatar.url}
            alt={author.name}
            width={32}
            height={32}
            style={{width: '100%', height: 'auto'}}
          />
        </Link>
      }
      <div className="postitem__author__info">
        <Link href={authorLink} className="postitem__author__name">{author.name}</Link>
        <span className="postitem__author__name__divider">/</span>
        <span className="postitem__author__date">{formatDate}</span>
      </div>
    </div>
  )
}

export default AuthorOnClient