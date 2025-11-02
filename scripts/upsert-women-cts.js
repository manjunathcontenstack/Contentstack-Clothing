const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

const WOMEN = [
  { uid: 'women_tops', title: 'Women Tops' },
  { uid: 'women_jackets', title: 'Women Jackets' },
  { uid: 'women_office_wear', title: 'Women Office Wear' },
  { uid: 'women_dresses', title: 'Women Dresses' },
]

function standardProductSchema() {
  return [
    { display_name: 'Product Name', uid: 'title', data_type: 'text', mandatory: true, unique: true, field_metadata: { _default: true, version: 3 }, multiple: false, non_localizable: false },
    { display_name: 'Product Images', uid: 'product_images', data_type: 'file', multiple: true, mandatory: true, unique: false, non_localizable: false },
    { display_name: 'Product Description', uid: 'description', data_type: 'text', field_metadata: { allow_rich_text: true, multiline: true }, multiple: false, mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Price', uid: 'price', data_type: 'number', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Sale Price', uid: 'sale_price', data_type: 'number', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'SKU', uid: 'sku', data_type: 'text', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Brand', uid: 'brand', data_type: 'text', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Available Sizes', uid: 'sizes', data_type: 'text', display_type: 'dropdown', enum: { advanced: false, choices: [ { value: 'XS' }, { value: 'S' }, { value: 'M' }, { value: 'L' }, { value: 'XL' }, { value: 'XXL' } ] }, multiple: true, mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Available Colors', uid: 'colors', data_type: 'text', multiple: true, mandatory: false, unique: false, non_localizable: false },
    { display_name: 'In Stock', uid: 'in_stock', data_type: 'boolean', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Care Instructions', uid: 'care_instructions', data_type: 'text', field_metadata: { multiline: true }, multiple: false, mandatory: false, unique: false, non_localizable: false },
  ]
}

async function upsertContentType({ uid, title }) {
  const body = {
    content_type: {
      title,
      uid,
      schema: standardProductSchema(),
      options: { is_page: false, singleton: false, title: 'title' },
    },
  }
  try {
    await axios.put(`${BASE}/content_types/${uid}`, body, { headers })
    console.log(`✅ Updated ${uid}`)
  } catch (e) {
    const err = e.response?.data || e.message
    console.log(`✖ Failed updating ${uid}`, err)
  }
}

;(async () => {
  for (const ct of WOMEN) {
    await upsertContentType(ct)
  }
})()


