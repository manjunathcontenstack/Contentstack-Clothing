const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'

const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function ensureFileField(groupSchema, uid, displayName) {
  if (!Array.isArray(groupSchema)) return
  const exists = groupSchema.find((f) => f.uid === uid)
  if (!exists) {
    groupSchema.push({ display_name: displayName, uid, data_type: 'file', multiple: false })
  }
}

async function run() {
  const ct = await getCT('home_page')

  // hero_slides -> add file field 'image'
  const hero = ct.schema.find((f) => f.uid === 'hero_slides' && f.data_type === 'group')
  if (hero) ensureFileField(hero.schema, 'image', 'Image')

  // editorial_hero group
  const ed = ct.schema.find((f) => f.uid === 'editorial_hero' && f.data_type === 'group')
  if (ed) ensureFileField(ed.schema, 'image', 'Image')

  // editorial_grid group (multiple)
  const grid = ct.schema.find((f) => f.uid === 'editorial_grid' && f.data_type === 'group')
  if (grid) ensureFileField(grid.schema, 'image', 'Image')

  // promo_panels group (multiple)
  const promos = ct.schema.find((f) => f.uid === 'promo_panels' && f.data_type === 'group')
  if (promos) ensureFileField(promos.schema, 'image', 'Image')

  // cleanup meta
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities

  await axios.put(`${BASE}/content_types/home_page`, { content_type: ct }, { headers })
  console.log('✅ Added asset fields to home_page groups (image)')
}

run().catch((e) => {
  console.error('❌ Failed to add asset fields:', e.response?.data || e.message)
  process.exit(1)
})


