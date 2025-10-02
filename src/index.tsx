import { Hono } from "hono";
import { renderer } from "./renderer";
import { getFeed, getImage } from "./lib/pitchfork-feed";

const app = new Hono();

app.get("*", renderer);

app.get("/feed", async (c) => {
  const feedUrl = "https://pitchfork.com/feed/reviews/best/albums/rss";
  const feed = await getFeed(feedUrl);

  const addImagesToFeed = feed.entries?.map(async (item) => {
    const image = await getImage(item.link || "");
    return { ...item, image };
  })

  const feedWithImages = await Promise.all(addImagesToFeed || []);

  return c.json(feedWithImages);
});

app.get("/", async (c) => {
  const feedUrl = "https://pitchfork.com/feed/reviews/best/albums/rss";
  const feed = await getFeed(feedUrl);

  return c.render(
    <>
      <header class="container">
        <h1>Pitchfork Feed</h1>
      </header>
      <main class="container">
        {feed.entries?.map(async (item) => {
          return (
            <article key={item.id}>
              <header>
                {item.title}
              </header>
              <p>{item.description}</p>
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
