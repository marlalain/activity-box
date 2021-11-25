import querystring from 'querystring'
import fetch from 'isomorphic-unfetch'

export function DevTo(username, api_key) {
  this.username = username
  this.api_key = api_key
  this.data = []
  console.debug('Initialized DevTo class')

  this.getConstants = () => {
    const DEV_TO_PUBLISHED_ARTICLES_ENDPOINT =
      'https://dev.to/api/articles/me/published'

    const headers = {
      'Content-Type': 'application/json',
      api_key: this.api_key,
    }

    const params = querystring.stringify({
      username: this.username,
      page: 1,
    })

    const config = {
      method: 'GET',
      headers: headers,
    }

    const url = `${DEV_TO_PUBLISHED_ARTICLES_ENDPOINT}?${params}`

    console.debug('Got constants')
    return { config, url }
  }

  this.getArticles = () => {
    const { config, url } = this.getConstants()

    this.data = fetch(url, config)
      .then((r) => {
        if (r.ok) return r.json()
        console.error(r)
      })
      .then((json) => json)

    console.debug('Got articles')
    return this
  }

  this.getData = async () => this.data
}
