const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY || 'bltfe96f37415d9a587'
const MGMT = process.env.CS_MANAGEMENT || 'cs9cd8c3c984f56c93190a4f61'
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

const placeholders = {
  jackets: 'https://images.unsplash.com/photo-1542060748-10c28b62716b?q=80&w=1600&auto=format&fit=crop',
  shirts: 'https://images.unsplash.com/photo-1520975774665-7f6d98a4d64b?q=80&w=1600&auto=format&fit=crop'
}

async function run() {
  const list = await axios.get(`${BASE}/content_types/home_page/entries`, { headers })
  const entry = (list.data.entries || [])[0]
  if (!entry) throw new Error('No home_page entry found')

  const editorial_grid = [
    {
      headline: 'Coats',
      sub: 'Outerwear',
      image_url: placeholders.jackets,
      primary_cta_label: 'Shop Now',
      cta_label: 'Shop Now',
      cta_url: '/men-jackets'
    },
    {
      headline: 'Shirt',
      sub: 'Essentials',
      image_url: placeholders.shirts,
      primary_cta_label: 'Shop Now',
      cta_label: 'Shop Now',
      cta_url: '/men-shirts'
    }
  ]

  const payload = { entry: { editorial_grid } }
  const res = await axios.put(`${BASE}/content_types/home_page/entries/${entry.uid}`, payload, { headers })
  console.log('✅ Seeded editorial_grid with two proper instances')
  return res.data.entry
}

run().catch((e) => {
  console.error('❌ Failed seeding editorial_grid', e.response?.data || e.message)
  process.exit(1)
})


