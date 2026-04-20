/**
 * Upload Selected Artworks to Sanity
 *
 * - Patches mainImage on 9 existing documents (real photos replace placeholders)
 * - Creates 7 new documents for Bach Blüten, Jardim de James, Palo Santo
 *
 * Run from project root:
 *   node scripts/upload-selected-works.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Read .env manually ───────────────────────────────────────────────────────
const envPath = path.resolve(__dirname, "../.env");
const envVars = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf-8")
    .split("\n")
    .forEach((line) => {
      const [k, ...v] = line.split("=");
      if (k && v.length) envVars[k.trim()] = v.join("=").trim();
    });
}

const projectId = envVars.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const token     = envVars.SANITY_TOKEN     || process.env.SANITY_TOKEN;

if (!projectId || !token) {
  console.error("❌  Missing SANITY_PROJECT_ID or SANITY_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset:    envVars.SANITY_DATASET || "production",
  apiVersion: envVars.SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn:     false,
});

const BASE = path.resolve(__dirname, "../Selected Artworks");

// ─── Upload helper ────────────────────────────────────────────────────────────

async function uploadImage(filePath) {
  const filename = path.basename(filePath);
  console.log(`  ↑ Uploading ${filename}…`);
  const stream = fs.createReadStream(filePath);
  const asset  = await client.assets.upload("image", stream, { filename });
  return asset._id;
}

async function setMainImage(docId, assetId) {
  await client
    .patch(docId)
    .set({
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        hotspot: { _type: "sanity.imageHotspot", x: 0.5, y: 0.5, height: 0.5, width: 0.5 },
        crop:    { _type: "sanity.imageCrop",     top: 0, bottom: 0, left: 0, right: 0 },
      },
    })
    .commit();
}

async function createArtwork({ id, slug, title, series, sortOrder, filePath }) {
  const assetId = await uploadImage(filePath);
  const doc = {
    _id:   `artwork-${slug}`,
    _type: "artwork",
    title,
    slug:         { _type: "slug", current: slug },
    series,
    availability: "available",
    featured:     false,
    sortOrder,
    year:         "2024",
    medium:       "Oil on canvas",
    currency:     "EUR",
    mainImage: {
      _type:  "image",
      asset:  { _type: "reference", _ref: assetId },
      hotspot: { _type: "sanity.imageHotspot", x: 0.5, y: 0.5, height: 0.5, width: 0.5 },
      crop:    { _type: "sanity.imageCrop",     top: 0, bottom: 0, left: 0, right: 0 },
    },
  };
  await client.createOrReplace(doc);
  console.log(`  ✅  Created artwork-${slug}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const tasks = [

  // ── Retry: Mushrooms II (transient network failure) ───────────────────────

  {
    type:   "patch",
    docId:  "artwork-mushrooms-in-the-forest-ii",
    file:   "Mushrooms in the Forest/Mushrooms in the Forest00002.jpg",
  },

  // ── Create new artworks ───────────────────────────────────────────────────

  {
    type:      "create",
    slug:      "bach-bluten",
    title:     "Bach Blüten",
    series:    "Bach Blüten",
    sortOrder: 15,
    file:      "Bach Blüten/bach-bluten.jpg",
  },
  {
    type:      "create",
    slug:      "jardim-de-james",
    title:     "Jardim de James",
    series:    "Jardim de James",
    sortOrder: 16,
    file:      "Jardim de James/Jardim the James00001.jpg",
  },
  {
    type:      "create",
    slug:      "jardim-de-james-ii",
    title:     "Jardim de James II",
    series:    "Jardim de James",
    sortOrder: 17,
    file:      "Jardim de James/Jardim the James00002.jpg",
  },
  {
    type:      "create",
    slug:      "palo-santo",
    title:     "Palo Santo",
    series:    "Palo Santo",
    sortOrder: 18,
    file:      "Palo Santo/Palo Santo00001.jpg",
  },
  {
    type:      "create",
    slug:      "palo-santo-ii",
    title:     "Palo Santo II",
    series:    "Palo Santo",
    sortOrder: 19,
    file:      "Palo Santo/Palo Santo00002.jpg",
  },
  {
    type:      "create",
    slug:      "palo-santo-iii",
    title:     "Palo Santo III",
    series:    "Palo Santo",
    sortOrder: 20,
    file:      "Palo Santo/Palo Santo00003.jpg",
  },
  {
    type:      "create",
    slug:      "palo-santo-iv",
    title:     "Palo Santo IV",
    series:    "Palo Santo",
    sortOrder: 21,
    file:      "Palo Santo/Palo Santo00004.jpg",
  },
];

console.log(`\n🎨  Uploading ${tasks.length} artworks to Sanity…\n`);

let ok = 0;
let fail = 0;

for (const task of tasks) {
  const filePath = path.join(BASE, task.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠️  File not found: ${task.file}`);
    fail++;
    continue;
  }

  try {
    if (task.type === "patch") {
      console.log(`📌  Patching ${task.docId}`);
      const assetId = await uploadImage(filePath);
      await setMainImage(task.docId, assetId);
      console.log(`  ✅  Done\n`);
    } else {
      console.log(`🆕  Creating artwork-${task.slug}`);
      await createArtwork({ ...task, filePath });
      console.log();
    }
    ok++;
  } catch (err) {
    console.error(`  ❌  Failed for ${task.docId || task.slug}: ${err.message}`);
    fail++;
  }
}

console.log(`\n──────────────────────────────────────`);
console.log(`✅  ${ok} succeeded   ❌  ${fail} failed`);
console.log(`──────────────────────────────────────\n`);

if (ok > 0) {
  console.log("Next: publish the new drafts in Sanity Studio, or run:");
  console.log("  npx sanity documents publish artwork-bach-bluten");
  console.log("  (etc. for each new slug)\n");
}
