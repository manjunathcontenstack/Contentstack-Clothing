const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

function schema() {
  return [
    { display_name: 'Product Name', uid: 'title', data_type: 'text', mandatory: true, unique: true, field_metadata: { _default: true, version: 3 }, multiple: false, non_localizable: false },
    { display_name: 'Product Images', uid: 'product_images', data_type: 'file', multiple: true, mandatory: true, unique: false, non_localizable: false },
    { display_name: 'Product Description', uid: 'description', data_type: 'text', field_metadata: { allow_rich_text: true, multiline: true }, multiple: false, mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Price', uid: 'price', data_type: 'number' },
    { display_name: 'Sale Price', uid: 'sale_price', data_type: 'number' },
    { display_name: 'SKU', uid: 'sku', data_type: 'text' },
    { display_name: 'Brand', uid: 'brand', data_type: 'text' },
    { display_name: 'Material', uid: 'material', data_type: 'text' },
    { display_name: 'In Stock', uid: 'in_stock', data_type: 'boolean' },
    { display_name: 'Care Instructions', uid: 'care_instructions', data_type: 'text', field_metadata: { multiline: true } },
  ]
}

async function run() {
  const body = { content_type: { title: 'Card Holders', uid: 'card_holders', schema: schema(), options: { is_page: false, singleton: false, title: 'title' } } }
  try {
    const res = await axios.post(`${BASE}/content_types`, body, { headers })
    console.log('✅ Created card_holders', res.data?.content_type?.uid)
  } catch (e) {
    console.log('✖ Failed creating card_holders', e.response?.data || e.message)
  }
}

run()


