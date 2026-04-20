/**
 * CMS Adapter — getRelatedArtworks
 *
 * Returns artworks in the same series as a given artwork, excluding itself.
 * Used on the individual artwork detail page to power the "From the same series"
 * section.
 *
 * Data source priority:
 *   1. Sanity CMS — when SANITY_PROJECT_ID env var is set
 *   2. Local data  — src/data/artworks.ts (fallback / development)
 */

import { isSanityConfigured, fetchAllFromSanity } from "./sanity";
import { getPublicArtworks }                       from "../data/artworks";
import type { Artwork }                            from "../data/artworks";

export type { Artwork } from "../data/artworks";

/**
 * Up to `limit` artworks that share the same `series` as `artwork`,
 * excluding `artwork` itself. Results maintain the global `sortOrder`.
 *
 * @param artwork - The current artwork (used to match series and exclude self)
 * @param limit   - Maximum number of results (default: 3)
 */
export async function getRelatedArtworks(
  artwork: Artwork,
  limit = 3,
): Promise<Artwork[]> {
  if (isSanityConfigured) {
    const all = await fetchAllFromSanity();
    return all
      .filter((a) => a.series === artwork.series && a.slug !== artwork.slug)
      .slice(0, limit);
  }
  return getPublicArtworks()
    .filter((a) => a.series === artwork.series && a.slug !== artwork.slug)
    .slice(0, limit);
}
