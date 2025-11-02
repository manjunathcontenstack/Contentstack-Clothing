const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'

const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function ensureField(schema, field) {
  const exists = schema.find((f) => f.uid === field.uid)
  if (!exists) schema.push(field)
}

async function upgradeHomeCT() {
  const ct = await getCT('home_page')
  const s = ct.schema

  // editorial_hero group
  ensureField(s, {
    display_name: 'Editorial Hero',
    uid: 'editorial_hero',
    data_type: 'group',
    multiple: false,
    schema: [
      { display_name: 'Image URL', uid: 'image_url', data_type: 'text' },
      { display_name: 'Title', uid: 'title', data_type: 'text' },
      { display_name: 'Description', uid: 'description', data_type: 'text', field_metadata: { multiline: true } },
      { display_name: 'Primary CTA Label', uid: 'primary_cta_label', data_type: 'text' },
      { display_name: 'Primary CTA URL', uid: 'primary_cta_url', data_type: 'text' }
    ]
  })

  // editorial_grid - multiple cards
  ensureField(s, {
    display_name: 'Editorial Grid',
    uid: 'editorial_grid',
    data_type: 'group',
    multiple: true,
    schema: [
      { display_name: 'Image URL', uid: 'image_url', data_type: 'text' },
      { display_name: 'Headline', uid: 'headline', data_type: 'text' },
      { display_name: 'Sub', uid: 'sub', data_type: 'text' }
    ]
  })

  // promo_panels - two panels
  ensureField(s, {
    display_name: 'Promo Panels',
    uid: 'promo_panels',
    data_type: 'group',
    multiple: true,
    schema: [
      { display_name: 'Image URL', uid: 'image_url', data_type: 'text' },
      { display_name: 'Title', uid: 'title', data_type: 'text' },
      { display_name: 'Subtitle', uid: 'subtitle', data_type: 'text' },
      { display_name: 'CTA Label', uid: 'cta_label', data_type: 'text' },
      { display_name: 'CTA URL', uid: 'cta_url', data_type: 'text' }
    ]
  })

  // clean CT before update
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities

  await axios.put(`${BASE}/content_types/home_page`, { content_type: ct }, { headers })
  console.log('✅ Upgraded home_page content type with editorial fields')
}

upgradeHomeCT().catch((e) => {
  console.error('❌ Failed to upgrade home_page:', e.response?.data || e.message)
  process.exit(1)
})


