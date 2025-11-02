const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = 'bltfe96f37415d9a587'
const MGMT = 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function getCT(uid) {
  const res = await axios.get(`${BASE}/content_types/${uid}`, { headers })
  return res.data.content_type
}

function keepOnly(schema, allowedUids) {
  return (schema || []).filter((f) => allowedUids.includes(f.uid))
}

function upsertGroup(schema, groupUid, newGroup) {
  const idx = schema.findIndex((f) => f.uid === groupUid && f.data_type === 'group')
  if (idx >= 0) schema[idx] = newGroup
  else schema.push(newGroup)
}

async function run() {
  const ct = await getCT('home_page')
  const schema = ct.schema

  // Define canonical group structures
  const heroSlidesGroup = {
    display_name: 'Hero Slides',
    uid: 'hero_slides',
    data_type: 'group',
    multiple: true,
    schema: [
      { display_name: 'Image', uid: 'image', data_type: 'file', multiple: false },
      { display_name: 'Subtitle', uid: 'subtitle', data_type: 'text' },
      { display_name: 'Slide Title', uid: 'slide_title', data_type: 'text' },
      { display_name: 'Description', uid: 'description', data_type: 'text', field_metadata: { multiline: true } },
      { display_name: 'Primary CTA Label', uid: 'primary_cta_label', data_type: 'text' },
      { display_name: 'Primary CTA URL', uid: 'primary_cta_url', data_type: 'text' }
    ]
  }

  const editorialHeroGroup = {
    display_name: 'Editorial Hero',
    uid: 'editorial_hero',
    data_type: 'group',
    multiple: false,
    schema: [
      { display_name: 'Image', uid: 'image', data_type: 'file', multiple: false },
      { display_name: 'Title', uid: 'title', data_type: 'text' },
      { display_name: 'Description', uid: 'description', data_type: 'text', field_metadata: { multiline: true } },
      { display_name: 'Primary CTA Label', uid: 'primary_cta_label', data_type: 'text' },
      { display_name: 'Primary CTA URL', uid: 'primary_cta_url', data_type: 'text' }
    ]
  }

  const editorialGridGroup = {
    display_name: 'Editorial Grid',
    uid: 'editorial_grid',
    data_type: 'group',
    multiple: true,
    schema: [
      { display_name: 'Image', uid: 'image', data_type: 'file', multiple: false },
      { display_name: 'Headline', uid: 'headline', data_type: 'text' },
      { display_name: 'Sub', uid: 'sub', data_type: 'text' }
    ]
  }

  const promoPanelsGroup = {
    display_name: 'Promo Panels',
    uid: 'promo_panels',
    data_type: 'group',
    multiple: true,
    schema: [
      { display_name: 'Image', uid: 'image', data_type: 'file', multiple: false },
      { display_name: 'Title', uid: 'title', data_type: 'text' },
      { display_name: 'Subtitle', uid: 'subtitle', data_type: 'text' },
      { display_name: 'CTA Label', uid: 'cta_label', data_type: 'text' },
      { display_name: 'CTA URL', uid: 'cta_url', data_type: 'text' }
    ]
  }

  // Ensure minimal root fields: title plus groups
  // Keep title field and remove other stray root fields
  const rootAllowed = ['title', 'hero_slides', 'editorial_hero', 'editorial_grid', 'promo_panels']
  let nextSchema = (schema || []).filter((f) => rootAllowed.includes(f.uid) || f.uid === 'title')
  // Make sure title exists
  if (!nextSchema.find((f) => f.uid === 'title')) {
    nextSchema.unshift({ display_name: 'Title', uid: 'title', data_type: 'text', field_metadata: { _default: true, version: 3 } })
  }

  // Upsert canonical groups
  upsertGroup(nextSchema, 'hero_slides', heroSlidesGroup)
  upsertGroup(nextSchema, 'editorial_hero', editorialHeroGroup)
  upsertGroup(nextSchema, 'editorial_grid', editorialGridGroup)
  upsertGroup(nextSchema, 'promo_panels', promoPanelsGroup)

  // Assign and strip meta
  ct.schema = nextSchema
  delete ct.created_at
  delete ct.updated_at
  delete ct._version
  delete ct.last_activity
  delete ct.DEFAULT_ACL
  delete ct.SYS_ACL
  delete ct.field_rules
  delete ct.abilities

  await axios.put(`${BASE}/content_types/home_page`, { content_type: ct }, { headers })
  console.log('✅ Pruned home_page: removed unwanted fields and kept only required groups')
}

run().catch((e) => {
  console.error('❌ Prune failed:', e.response?.data || e.message)
  process.exit(1)
})


