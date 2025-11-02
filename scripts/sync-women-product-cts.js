const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

const TARGET_CTS = [
  'women_tops',
  'women_office_wear',
  'women_dresses',
  'women_jewelry',
  'women_scarves',
  'handbags',
]

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

async function updateCT(uid, ct) {
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities
  await axios.put(`${BASE}/content_types/${uid}`, { content_type: ct }, { headers })
}

function ensure(schema, field) {
  if (!schema.find(f => f.uid === field.uid)) schema.push(field)
}

function ensureProductSchema(ct) {
  const s = ct.schema
  ensure(s, { display_name: 'Title', uid: 'title', data_type: 'text', field_metadata: { _default: true, version: 3 } })
  ensure(s, { display_name: 'Product Images', uid: 'product_images', data_type: 'file', multiple: true })
  ensure(s, { display_name: 'Product Description', uid: 'description', data_type: 'text', field_metadata: { multiline: true } })
  ensure(s, { display_name: 'Price', uid: 'price', data_type: 'number' })
  ensure(s, { display_name: 'Sale Price', uid: 'sale_price', data_type: 'number' })
  ensure(s, { display_name: 'SKU', uid: 'sku', data_type: 'text' })
  ensure(s, { display_name: 'Brand', uid: 'brand', data_type: 'text' })
  ensure(s, { display_name: 'In Stock', uid: 'in_stock', data_type: 'boolean' })
  return ct
}

async function run() {
  for (const uid of TARGET_CTS) {
    try {
      let ct = await getCT(uid)
      ct = ensureProductSchema(ct)
      await updateCT(uid, ct)
      console.log(`✅ Synced fields for ${uid}`)
    } catch (e) {
      console.log(`✖ Failed syncing ${uid}`, e.response?.data || e.message)
    }
  }
}

run().catch(e => {
  console.error('Failed:', e.response?.data || e.message)
  process.exit(1)
})


