/**
 * CMS Adapter — getFeaturedArtworks
 *
 * Returns artworks marked as featured, for use on the homepage.
 *
 * Data source priority:
 *   1. Sanity CMS — when SANITY_PROJECT_ID env var is set
 *   2. Local data  — src/data/artworks.ts (fallback / development)
 */

import { isSanityConfigured, fetchAllFromSanity } from "./sanity";
import { getFeaturedArtworks as _getFeatured }     from "../data/artworks";

export type { Artwork } from "../data/artworks";

/**
 * Artworks with `featured: true`, excluding hidden ones,
 * sorted by `sortOrder` ascending.
 */
export async function getFeaturedArtworks() {
  if (isSanityConfigured) {
    const all = await fetchAllFromSanity();
    // fetchAllFromSanity already excludes hidden; filter for featured only
    return all.filter((a) => a.featured);
  }
  return _getFeatured();
}
