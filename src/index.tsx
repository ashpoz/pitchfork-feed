import { Hono } from 'hono'
import { renderer } from './renderer'
import { getFeed } from './lib/pitchfork-feed'

const app = new Hono()

app.get('*', renderer)

app.get('/feed', async (c) => {
  const feedUrl = 'https://pitchfork.com/feed/reviews/best/albums/rss'
  const feed = await getFeed(feedUrl)

  return c.json(feed)
})

app.get('/', async (c) => {
  return c.render(
    <header class="container">
      <h1>Hello, Cloudflare Pages!</h1>
    </header>
  )
})

export default app