/**
 * Sanity CMS — client, GROQ queries, type mapper, and fetch helpers.
 *
 * All pages and components remain untouched. The four lib adapters call
 * fetchAllFromSanity() (or fetchArtworkBySlugFromSanity()) when Sanity is
 * configured, and fall back to local data when it is not.
 *
 * ─── Required environment variables ───────────────────────────────────────────
 *
 *   SANITY_PROJECT_ID   your project id, e.g. "abc123de"        ← required
 *   SANITY_DATASET      dataset name, default "production"       ← optional
 *   SANITY_API_VERSION  API version, default "2024-01-01"        ← optional
 *   SANITY_TOKEN        read token for private datasets / drafts ← optional
 *
 * Set these in a .env file at the project root (see .env.example).
 * If SANITY_PROJECT_ID is absent the site silently uses local data.
 * ──────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from "@sanity/client";
import type { Artwork, ArtworkStatus } from "../data/artworks";

// ─── Client ───────────────────────────────────────────────────────────────────

// import.meta.env is Vite's env layer; process.env is the Node.js fallback.
// Both are checked so the value is available in all Astro execution contexts.
const projectId  = (import.meta.env.SANITY_PROJECT_ID  ?? process.env.SANITY_PROJECT_ID)  as string | undefined;
const dataset    = (import.meta.env.SANITY_DATASET     ?? process.env.SANITY_DATASET     ?? "production") as string;
const apiVersion = (import.meta.env.SANITY_API_VERSION ?? process.env.SANITY_API_VERSION ?? "2024-01-01") as string;
const token      = (import.meta.env.SANITY_TOKEN       ?? process.env.SANITY_TOKEN)       as string | undefined;

/**
 * True when SANITY_PROJECT_ID is present — the lib adapters check this flag
 * to decide which data source to use.
 */
export const isSanityConfigured = Boolean(projectId);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: true, // serve from edge CDN; set false for always-fresh drafts
    })
  : null;

// ─── GROQ queries ─────────────────────────────────────────────────────────────

/**
 * Projection shared by both queries — maps Sanity field names to the
 * frontend Artwork shape. `mainImage.asset->url` dereferences the image
 * asset to a ready-to-use CDN URL so @sanity/image-url is not needed.
 */
const ARTWORK_PROJECTION = /* groq */ `{
  _id,
  title,
  "slug":    slug.current,
  "image":   mainImage.asset->url,
  "gallery": galleryImages[].asset->url,
  year,
  medium,
  dimensions,
  description,
  price,
  currency,
  "status":  availability,
  series,
  featured,
  sortOrder,
  seoTitle,
  seoDescription
}`;

/** Fetch all non-hidden artworks, sorted by sortOrder ascending. */
export const ARTWORKS_QUERY = /* groq */ `
  *[_type == "artwork" && availability != "hidden"]
  | order(sortOrder asc)
  ${ARTWORK_PROJECTION}
`;

/** Fetch a single artwork by its slug. */
export const ARTWORK_BY_SLUG_QUERY = /* groq */ `
  *[_type == "artwork" && slug.current == $slug && availability != "hidden"][0]
  ${ARTWORK_PROJECTION}
`;

// ─── Raw document shape returned by the queries ───────────────────────────────

interface SanityArtworkDoc {
  _id: string;
  title: string;
  slug: string;
  image: string | null;
  gallery: (string | null)[] | null;
  year?: string;
  medium?: string;
  dimensions?: string;
  description?: string;
  price?: number | null;
  currency?: string;
  status?: string;           // Sanity field is "availability", projected as "status"
  series?: string;
  featured?: boolean;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
}

// ─── Mapper ───────────────────────────────────────────────────────────────────

const VALID_STATUSES = new Set<ArtworkStatus>([
  "available",
  "sold",
  "reserved",
  "not_available",
  "hidden",
]);

function toStatus(raw: string | undefined): ArtworkStatus {
  if (raw && VALID_STATUSES.has(raw as ArtworkStatus)) {
    return raw as ArtworkStatus;
  }
  return "not_available";
}

/**
 * Maps a raw Sanity document to the frontend `Artwork` type.
 * All fields have sensible defaults so a partially-filled Sanity document
 * will not break the site.
 *
 * @param doc   Raw document returned by the GROQ query
 * @param index Position in the result array — used as fallback id/sortOrder
 */
export function mapSanityArtwork(doc: SanityArtworkDoc, index: number): Artwork {
  return {
    // id is not rendered in the UI; derive from sortOrder so it stays stable
    id:             doc.sortOrder      ?? index + 1,
    slug:           doc.slug,
    title:          doc.title,
    year:           doc.year           ?? "",
    medium:         doc.medium         ?? "",
    dimensions:     doc.dimensions     ?? "",
    description:    doc.description    ?? "",
    price:          doc.price          ?? null,
    currency:       doc.currency       ?? "EUR",
    status:         toStatus(doc.status),
    series:         doc.series         ?? "",
    featured:       doc.featured       ?? false,
    sortOrder:      doc.sortOrder      ?? index + 1,
    image:          doc.image          ?? "",
    // Filter nulls that can appear when an asset reference is unresolved
    gallery:        (doc.gallery ?? []).filter((u): u is string => Boolean(u)),
    seoTitle:       doc.seoTitle,
    seoDescription: doc.seoDescription,
  };
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

// Module-level cache — shared across all lib adapter calls within a single
// build pass so Sanity is not queried more than once per build.
// Disabled in dev mode so content changes in Sanity appear on the next
// page refresh without restarting the dev server.
let _artworksCache: Artwork[] | null = null;
const _isDev = (import.meta.env.DEV ?? process.env.NODE_ENV === "development") === true;

/**
 * Fetch (and cache) all public artworks from Sanity.
 * Only call this when `isSanityConfigured` is true.
 */
export async function fetchAllFromSanity(): Promise<Artwork[]> {
  if (_artworksCache && !_isDev) return _artworksCache;
  const docs = await sanityClient!.fetch<SanityArtworkDoc[]>(ARTWORKS_QUERY, {}, { perspective: "published" });
  _artworksCache = docs.map(mapSanityArtwork);
  return _artworksCache;
}

/**
 * Fetch a single artwork by slug from Sanity.
 * Returns `undefined` when the slug does not match any document.
 * Only call this when `isSanityConfigured` is true.
 */
export async function fetchArtworkBySlugFromSanity(
  slug: string,
): Promise<Artwork | undefined> {
  // Re-use the cached collection when it is already warm
  if (_artworksCache) {
    return _artworksCache.find((a) => a.slug === slug);
  }
  const doc = await sanityClient!.fetch<SanityArtworkDoc | null>(
    ARTWORK_BY_SLUG_QUERY,
    { slug },
    { perspective: "published" },
  );
  return doc ? mapSanityArtwork(doc, 0) : undefined;
}
