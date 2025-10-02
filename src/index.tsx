import { Hono } from "hono";
import { renderer } from "./renderer";
import { getFeed } from "./lib/pitchfork-feed";

const app = new Hono();

type feedItem = {
  id: string;
  title: string;
  link: string;
  description: string;
  image?: string | null;
};

app.get("*", renderer);

app.get("/feed", async (c) => {
  const feedUrl = "https://pitchfork.com/feed/reviews/best/albums/rss";
  const feed = await getFeed({ url: feedUrl, feedKV: c.env });

  return c.json(feed);
});

app.get("/", async (c) => {
  const feedUrl = "https://pitchfork.com/feed/reviews/best/albums/rss";
  const feed = await getFeed({url: feedUrl, feedKV: c.env});

  return c.render(
    <>
      <header class="container">
        <h1>Pitchfork Feed</h1>
      </header>
      <main class="container">
        {feed?.map(async (item: feedItem) => {
          return (
            <article key={item.id}>
              <div class="grid">
                <header>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </header>
                <img src={item.image || ""} alt="" />
              </div>
              <footer>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read Review
                </a>
              </footer>
            </article>
          );
        })}
      </main>
    </>
  );
});

export default app;
