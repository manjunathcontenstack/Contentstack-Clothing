const axios = require('axios')

const BASE = 'https://api.contentstack.io/v3'
const API_KEY = process.env.CS_API_KEY
const MGMT = process.env.CS_MANAGEMENT
const headers = { api_key: API_KEY, authorization: MGMT, 'Content-Type': 'application/json' }

async function run() {
  // Fetch existing Home entry (singleton)
  const list = await axios.get(`${BASE}/content_types/home_page/entries`, { headers })
  const entry = (list.data.entries || [])[0]
  if (!entry) {
    throw new Error('No home_page entry found. Create one first.')
  }

  // Ensure editorial_hero exists and set CTA to Men Blazers
  const updated = {
    entry: {
      editorial_hero: {
        ...(entry.editorial_hero || {}),
        image: null,
        primary_cta_label: 'Discover',
        primary_cta_url: '/men-blazers'
      }
    }
  }

  const res = await axios.put(`${BASE}/content_types/home_page/entries/${entry.uid}`, updated, { headers })
  console.log('✅ Updated Home entry CTA to /men-blazers')
  return res.data.entry
}

run().catch((e) => {
  console.error('✖ Failed updating Home CTA', e.response?.data || e.message)
  process.exit(1)
})


