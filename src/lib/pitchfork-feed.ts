import { extract } from "@extractus/feed-extractor";
import * as cheerio from "cheerio";

export async function getFeed(url: string) {
  return await extract(url);
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
      $('meta[property="og:image"]').attr("content") ||
      $('img[class*="album-art"]').attr("src") ||
      null;

    return image;
  } catch (error) {
    console.error(`Failed to fetch/scrape ${url}:`, error);
    return null;
  }
}
