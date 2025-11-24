const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function ensureField(groupSchema, uid, displayName) {
  if (!Array.isArray(groupSchema)) return
  const exists = groupSchema.find((f) => f.uid === uid)
  if (!exists) {
    groupSchema.push({ display_name: displayName, uid, data_type: 'text' })
  }
}

async function run() {
  const ct = await getCT('home_page')
  const s = ct.schema

  // Find editorial_grid group
  const grid = s.find((f) => f.uid === 'editorial_grid' && f.data_type === 'group')
  if (grid && Array.isArray(grid.schema)) {
    ensureField(grid.schema, 'cta_label', 'CTA Label')
    ensureField(grid.schema, 'primary_cta_label', 'Primary CTA Label')
    ensureField(grid.schema, 'cta_url', 'CTA URL')
  }

  // remove system props
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities

  await axios.put(`${BASE}/content_types/home_page`, { content_type: ct }, { headers })
  console.log('✅ Ensured CTA fields on home_page.editorial_grid')
}

run().catch((e) => {
  console.error('❌ Failed upgrading editorial_grid CTA fields', e.response?.data || e.message)
  process.exit(1)
})


