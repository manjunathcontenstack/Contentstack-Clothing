const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY
const MGMT = process.env.CS_MANAGEMENT
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function ensureField(schema, field) {
  const idx = schema.findIndex((f) => f.uid === field.uid)
  if (idx === -1) {
    schema.push(field)
  }
}

async function run() {
  const ct = await getCT('men_blazers')
  const s = ct.schema

  // Optional parity fields (match other men's apparel like jackets/shirts)
  ensureField(s, { display_name: 'Sale Price', uid: 'sale_price', data_type: 'number', mandatory: false })
  ensureField(s, { display_name: 'Fabric', uid: 'fabric', data_type: 'text', mandatory: false })
  ensureField(s, { display_name: 'Fitting', uid: 'fitting', data_type: 'text', mandatory: false })
  ensureField(s, { display_name: 'Available Sizes', uid: 'sizes', data_type: 'text', multiple: true, mandatory: false })
  ensureField(s, { display_name: 'Available Colors', uid: 'colors', data_type: 'text', multiple: true, mandatory: false })
  ensureField(s, { display_name: 'Brand', uid: 'brand', data_type: 'text', mandatory: false })
  ensureField(s, { display_name: 'Care Instructions', uid: 'care_instructions', data_type: 'text', field_metadata: { multiline: true }, mandatory: false })

  // Clean system props
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities

  await axios.put(`${BASE}/content_types/men_blazers`, { content_type: ct }, { headers })
  console.log('✅ Upgraded men_blazers content type with optional parity fields')
}

run().catch((e) => {
  console.error('❌ Failed to upgrade men_blazers:', e.response?.data || e.message)
  process.exit(1)
})


