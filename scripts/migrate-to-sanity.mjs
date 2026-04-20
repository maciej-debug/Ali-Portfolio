#!/usr/bin/env node
/**
 * migrate-to-sanity.mjs
 *
 * Migrates all 14 artworks from src/data/artworks.ts into Sanity CMS.
 * Uploads each main image from public/images/ automatically.
 *
 * ── Usage ──────────────────────────────────────────────────────────────────
 *
 *   node scripts/migrate-to-sanity.mjs
 *
 * Requires SANITY_TOKEN in your .env file, or pass it inline:
 *
 *   SANITY_TOKEN=sk... node scripts/migrate-to-sanity.mjs
 *
 * The script is idempotent — safe to run multiple times.
 * Documents that already exist (matched by _id) are skipped, not overwritten.
 *
 * ── Getting a token ────────────────────────────────────────────────────────
 *   1. Go to https://sanity.io/manage
 *   2. Open the "Ali Portfolio" project → API → Tokens
 *   3. Add a token with "Editor" permissions
 *   4. Paste the token value into .env as SANITY_TOKEN=sk...
 * ──────────────────────────────────────────────────────────────────────────
 */

import { createClient }             from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { resolve, dirname }         from 'path'
import { fileURLToPath }            from 'url'

// ── Resolve project root ───────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')

// ── Load .env manually (no extra deps) ────────────────────────────────────

try {
  const { readFileSync } = await import('fs')
  const env = readFileSync(resolve(ROOT, '.env'), 'utf8')
  for (const line of env.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && !process.env[key]) {
      process.env[key] = rest.join('=').trim()
    }
  }
} catch { /* .env is optional */ }

// ── Config ─────────────────────────────────────────────────────────────────

const PROJECT_ID  = process.env.SANITY_PROJECT_ID  || '220rb4dj'
const DATASET     = process.env.SANITY_DATASET     || 'production'
const API_VERSION = process.env.SANITY_API_VERSION || '2024-01-01'
const TOKEN       = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error(`
  ✗  SANITY_TOKEN is not set.

  1. Go to https://sanity.io/manage → "Ali Portfolio" → API → Tokens
  2. Create a new token with "Editor" permissions
  3. Add it to your .env file:

       SANITY_TOKEN=sk...

  Then re-run:  node scripts/migrate-to-sanity.mjs
  `)
  process.exit(1)
}

const client = createClient({
  projectId:  PROJECT_ID,
  dataset:    DATASET,
  apiVersion: API_VERSION,
  token:      TOKEN,
  useCdn:     false,   // always write to the live API, never CDN cache
})

// ── Artwork data ───────────────────────────────────────────────────────────
// Copied verbatim from src/data/artworks.ts.
// Field `availability` matches the Sanity schema field name;
// the frontend GROQ query projects it as `status`.

