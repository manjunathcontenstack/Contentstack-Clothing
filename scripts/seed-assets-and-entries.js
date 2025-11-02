const axios = require('axios')
const FormData = require('form-data')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'
const ENV = 'production'
const LOCALE = 'en-us'

const headers = { api_key: API_KEY, authorization: MGMT }

const CONTENT_TYPES = [
  { uid: 'men_shirts', folder: 'Men Shirts', sampleImages: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_jackets', folder: 'Men Jackets', sampleImages: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_shoes', folder: 'Men Shoes', sampleImages: [
    'https://images.unsplash.com/photo-1520256862855-398228c41684?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_jewelry', folder: 'Women Jewelry', sampleImages: [
    'https://images.unsplash.com/photo-1520962918287-7448c2878f65?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'handbags', folder: 'Handbags', sampleImages: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548035390-2d8b6f3f6c6e?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_fragrance', folder: 'Women Fragrance', sampleImages: [
    'https://images.unsplash.com/photo-1505575972945-2804b68fb02f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_tshirts', folder: 'Men T-Shirts', sampleImages: [
    'https://images.unsplash.com/photo-1520975657723-98e8de31b2af?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_blazers', folder: 'Men Blazers', sampleImages: [
    'https://images.unsplash.com/photo-1520975589019-0044f0f7b3e3?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_formal_shoes', folder: 'Men Formal Shoes', sampleImages: [
    'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_sneakers', folder: 'Men Sneakers', sampleImages: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_boots', folder: 'Men Boots', sampleImages: [
    'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_watches', folder: 'Men Watches', sampleImages: [
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_belts', folder: 'Men Belts', sampleImages: [
    'https://images.unsplash.com/photo-1604176354204-9269358f6c00?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_ties', folder: 'Men Ties', sampleImages: [
    'https://images.unsplash.com/photo-1520974747641-2a1f4f74c461?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_tops', folder: 'Women Tops', sampleImages: [
    'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_office_wear', folder: 'Women Office Wear', sampleImages: [
    'https://images.unsplash.com/photo-1562158070-54bdc71e6b2a?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_dresses', folder: 'Women Dresses', sampleImages: [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_scarves', folder: 'Women Scarves', sampleImages: [
    'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'tote_bags', folder: 'Tote Bags', sampleImages: [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'shoulder_bags', folder: 'Shoulder Bags', sampleImages: [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'clutches', folder: 'Clutches', sampleImages: [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'wallets_long', folder: 'Long Wallets', sampleImages: [
    'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'coin_purses', folder: 'Coin Purses', sampleImages: [
    'https://images.unsplash.com/photo-1456082510404-5e5b1b5bb0a0?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'beauty_daily_care', folder: 'Beauty Daily Care', sampleImages: [
    'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'beauty_night_care_set', folder: 'Beauty Night Care', sampleImages: [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'women_jackets', folder: 'Women Jackets', sampleImages: [
    'https://images.unsplash.com/photo-1520974735194-5e82f6f1ef1f?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop'
  ] },
  { uid: 'men_fragrance', folder: 'Men Fragrance', sampleImages: [
    'https://images.unsplash.com/photo-1556229010-aa3f7ff66b47?q=80&w=1600&auto=format&fit=crop'
  ] }
]

async function getOrCreateFolder(name) {
  try {
    const res = await axios.post(`${BASE}/assets/folders`, { asset_folder: { name } }, { headers })
    return res.data.asset_folder
  } catch (e) {
    // If it already exists or endpoint behaves differently, fall back to root
    return { uid: null, name }
  }
}

async function uploadFromUrl(url, folderUid) {
  const imgRes = await axios.get(url, { responseType: 'arraybuffer' })
  const fd = new FormData()
  const filename = url.split('?')[0].split('/').pop() || 'image.jpg'
  fd.append('asset[upload]', Buffer.from(imgRes.data), { filename, contentType: imgRes.headers['content-type'] || 'image/jpeg' })
  if (folderUid) fd.append('asset[parent_uid]', folderUid)
  const res = await axios.post(`${BASE}/assets`, fd, { headers: { ...headers, ...fd.getHeaders() } })
  return res.data.asset
}

async function publishAsset(uid) {
  try {
    await axios.post(`${BASE}/assets/${uid}/publish`, { asset: { environments: [ENV], locales: [LOCALE] } }, { headers })
  } catch {}
}

async function getContentType(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function pickEnumValue(field) {
  const choices = field?.enum?.choices || []
  return choices[0]?.value || ''
}

function buildFieldValue(field, assetsPool) {
  switch (field.data_type) {
    case 'text':
      if (field.display_type === 'dropdown' || field.enum) return pickEnumValue(field)
      if (field.uid === 'sku') return `SKU-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
      return field.uid === 'title' ? `Sample ${Date.now()}-${Math.random().toString(36).slice(2,4)}` : `Sample ${field.display_name}`
    case 'number':
      return field.uid?.includes('price') ? Math.floor(50 + Math.random() * 350) : Math.floor(Math.random() * 100)
    case 'boolean':
      return true
    case 'file':
      if (!assetsPool || assetsPool.length === 0) return field.multiple ? [] : null
      if (field.multiple) {
        return assetsPool.slice(0, 2).map(a => a.uid)
      }
      return assetsPool[0].uid
    case 'group':
      // Skip complex groups for seeding unless multiple->true in which case add 1 empty group
      if (field.multiple) return [{}]
      return {}
    default:
      return null
  }
}

function buildEntryPayloadFromSchema(schema, assetsPool) {
  const entry = {}
  for (const field of schema) {
    // Only set required/commonly-used fields
    if (['title','description','price','sale_price','product_images','fabric','fitting','sizes','colors','sku','in_stock','jacket_type','bag_type','material','brand','care_instructions'].includes(field.uid) || field.mandatory) {
      entry[field.uid] = buildFieldValue(field, assetsPool)
    }
  }
  // Ensure some sensible defaults if present in schema
  if ('in_stock' in entry && entry['in_stock'] === null) entry['in_stock'] = true
  if ('sizes' in entry && Array.isArray(entry['sizes']) && entry['sizes'].length === 0) entry['sizes'] = ['M']
  if ('colors' in entry && Array.isArray(entry['colors']) && entry['colors'].length === 0) entry['colors'] = ['Black']
  return entry
}

async function createEntry(ctUid, entry) {
  const res = await axios.post(`${BASE}/content_types/${ctUid}/entries`, { entry }, { headers })
  return res.data.entry
}

async function publishEntry(ctUid, uid) {
  try {
    await axios.post(`${BASE}/content_types/${ctUid}/entries/${uid}/publish`, { entry: { environments: [ENV], locales: [LOCALE] } }, { headers })
  } catch {}
}

async function seedForContentType(ct) {
  console.log(`\n=== Seeding ${ct.uid} ===`)
  try {
    console.log('Creating/using folder...')
    const folder = await getOrCreateFolder(ct.folder)
    console.log('Folder:', folder.uid)
    // Upload a small pool of assets for this CT
    const assets = []
    for (const url of ct.sampleImages) {
      try {
        console.log('Uploading asset from URL:', url.slice(0, 60) + '...')
        const asset = await uploadFromUrl(url, folder.uid)
        assets.push(asset)
        console.log('Uploaded asset:', asset.uid)
        await publishAsset(asset.uid)
        await new Promise(r => setTimeout(r, 300))
      } catch (e) {
        console.log('Asset upload failed:', e.response?.data || e.message)
      }
    }

    // Read schema to build valid entries
    console.log('Fetching content type...')
    const ctObj = await getContentType(ct.uid)
    const schema = ctObj.schema || []

    for (let i = 1; i <= 5; i++) {
      try {
        const entry = buildEntryPayloadFromSchema(schema, assets)
        if (entry.title) entry.title = `${entry.title} #${i}`
        if (entry.sku) entry.sku = `${entry.sku}-${i}`
        const created = await createEntry(ct.uid, entry)
        await publishEntry(ct.uid, created.uid)
        console.log(`✔ Created & published ${ct.uid} entry ${i}: ${created.uid}`)
        await new Promise(r => setTimeout(r, 400))
      } catch (e) {
        console.log(`✖ Failed creating ${ct.uid} entry ${i}:`, e.response?.data || e.message)
      }
    }
  } catch (e) {
    console.log('Seeding error for', ct.uid, e.response?.data || e.message)
  }
}

async function main() {
  for (const ct of CONTENT_TYPES) {
    await seedForContentType(ct)
  }
  console.log('\nDone seeding assets and entries.')
}

main().catch(e => {
  console.error('Seed failed:', e.response?.data || e.message)
  process.exit(1)
})


