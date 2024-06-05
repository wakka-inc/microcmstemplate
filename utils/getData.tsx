import { redirect } from 'next/navigation'
import { ReadableStreamDefaultReader } from 'stream/web'

async function getData(endpoint: string) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const url = `${serviceDomain}${endpoint}`
  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('X-MICROCMS-API-KEY', process.env.MICROCMS_API_KEY || '')

  // Fetch data
  // console.log('##Fetch begin -----', endpoint)
  const revalidate = process.env.DATA_REVALIDATE
  const res = await fetch(url, {
    headers: requestHeaders,
    next: {
      revalidate: (revalidate != 'false') ? Number(revalidate) : false
    }
  })

  // Check fetch data
  // Redirect to 500 page`
  if (!res.ok) {
    console.log('##Fail to fetch data -----', 'Endpoint: ' + endpoint)
    throw new Error('##Fail to fetch data ----- Endpoint: ' + endpoint)
  }
  return res.json()
}

export default getData