const ARTWORKS = [

  // ── Series: Water what waters you ────────────────────────────────────────

  {
    slug:           'water-what-waters-you',
    title:          'Water what waters you',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '140 × 100 cm',
    description:    'Summer storm meets ancient wood. Blue and green move through brown depths, where old growth makes space for new. A meditation on the nourishment that comes from within — the water that sustains us most is the water we give ourselves.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Water what waters you',
    featured:       true,
    sortOrder:      1,
    image:          '/images/water-what-waters-you.webp',
    gallery:        [],
    seoTitle:       'Water what waters you — Ali Bachler',
    seoDescription: 'Original abstract painting, 140 × 100 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'water-what-waters-you-ii',
    title:          'Water what waters you II',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '60 × 80 cm',
    description:    'Like tree bark after fresh rain, blue and green seep into brown texture. Something watches from within — quiet awareness in growing things. A companion piece, smaller and more intimate.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Water what waters you',
    featured:       true,
    sortOrder:      2,
    image:          '/images/water-what-waters-you-2.webp',
    gallery:        [],
    seoTitle:       'Water what waters you II — Ali Bachler',
    seoDescription: 'Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'water-what-waters-you-mini',
    title:          'Water what waters you Mini',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '50 × 50 cm',
    description:    'Rain-soaked bark in miniature. Blue and green bleed into weathered brown, holding quiet wisdom. The same energy distilled into the smallest form — concentrated, still.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Water what waters you',
    featured:       false,
    sortOrder:      3,
    image:          '/images/water-what-waters-you-mini.webp',
    gallery:        [],
    seoTitle:       'Water what waters you Mini — Ali Bachler',
    seoDescription: 'Original abstract painting, 50 × 50 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },

  // ── Series: Wings ─────────────────────────────────────────────────────────

  {
    slug:           'wings-wide-open',
    title:          'Wings wide open',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '100 × 100 cm',
    description:    'Two wings for freedom and transformation. Soft peachy corals blend into greens that dance across each wing like nature\'s patterns. An invitation to expand, to open, to fly.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Wings',
    featured:       true,
    sortOrder:      4,
    image:          '/images/wings-wide-open.webp',
    gallery:        [],
    seoTitle:       'Wings wide open — Ali Bachler',
    seoDescription: 'Original abstract painting, 100 × 100 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },

  // ── Series: Mushrooms in the Forest ───────────────────────────────────────

  {
    slug:           'mushrooms-in-the-forest',
    title:          'Mushrooms in the Forest',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '150 × 90 cm',
    description:    'Gold and olive forms float on blush. Soft edges blur into air. Organic, fleeting, grounded. The forest floor holds its own kind of quiet magic — beauty that grows in shadow.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Mushrooms in the Forest',
    featured:       true,
    sortOrder:      5,
    image:          '/images/mushrooms-in-the-forest.webp',
    gallery:        [],
    seoTitle:       'Mushrooms in the Forest — Ali Bachler',
    seoDescription: 'Original abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'mushrooms-in-the-forest-ii',
    title:          'Mushrooms in the Forest II',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '150 × 90 cm',
    description:    'Mushrooms suspended in warm earth tones. Brief appearances in the forest\'s endless cycle. Where one disappears, another emerges — the rhythm of growth and return.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Mushrooms in the Forest',
    featured:       true,
    sortOrder:      6,
    image:          '/images/mushrooms-in-the-forest-2.webp',
    gallery:        [],
    seoTitle:       'Mushrooms in the Forest II — Ali Bachler',
    seoDescription: 'Original abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'mushrooms-in-the-forest-iii',
    title:          'Mushrooms in the Forest III',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '60 × 80 cm',
    description:    'Golden clusters fold into white. Dense composition holds its breath. Layered, intimate, complete. Each form contains multitudes, pressed close together like old friends.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Mushrooms in the Forest',
    featured:       false,
    sortOrder:      7,
    image:          '/images/mushrooms-in-the-forest-3.webp',
    gallery:        [],
    seoTitle:       'Mushrooms in the Forest III — Ali Bachler',
    seoDescription: 'Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'mushrooms-in-the-forest-mini',
    title:          'Mushrooms in the Forest Mini',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '40 × 60 cm',
    description:    'Two amber forms curve together. Gentle shadows define their shape. Simple, essential, quiet. An encounter rather than a landscape — the intimacy of a smaller canvas.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Mushrooms in the Forest',
    featured:       false,
    sortOrder:      8,
    image:          '/images/mushrooms-in-the-forest-mini.webp',
    gallery:        [],
    seoTitle:       'Mushrooms in the Forest Mini — Ali Bachler',
    seoDescription: 'Original abstract painting, 40 × 60 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },

  // ── Series: Sunsets ───────────────────────────────────────────────────────

  {
    slug:           'countless-sunsets',
    title:          'Countless Sunsets',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '60 × 80 cm',
    description:    'Round suns in amber and coral. Burgundy strokes ground the light. Cyclical, glowing, eternal. Every ending is also a counting — each sunset a small ceremony of gratitude.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Sunsets',
    featured:       true,
    sortOrder:      9,
    image:          '/images/countless-sunsets.webp',
    gallery:        [],
    seoTitle:       'Countless Sunsets — Ali Bachler',
    seoDescription: 'Original abstract painting, 60 × 80 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },
  {
    slug:           'countless-sunsets-mini',
    title:          'Countless Sunsets Mini',
    year:           '2024',
    medium:         'Oil on canvas',
    dimensions:     '50 × 50 cm',
    description:    'Light circles gather close together. Dark shadow grounds their dance. Concentrated, warm, fleeting. An intimate study in golden light.',
    price:          null,
    currency:       'EUR',
    availability:   'available',
    series:         'Sunsets',
    featured:       false,
    sortOrder:      10,
    image:          '/images/countless-sunsets-mini.webp',
    gallery:        [],
    seoTitle:       'Countless Sunsets Mini — Ali Bachler',
    seoDescription: 'Original abstract painting, 50 × 50 cm oil on canvas by Alexandra Bachler. Available for purchase.',
  },

  // ── Earlier Work (sold) ───────────────────────────────────────────────────

  {
    slug:           'peach-blossom-whispers',
    title:          'Peach Blossom Whispers',
    year:           '2023',
    medium:         'Oil on canvas',
    dimensions:     '120 × 80 cm',
    description:    'Soft peachy blooms float like memories of summer fruit. Gentle greens and textured greys weave between the warm circles, creating a quiet garden moment.',
    price:          null,
    currency:       'EUR',
    availability:   'sold',
    series:         'Earlier Work',
    featured:       false,
    sortOrder:      11,
    image:          '/images/peach-blossom-whispers.webp',
    gallery:        [],
    seoTitle:       'Peach Blossom Whispers — Ali Bachler',
    seoDescription: 'Abstract painting, 120 × 80 cm oil on canvas by Alexandra Bachler.',
  },
  {
    slug:           'ice-cream-after-yoga',
    title:          'Ice Cream after Yoga',
    year:           '2023',
    medium:         'Oil on canvas',
    dimensions:     '150 × 90 cm',
    description:    'Golden amber forms drift through a peachy haze, scattered with delicate white blossoms. A warm meditation on light, bloom, and the gentle sweetness of self-care.',
    price:          null,
    currency:       'EUR',
    availability:   'sold',
    series:         'Earlier Work',
    featured:       false,
    sortOrder:      12,
    image:          '/images/ice-cream-after-yoga.webp',
    gallery:        [],
    seoTitle:       'Ice Cream after Yoga — Ali Bachler',
    seoDescription: 'Abstract painting, 150 × 90 cm oil on canvas by Alexandra Bachler.',
  },
  {
    slug:           'jungle-path',
    title:          'Jungle Path',
    year:           '2023',
    medium:         'Oil on canvas',
    dimensions:     '120 × 80 cm',
    description:    'Wild magenta currents flow between soft green. A journey through untamed growth — the path that reveals itself only as you walk it.',
    price:          null,
    currency:       'EUR',
    availability:   'sold',
    series:         'Earlier Work',
    featured:       false,
    sortOrder:      13,
    image:          '/images/jungle-path.webp',
    gallery:        [],
    seoTitle:       'Jungle Path — Ali Bachler',
    seoDescription: 'Abstract painting, 120 × 80 cm oil on canvas by Alexandra Bachler.',
  },
  {
    slug:           'eclipse-in-the-jungle',
    title:          'Eclipse in the Jungle',
    year:           '2023',
    medium:         'Oil on canvas',
    dimensions:     '250 × 140 cm',
    description:    'Luminous green forms twist with coral-red blooms against soft mint. Dark branches weave through, creating a botanical dreamscape where light and shadow meet. The largest canvas — a whole world contained.',
    price:          null,
    currency:       'EUR',
    availability:   'sold',
    series:         'Earlier Work',
    featured:       false,
    sortOrder:      14,
    image:          '/images/eclipse-in-the-jungle.webp',
    gallery:        [],
    seoTitle:       'Eclipse in the Jungle — Ali Bachler',
    seoDescription: 'Abstract painting, 250 × 140 cm oil on canvas by Alexandra Bachler.',
  },
]

// ── Helpers ────────────────────────────────────────────────────────────────

/** Uploads a local image to Sanity and returns the image object for the document. */
async function uploadImage(imagePath) {
  const fullPath = resolve(ROOT, 'public', imagePath.replace(/^\//, ''))

  if (!existsSync(fullPath)) {
    return { uploaded: false, reason: `file not found: ${fullPath}` }
  }

  try {
    const filename    = imagePath.split('/').pop()
    const contentType = filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg'

    const asset = await client.assets.upload(
      'image',
      createReadStream(fullPath),
      { filename, contentType },
    )

    return {
      uploaded: true,
      ref: {
        _type:  'image',
        asset:  { _type: 'reference', _ref: asset._id },
      },
    }
  } catch (err) {
    return { uploaded: false, reason: err.message }
  }
}

// ── Migration ──────────────────────────────────────────────────────────────

async function migrate() {
  console.log('')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('  Ali Bachler → Sanity CMS migration')
  console.log(`  Project: ${PROJECT_ID}  Dataset: ${DATASET}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')

  const results = { created: 0, skipped: 0, failed: 0, noImage: 0 }

  for (const artwork of ARTWORKS) {
    const docId = `artwork-${artwork.slug}`
    const label = `[${String(artwork.sortOrder).padStart(2, '0')}] ${artwork.title}`

    // ── Check if document already exists ────────────────────────────────
    const existing = await client.fetch(
      `*[_id == $id][0]{ _id, "hasImage": defined(mainImage) }`,
      { id: docId },
    )

    // If it exists AND already has an image, nothing to do
    if (existing?.hasImage) {
      console.log(`  ${label}`)
      console.log(`       → skipped (already has image)\n`)
      results.skipped++
      continue
    }

    // ── Upload main image ────────────────────────────────────────────────
    process.stdout.write(`  ${label}\n`)
    process.stdout.write(`       uploading image...`)

    const imgResult = await uploadImage(artwork.image)

    if (imgResult.uploaded) {
      process.stdout.write(` ✓\n`)
    } else {
      process.stdout.write(` ✗ (${imgResult.reason})\n`)
      results.noImage++
    }

    // ── Build document ───────────────────────────────────────────────────
    const doc = {
      _id:   docId,
      _type: 'artwork',

      title:       artwork.title,
      slug:        { _type: 'slug', current: artwork.slug },
      year:        artwork.year        || undefined,
      medium:      artwork.medium      || undefined,
      dimensions:  artwork.dimensions  || undefined,
      description: artwork.description || undefined,

      availability: artwork.availability,
      series:       artwork.series     || undefined,
      featured:     artwork.featured,
      sortOrder:    artwork.sortOrder,
      currency:     artwork.currency,

      // Only include price if non-null
      ...(artwork.price !== null && artwork.price !== undefined
        ? { price: artwork.price }
        : {}),

      // Only include SEO fields if present
      ...(artwork.seoTitle       ? { seoTitle:       artwork.seoTitle }       : {}),
      ...(artwork.seoDescription ? { seoDescription: artwork.seoDescription } : {}),

      // Only include image if upload succeeded
      ...(imgResult.uploaded ? { mainImage: imgResult.ref } : {}),
    }

    // ── Create or patch in Sanity ────────────────────────────────────────
    try {
      if (existing) {
        // Document exists but has no image — patch it
        const patch = { mainImage: doc.mainImage }
        if (doc.galleryImages?.length) patch.galleryImages = doc.galleryImages
        await client.patch(docId).set(patch).commit()
        console.log(`       → image patched onto existing document ✓\n`)
      } else {
        await client.createIfNotExists(doc)
        console.log(`       → created ✓\n`)
      }
      results.created++
    } catch (err) {
      console.log(`       → FAILED: ${err.message}\n`)
      results.failed++
    }
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`  ✓ Created:  ${results.created}`)
  console.log(`  → Skipped:  ${results.skipped}  (already existed)`)
  if (results.noImage > 0) {
    console.log(`  ⚠ No image: ${results.noImage}  (see warnings above)`)
  }
  if (results.failed > 0) {
    console.log(`  ✗ Failed:   ${results.failed}  (see errors above)`)
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('')

  if (results.created > 0) {
    console.log('  Images uploaded. Documents are already published — no')
    console.log('  further action needed in the Studio.')
    console.log('')
  }
}

migrate().catch((err) => {
  console.error('\n  ✗ Migration failed:', err.message)
  if (err.statusCode === 401 || err.statusCode === 403) {
    console.error('  → Check that your SANITY_TOKEN has "Editor" permissions.')
  }
  process.exit(1)
})
