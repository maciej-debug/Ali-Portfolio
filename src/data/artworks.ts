/**
 * Ali Bachler — Artwork Collection (CMS Data Layer)
 *
 * This is the single source of truth for all artwork data.
 * To connect a headless CMS (Contentful, Sanity, Prismic…), replace the
 * ARTWORKS array with an API call and keep the helper functions intact.
 *
 * Status options:
 *   available     — for sale; shows inquiry CTA
 *   sold          — sold; shows "Sold" label, no CTA
 *   reserved      — on hold; shows "Reserved" label
 *   not_available — exists but not currently for sale
 *   hidden        — never rendered publicly
 */

export type ArtworkStatus = "available" | "sold" | "reserved" | "not_available" | "hidden";

export interface Artwork {
  id: number;
  slug: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  price: number | null;
  currency: string;
  status: ArtworkStatus;
  series: string;
  featured: boolean;
  sortOrder: number;
  image: string;
  gallery: string[];
  seoTitle?: string;
  seoDescription?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTWORK COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

export const ARTWORKS: Artwork[] = [

  // ── Series: Water what waters you ──────────────────────────────────────────

  {
    id: 1,
    slug: "water-what-waters-you",
    title: "Water what waters you",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "140 × 100 cm",
    description:
      "Summer storm meets ancient wood. Blue and green move through brown depths, where old growth makes space for new. A meditation on the nourishment that comes from within — the water that sustains us most is the water we give ourselves.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Water what waters you",
    featured: true,
    sortOrder: 1,
    image: "/images/water-what-waters-you.webp",
    gallery: [],
    seoTitle: "Water what waters you — Ali Bachler",
    seoDescription:
      "Original abstract painting, 140 × 100 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 2,
    slug: "water-what-waters-you-ii",
    title: "Water what waters you II",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "60 × 80 cm",
    description:
      "Like tree bark after fresh rain, blue and green seep into brown texture. Something watches from within — quiet awareness in growing things. A companion piece, smaller and more intimate.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Water what waters you",
    featured: true,
    sortOrder: 2,
    image: "/images/water-what-waters-you-2.webp",
    gallery: [],
    seoTitle: "Water what waters you II — Ali Bachler",
    seoDescription:
      "Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 3,
    slug: "water-what-waters-you-mini",
    title: "Water what waters you Mini",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "50 × 50 cm",
    description:
      "Rain-soaked bark in miniature. Blue and green bleed into weathered brown, holding quiet wisdom. The same energy distilled into the smallest form — concentrated, still.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Water what waters you",
    featured: false,
    sortOrder: 3,
    image: "/images/water-what-waters-you-mini.webp",
    gallery: [],
    seoTitle: "Water what waters you Mini — Ali Bachler",
    seoDescription:
      "Original abstract painting, 50 × 50 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },

  // ── Series: Wings wide open ─────────────────────────────────────────────────

  {
    id: 4,
    slug: "wings-wide-open",
    title: "Wings wide open",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "100 × 100 cm",
    description:
      "Two wings for freedom and transformation. Soft peachy corals blend into greens that dance across each wing like nature's patterns. An invitation to expand, to open, to fly.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Wings",
    featured: true,
    sortOrder: 4,
    image: "/images/wings-wide-open.webp",
    gallery: [],
    seoTitle: "Wings wide open — Ali Bachler",
    seoDescription:
      "Original abstract painting, 100 × 100 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },

  // ── Series: Mushrooms in the Forest ────────────────────────────────────────

  {
    id: 5,
    slug: "mushrooms-in-the-forest",
    title: "Mushrooms in the Forest",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "150 × 90 cm",
    description:
      "Gold and olive forms float on blush. Soft edges blur into air. Organic, fleeting, grounded. The forest floor holds its own kind of quiet magic — beauty that grows in shadow.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Mushrooms in the Forest",
    featured: true,
    sortOrder: 5,
    image: "/images/mushrooms-in-the-forest.webp",
    gallery: [],
    seoTitle: "Mushrooms in the Forest — Ali Bachler",
    seoDescription:
      "Original abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 6,
    slug: "mushrooms-in-the-forest-ii",
    title: "Mushrooms in the Forest II",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "150 × 90 cm",
    description:
      "Mushrooms suspended in warm earth tones. Brief appearances in the forest's endless cycle. Where one disappears, another emerges — the rhythm of growth and return.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Mushrooms in the Forest",
    featured: true,
    sortOrder: 6,
    image: "/images/mushrooms-in-the-forest-2.webp",
    gallery: [],
    seoTitle: "Mushrooms in the Forest II — Ali Bachler",
    seoDescription:
      "Original abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 7,
    slug: "mushrooms-in-the-forest-iii",
    title: "Mushrooms in the Forest III",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "60 × 80 cm",
    description:
      "Golden clusters fold into white. Dense composition holds its breath. Layered, intimate, complete. Each form contains multitudes, pressed close together like old friends.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Mushrooms in the Forest",
    featured: false,
    sortOrder: 7,
    image: "/images/mushrooms-in-the-forest-3.webp",
    gallery: [],
    seoTitle: "Mushrooms in the Forest III — Ali Bachler",
    seoDescription:
      "Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 8,
    slug: "mushrooms-in-the-forest-mini",
    title: "Mushrooms in the Forest Mini",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "40 × 60 cm",
    description:
      "Two amber forms curve together. Gentle shadows define their shape. Simple, essential, quiet. An encounter rather than a landscape — the intimacy of a smaller canvas.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Mushrooms in the Forest",
    featured: false,
    sortOrder: 8,
    image: "/images/mushrooms-in-the-forest-mini.webp",
    gallery: [],
    seoTitle: "Mushrooms in the Forest Mini — Ali Bachler",
    seoDescription:
      "Original abstract painting, 40 × 60 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },

  // ── Series: Countless Sunsets ───────────────────────────────────────────────

  {
    id: 9,
    slug: "countless-sunsets",
    title: "Countless Sunsets",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "60 × 80 cm",
    description:
      "Round suns in amber and coral. Burgundy strokes ground the light. Cyclical, glowing, eternal. Every ending is also a counting — each sunset a small ceremony of gratitude.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Sunsets",
    featured: true,
    sortOrder: 9,
    image: "/images/countless-sunsets.webp",
    gallery: [],
    seoTitle: "Countless Sunsets — Ali Bachler",
    seoDescription:
      "Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },
  {
    id: 10,
    slug: "countless-sunsets-mini",
    title: "Countless Sunsets Mini",
    year: "2024",
    medium: "Oil on canvas",
    dimensions: "50 × 50 cm",
    description:
      "Light circles gather close together. Dark shadow grounds their dance. Concentrated, warm, fleeting. An intimate study in golden light.",
    price: null,
    currency: "EUR",
    status: "available",
    series: "Sunsets",
    featured: false,
    sortOrder: 10,
    image: "/images/countless-sunsets-mini.webp",
    gallery: [],
    seoTitle: "Countless Sunsets Mini — Ali Bachler",
    seoDescription:
      "Original abstract painting, 50 × 50 cm oil on canvas by Alexandra Bachler. Available for purchase.",
  },

  // ── Earlier Work (sold) ─────────────────────────────────────────────────────

  {
    id: 11,
    slug: "peach-blossom-whispers",
    title: "Peach Blossom Whispers",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "120 × 80 cm",
    description:
      "Soft peachy blooms float like memories of summer fruit. Gentle greens and textured greys weave between the warm circles, creating a quiet garden moment.",
    price: null,
    currency: "EUR",
    status: "sold",
    series: "Earlier Work",
    featured: false,
    sortOrder: 11,
    image: "/images/peach-blossom-whispers.webp",
    gallery: [],
    seoTitle: "Peach Blossom Whispers — Ali Bachler",
    seoDescription: "Abstract painting, 120 × 80 cm oil on canvas by Alexandra Bachler.",
  },
  {
    id: 12,
    slug: "ice-cream-after-yoga",
    title: "Ice Cream after Yoga",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "150 × 90 cm",
    description:
      "Golden amber forms drift through a peachy haze, scattered with delicate white blossoms. A warm meditation on light, bloom, and the gentle sweetness of self-care.",
    price: null,
    currency: "EUR",
    status: "sold",
    series: "Earlier Work",
    featured: false,
    sortOrder: 12,
    image: "/images/ice-cream-after-yoga.webp",
    gallery: [],
    seoTitle: "Ice Cream after Yoga — Ali Bachler",
    seoDescription: "Abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler.",
  },
  {
    id: 13,
    slug: "jungle-path",
    title: "Jungle Path",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "120 × 80 cm",
    description:
      "Wild magenta currents flow between soft green. A journey through untamed growth — the path that reveals itself only as you walk it.",
    price: null,
    currency: "EUR",
    status: "sold",
    series: "Earlier Work",
    featured: false,
    sortOrder: 13,
    image: "/images/jungle-path.webp",
    gallery: [],
    seoTitle: "Jungle Path — Ali Bachler",
    seoDescription: "Abstract painting, 120 × 80 cm oil on canvas by Alexandra Bachler.",
  },
  {
    id: 14,
    slug: "eclipse-in-the-jungle",
    title: "Eclipse in the Jungle",
    year: "2023",
    medium: "Oil on canvas",
    dimensions: "250 × 140 cm",
    description:
      "Luminous green forms twist with coral-red blooms against soft mint. Dark branches weave through, creating a botanical dreamscape where light and shadow meet. The largest canvas — a whole world contained.",
    price: null,
    currency: "EUR",
    status: "sold",
    series: "Earlier Work",
    featured: false,
    sortOrder: 14,
    image: "/images/eclipse-in-the-jungle.webp",
    gallery: [],
    seoTitle: "Eclipse in the Jungle — Ali Bachler",
    seoDescription: "Abstract painting, 250 × 140 cm oil on canvas by Alexandra Bachler.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/** All publicly visible artworks — excludes hidden, sorted by sortOrder */
export function getPublicArtworks(): Artwork[] {
  return ARTWORKS.filter((a) => a.status !== "hidden").sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

/** Featured artworks for the homepage */
export function getFeaturedArtworks(): Artwork[] {
  return ARTWORKS.filter((a) => a.featured && a.status !== "hidden").sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );
}

/** Find a single artwork by slug */
export function getArtworkBySlug(slug: string): Artwork | undefined {
  return ARTWORKS.find((a) => a.slug === slug);
}

/** Prev / next artworks for detail-page navigation */
export function getAdjacentArtworks(slug: string): {
  prev: Artwork | null;
  next: Artwork | null;
} {
  const visible = getPublicArtworks();
  const idx = visible.findIndex((a) => a.slug === slug);
  return {
    prev: idx > 0 ? visible[idx - 1] : null,
    next: idx < visible.length - 1 ? visible[idx + 1] : null,
  };
}

/** All unique series names (public artworks only) */
export function getAllSeries(): string[] {
  return [
    ...new Set(
      getPublicArtworks()
        .map((a) => a.series)
        .filter(Boolean),
    ),
  ];
}

/** Format a price for display */
export function formatPrice(artwork: Artwork): string | null {
  if (!artwork.price) return null;
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: artwork.currency || "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(artwork.price);
}

/** Human-readable status labels */
export const STATUS_LABELS: Record<ArtworkStatus, string> = {
  available:     "Available",
  sold:          "Sold",
  reserved:      "Reserved",
  not_available: "Not available",
  hidden:        "",
};
