const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

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
  const res = await axios.put(`${BASE}/content_types/${uid}`, { content_type: ct }, { headers })
  return res.data.content_type
}

function normalize(schema) {
  // Keep only the fields used in product detail/list pages
  const uids = new Set(['title','product_images','description','price','sale_price','sku','brand','in_stock'])
  return (schema || []).filter(f => uids.has(f.uid))
}

async function run() {
  const women = await getCT('women_fragrance')
  const men = await getCT('men_fragrance')
  // Copy the normalized schema structure from women to men
  men.schema = normalize(women.schema)
  await updateCT('men_fragrance', men)
  console.log('✅ men_fragrance content type synced to women_fragrance structure')
}

run().catch(e => {
  console.error('❌ Failed to sync men_fragrance:', e.response?.data || e.message)
  process.exit(1)
})


