const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

const CTS = [
  { uid: 'handbags', title: 'Handbags' },
  { uid: 'tote_bags', title: 'Tote Bags' },
  { uid: 'shoulder_bags', title: 'Shoulder Bags' },
  { uid: 'clutches', title: 'Clutches' },
  { uid: 'card_holders', title: 'Card Holders' },
  { uid: 'wallets_long', title: 'Long Wallets' },
  { uid: 'coin_purses', title: 'Coin Purses' },
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
    { display_name: 'Material', uid: 'material', data_type: 'text', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'In Stock', uid: 'in_stock', data_type: 'boolean', mandatory: false, unique: false, non_localizable: false },
    { display_name: 'Care Instructions', uid: 'care_instructions', data_type: 'text', field_metadata: { multiline: true }, multiple: false, mandatory: false, unique: false, non_localizable: false },
  ]
}

async function upsert({ uid, title }) {
  const body = { content_type: { title, uid, schema: standardProductSchema(), options: { is_page: false, singleton: false, title: 'title' } } }
  try {
    await axios.put(`${BASE}/content_types/${uid}`, body, { headers })
    console.log(`✅ Updated ${uid}`)
  } catch (e) {
    console.log(`✖ Failed ${uid}`, e.response?.data || e.message)
  }
}

;(async () => {
  for (const ct of CTS) await upsert(ct)
})()


