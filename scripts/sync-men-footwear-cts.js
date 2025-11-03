const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

const TARGETS = [
  { uid: 'men_shoes', title: 'Men Shoes' },
  { uid: 'men_boots', title: 'Men Boots' },
  { uid: 'men_formal_shoes', title: 'Men Formal Shoes' },
  { uid: 'men_sneakers', title: 'Men Sneakers' },
]

function footwearSchema() {
  return [
    { display_name: 'Product Name', uid: 'title', data_type: 'text', mandatory: true, unique: true, field_metadata: { _default: true, version: 3 } },
    { display_name: 'Product Images', uid: 'product_images', data_type: 'file', multiple: true, mandatory: true },
    { display_name: 'Product Description', uid: 'description', data_type: 'text', field_metadata: { allow_rich_text: true, multiline: true } },
    { display_name: 'Price', uid: 'price', data_type: 'number' },
    { display_name: 'Sale Price', uid: 'sale_price', data_type: 'number' },
    { display_name: 'SKU', uid: 'sku', data_type: 'text' },
    { display_name: 'Brand', uid: 'brand', data_type: 'text' },
    { display_name: 'Sizes', uid: 'sizes', data_type: 'text', multiple: true },
    { display_name: 'Colors', uid: 'colors', data_type: 'text', multiple: true },
    { display_name: 'Material', uid: 'material', data_type: 'text' },
    { display_name: 'In Stock', uid: 'in_stock', data_type: 'boolean' },
    { display_name: 'Care Instructions', uid: 'care_instructions', data_type: 'text', field_metadata: { multiline: true } },
  ]
}

async function upsert(uid, title) {
  const body = {
    content_type: {
      title,
      uid,
      schema: footwearSchema(),
      options: { is_page: false, singleton: false, title: 'title' },
    },
  }
  try {
    await axios.put(`${BASE}/content_types/${uid}`, body, { headers })
    console.log(`✅ Updated schema for ${uid}`)
  } catch (e) {
    const err = e.response?.data || e.message
    if (e.response?.status === 404 || (err && err.error_code === 118)) {
      try {
        const res = await axios.post(`${BASE}/content_types`, body, { headers })
        console.log('🆕 Created', res.data?.content_type?.uid)
      } catch (ee) {
        console.log(`✖ Failed creating ${uid}`, ee.response?.data || ee.message)
      }
    } else {
      console.log(`✖ Failed updating ${uid}`, err)
    }
  }
}

;(async () => {
  for (const t of TARGETS) await upsert(t.uid, t.title)
})()


