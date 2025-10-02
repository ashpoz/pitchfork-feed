import { extract } from "@extractus/feed-extractor";
import * as cheerio from "cheerio";

export async function getFeed(options: { url: string; feedKV?: KVNamespace }) {

  const cachedFeed = await options.feedKV?.FEED_ENTRIES_BNM.get('pitchfork-feed', 'json');

  if (cachedFeed) {
    return cachedFeed;
  }

  const feed = await extract(options.url);
  const feedWithImages = await Promise.all(
    (feed.entries || []).map(async (item) => {
      const image = await getImage(item.link || "");
      return { ...item, image };
    })
  );

  await options.feedKV?.FEED_ENTRIES_BNM.put('pitchfork-feed', JSON.stringify(feedWithImages));

  return feedWithImages;
}

export async function getImage(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MyFeedScraper/1.0)",
      },
      signal: AbortSignal.timeout(5000),
    });
    const html = await response.text();
    const $ = cheerio.load(html);

    const image =
      $('link[as="image"]').attr("href") ||
      $('meta[property="og:image"]').attr("content") ||
      null;

    return image;
  } catch (error) {
    console.error(`Failed to fetch/scrape ${url}:`, error);
    return null;
  }
}
