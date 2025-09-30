import { extract } from "@extractus/feed-extractor";

export async function getFeed(url: string) {
  const feed = await extract(url);
  return feed;
}