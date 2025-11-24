const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function run() {
  const list = await axios.get(`${BASE}/content_types/home_page/entries`, { headers })
  const entry = (list.data.entries || [])[0]
  if (!entry) throw new Error('No home_page entry found')

  // Make safe copy with updated CTA fields for first two grid items
  const grid = Array.isArray(entry.editorial_grid) ? [...entry.editorial_grid] : []
  if (grid[0]) {
    grid[0] = {
      ...grid[0],
      primary_cta_label: 'Shop Now',
      cta_label: 'Shop Now',
      cta_url: '/men-jackets',
    }
  }
  if (grid[1]) {
    grid[1] = {
      ...grid[1],
      primary_cta_label: 'Shop Now',
      cta_label: 'Shop Now',
      cta_url: '/men-shirts',
    }
  }

  // Strip asset fields to avoid "is not a valid upload" validation
  if (grid[0]) { delete grid[0].image }
  if (grid[1]) { delete grid[1].image }
  const payload = { entry: { editorial_grid: grid } }
  const res = await axios.put(`${BASE}/content_types/home_page/entries/${entry.uid}`, payload, { headers })
  console.log('✅ Set grid CTAs: 1->jackets, 2->shirts')
  return res.data.entry
}

run().catch((e) => {
  console.error('❌ Failed setting home grid CTAs', e.response?.data || e.message)
  process.exit(1)
})


