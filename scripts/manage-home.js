const axios = require('axios')

const STACK_API_KEY = 'bltfe96f37415d9a587'
const MANAGEMENT_TOKEN = 'cs9cd8c3c984f56c93190a4f61'
const BASE_URL = 'https://api.contentstack.io/v3'

const headers = {
  'api_key': STACK_API_KEY,
  'authorization': MANAGEMENT_TOKEN,
  'Content-Type': 'application/json'
}

async function getContentType(uid) {
  const res = await axios.get(`${BASE_URL}/content_types/${uid}`, { headers })
  return res.data.content_type
}

async function updateContentType(uid, contentType) {
  // Remove non-updatable/system props if present
  delete contentType.created_at
  delete contentType.updated_at
  delete contentType._version
  delete contentType.last_activity
  delete contentType.DEFAULT_ACL
  delete contentType.SYS_ACL
  delete contentType.field_rules
  delete contentType.abilities

  const res = await axios.put(`${BASE_URL}/content_types/${uid}`, { content_type: contentType }, { headers })
  return res.data.content_type
}

function ensureHeroImageUrlField(contentType) {
  if (!Array.isArray(contentType.schema)) return false
  const heroGroup = contentType.schema.find(
    (f) => f.uid === 'hero_slides' && f.data_type === 'group'
  )
  if (!heroGroup) return false
  const hasImageUrl = Array.isArray(heroGroup.schema) && heroGroup.schema.some((f) => f.uid === 'image_url')
  if (!hasImageUrl) {
    heroGroup.schema.push({
      display_name: 'Image URL',
      uid: 'image_url',
      data_type: 'text',
      multiple: false,
      mandatory: false,
      unique: false,
      non_localizable: false
    })
    return true
  }
  return false
}

async function upsertHomeEntry() {
  // Check if entry exists
  const listRes = await axios.get(`${BASE_URL}/content_types/home_page/entries`, { headers })
  const entries = listRes.data.entries || []

  const placeholderImages = [
    'https://images.unsplash.com/photo-1520975922284-5cbfba25b3f3?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975774665-7f6d98a4d64b?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975940248-6a95252d94fb?q=80&w=1600&auto=format&fit=crop'
  ]

  const entryPayload = {
    entry: {
      title: 'Home',
      hero_slides: [
        {
          subtitle: '',
          slide_title: 'Slide 1',
          description: '',
          theme: 'light',
          image_url: placeholderImages[0]
        },
        {
          subtitle: '',
          slide_title: 'Slide 2',
          description: '',
          theme: 'dark',
          image_url: placeholderImages[1]
        },
        {
          subtitle: '',
          slide_title: 'Slide 3',
          description: '',
          theme: 'gold',
          image_url: placeholderImages[2]
        }
      ]
      // Intentionally leaving other fields empty per user request
    }
  }

  if (entries.length > 0) {
    const uid = entries[0].uid
    const res = await axios.put(`${BASE_URL}/content_types/home_page/entries/${uid}`, entryPayload, { headers })
    return res.data.entry
  } else {
    const res = await axios.post(`${BASE_URL}/content_types/home_page/entries`, entryPayload, { headers })
    return res.data.entry
  }
}

async function main() {
  // 1) Ensure content type has image_url field in hero slides
  let ct = await getContentType('home_page')
  const changed = ensureHeroImageUrlField(ct)
  if (changed) {
    ct = await updateContentType('home_page', ct)
    console.log('✅ Updated Home Page content type with image_url in hero_slides')
  } else {
    console.log('ℹ image_url already present in hero_slides')
  }

  // 2) Create or update the singleton entry with only images set
  const entry = await upsertHomeEntry()
  console.log(`✅ Home Page entry ready. UID: ${entry.uid}`)
}

main().catch((err) => {
  console.error('❌ Failed managing Home Page:', err.response?.data || err.message)
  process.exit(1)
})


