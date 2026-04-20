/**
 * CMS Adapter — getArtworks
 *
 * Returns all publicly visible artworks and the list of distinct series names.
 *
 * Data source priority:
 *   1. Sanity CMS — when SANITY_PROJECT_ID env var is set
 *   2. Local data  — src/data/artworks.ts (fallback / development)
 *
 * No pages or components import from this file's underlying sources directly.
 * To add a new CMS, update src/lib/sanity.ts (or add a new adapter file)
 * and swap the branch below — this file's signature never changes.
 */

import { isSanityConfigured, fetchAllFromSanity } from "./sanity";
import { getPublicArtworks, getAllSeries }         from "../data/artworks";

// Re-export types so callers never need to reach into data/ directly
export type { Artwork, ArtworkStatus } from "../data/artworks";

/**
 * All artworks that should appear publicly (status !== "hidden"),
 * sorted by `sortOrder` ascending.
 */
export async function getArtworks() {
  if (isSanityConfigured) {
    return fetchAllFromSanity();
  }
  return getPublicArtworks();
}

/**
 * Unique series names drawn from the public artwork collection,
 * in the order they first appear when sorted by sortOrder.
 */
export async function getArtworkSeries(): Promise<string[]> {
  if (isSanityConfigured) {
    const artworks = await fetchAllFromSanity();
    return [...new Set(artworks.map((a) => a.series).filter(Boolean))];
  }
  return getAllSeries();
}
