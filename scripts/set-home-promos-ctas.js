const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function run() {
  const list = await axios.get(`${BASE}/content_types/home_page/entries`, { headers })
  const entry = (list.data.entries || [])[0]
  if (!entry) throw new Error('No home_page entry found')

  const panels = Array.isArray(entry.promo_panels) ? [...entry.promo_panels] : []
  if (panels[0]) {
    panels[0] = {
      ...panels[0],
      cta_label: panels[0].cta_label || 'Shop Now',
      cta_url: '/men-tshirts'
    }
    delete panels[0].image
  }
  if (panels[1]) {
    panels[1] = {
      ...panels[1],
      cta_label: panels[1].cta_label || 'Discover',
      cta_url: '/women-dresses'
    }
    delete panels[1].image
  }

  const payload = { entry: { promo_panels: panels } }
  const res = await axios.put(`${BASE}/content_types/home_page/entries/${entry.uid}`, payload, { headers })
  console.log('✅ Updated promo panel CTAs (1->men-tshirts, 2->women-dresses)')
  return res.data.entry
}

run().catch((e) => {
  console.error('❌ Failed setting promo panel CTAs', e.response?.data || e.message)
  process.exit(1)
})


