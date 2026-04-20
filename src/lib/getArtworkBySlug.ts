/**
 * CMS Adapter — getArtworkBySlug
 *
 * Fetches a single artwork by its URL slug, plus prev/next neighbours
 * for detail-page navigation. Also re-exports pure formatting utilities
 * that have no data-source dependency.
 *
 * Data source priority:
 *   1. Sanity CMS — when SANITY_PROJECT_ID env var is set
 *   2. Local data  — src/data/artworks.ts (fallback / development)
 */

import {
  isSanityConfigured,
  fetchAllFromSanity,
  fetchArtworkBySlugFromSanity,
} from "./sanity";
import {
  getArtworkBySlug    as _getBySlug,
  getAdjacentArtworks as _getAdjacent,
  formatPrice         as _formatPrice,
  STATUS_LABELS       as _STATUS_LABELS,
} from "../data/artworks";

// Re-export types and pure utilities — these have no data-source dependency
export type { Artwork, ArtworkStatus } from "../data/artworks";
export const STATUS_LABELS = _STATUS_LABELS;
export const formatPrice   = _formatPrice;

/**
 * Single artwork matching `slug`, or `undefined` when not found.
 */
export async function getArtworkBySlug(slug: string) {
  if (isSanityConfigured) {
    return fetchArtworkBySlugFromSanity(slug);
  }
  return _getBySlug(slug);
}

/**
 * The artwork immediately before and after `slug` in the public collection
 * (by `sortOrder`). Either value is `null` when there is no neighbour.
 */
export async function getAdjacentArtworks(slug: string) {
  if (isSanityConfigured) {
    const all = await fetchAllFromSanity();
    const idx = all.findIndex((a) => a.slug === slug);
    return {
      prev: idx > 0              ? all[idx - 1] : null,
      next: idx < all.length - 1 ? all[idx + 1] : null,
    };
  }
  return _getAdjacent(slug);
}
