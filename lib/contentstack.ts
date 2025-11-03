import 'server-only'
const BASE_URL = 'https://cdn.contentstack.io/v3'

const API_KEY = process.env.CONTENTSTACK_API_KEY || 'bltfe96f37415d9a587'
const DELIVERY_TOKEN = process.env.CONTENTSTACK_DELIVERY_TOKEN || 'cs3f71c88a1fe272aab7c4a135'
const ENVIRONMENT = process.env.CONTENTSTACK_ENVIRONMENT || 'production'

type CsHeaders = Record<string, string>

function getHeaders(): CsHeaders {
  return {
    api_key: API_KEY,
    access_token: DELIVERY_TOKEN,
    environment: ENVIRONMENT,
    'Content-Type': 'application/json'
  }
}

async function csFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url, {
    ...init,
    headers: { ...(init.headers as Record<string, string>), ...getHeaders() },
    // Always fetch fresh to ensure newly published content shows immediately in Launch
    cache: 'no-store'
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Contentstack request failed (${res.status}): ${text}`)
  }
  return res.json() as Promise<T>
}

export type MenShirtEntry = {
  uid: string
  title: string
  product_images?: Array<{ url?: string }>
  description?: string
  price?: number
  sale_price?: number
  fabric?: string
  fitting?: string
  sizes?: string[]
  colors?: string[]
  sku?: string
  in_stock?: boolean
  featured?: boolean
  brand?: string
  care_instructions?: string
}

type EntriesResponse<T> = { entries: T[] }
type EntryResponse<T> = { entry: T }

export async function fetchMenShirts(): Promise<MenShirtEntry[]> {
  const data = await csFetch<EntriesResponse<MenShirtEntry>>(`/content_types/men_shirts/entries`)
  return data.entries || []
}

export async function fetchMenShirtByUid(uid: string): Promise<MenShirtEntry | null> {
  const data = await csFetch<EntryResponse<MenShirtEntry>>(`/content_types/men_shirts/entries/${uid}`)
  return data.entry || null
}

// Generic fetcher to reuse the same list UI across content types
export async function fetchEntriesByContentType<T = MenShirtEntry>(contentTypeUid: string): Promise<T[]> {
  const data = await csFetch<EntriesResponse<T>>(`/content_types/${contentTypeUid}/entries`)
  return (data.entries as T[]) || []
}

export async function fetchEntryByUid<T = any>(contentTypeUid: string, uid: string): Promise<T | null> {
  const data = await csFetch<EntryResponse<T>>(`/content_types/${contentTypeUid}/entries/${uid}`)
  return (data.entry as T) || null
}

// Home Page types and fetcher
export type HomeHeroSlide = {
  subtitle?: string
  slide_title?: string
  description?: string
  theme?: string
  image_url?: string
  image?: { url?: string }
  primary_cta_label?: string
  primary_cta_url?: string
}

export type HomePageEntry = {
  uid: string
  title: string
  hero_slides?: HomeHeroSlide[]
  editorial_hero?: {
    image_url?: string
    image?: { url?: string }
    title?: string
    description?: string
    primary_cta_label?: string
    primary_cta_url?: string
  }
  editorial_grid?: Array<{
    image_url?: string
    image?: { url?: string }
    headline?: string
    sub?: string
  }>
  promo_panels?: Array<{
    image_url?: string
    image?: { url?: string }
    title?: string
    subtitle?: string
    cta_label?: string
    cta_url?: string
  }>
}

export async function fetchHomePage(): Promise<HomePageEntry | null> {
  const data = await csFetch<EntriesResponse<HomePageEntry>>(`/content_types/home_page/entries`)
  const entry = data.entries?.[0]
  return entry ?? null
}


