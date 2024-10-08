async function getData(endpoint: string) {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`
  const requestHeaders: HeadersInit = new Headers()
  requestHeaders.set('X-MICROCMS-API-KEY', process.env.MICROCMS_API_KEY || '')

  // Fetch data
  const revalidate = process.env.DATA_REVALIDATE
  const res = await fetch(url, {
    headers: requestHeaders,
    next: {
      revalidate: (revalidate != 'false') ? Number(revalidate) : false
    }
  })

  // Page not found for route /url_page
  if (res.status === 404 || res.status === 401) {
    return res
  }

  // Check fetch data
  // [settings] / [sidebar] / [menus] API not setup, will return empty object {} --> No error occurred.
  // If [MICROCMS_SERVICE_DOMAIN] incorrect --> in this case
  if (endpoint == 'settings/'
   || endpoint == 'sidebar/'
   || endpoint == 'menus/'
   || /^blogs.+/i.test(endpoint) ) {
    if (!res.ok) {
      return {}
    }
  }

  // Redirect to 500 page
  if (!res.ok) {
    console.log('##Fail to fetch data -----', 'Endpoint: ' + endpoint)
    throw new Error('##Fail to fetch data ----- Endpoint: ' + endpoint)
  }
  return res.json()
}

export default getData