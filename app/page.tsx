import ProLuxuryNav from './components/ProLuxuryNav'
import FullBleedHero from './components/FullBleedHero'
import EditorialHero from './components/EditorialHero'
import EditorialGrid from './components/EditorialGrid'
import PromoSplit from './components/PromoSplit'
import SeasonalNarratives from './components/SeasonalNarratives'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import { fetchHomePage } from '../lib/contentstack'

export default async function Home() {
  const home = await fetchHomePage()
  const firstSlide = home?.hero_slides?.[0]
  const cards = (home?.hero_slides || []).slice(0, 3).map(s => ({ img: s.image?.url || s.image_url || '', caption: s.slide_title || s.subtitle || 'Editorial' }))
  const gridCards = (home?.editorial_grid || []).map(g => ({ headline: g.headline || '', sub: g.sub || '', imageUrl: g.image_url || '' }))
  const gridCards2 = (home?.editorial_grid || []).map(g => ({ headline: g.headline || '', sub: g.sub || '', imageUrl: g.image?.url || g.image_url || '' }))
  const leftPanel = home?.promo_panels?.[0]
  const rightPanel = home?.promo_panels?.[1]
  return (
    <main className="min-h-screen">
      <ProLuxuryNav />
      <FullBleedHero imageUrl={firstSlide?.image?.url || firstSlide?.image_url} heading={firstSlide?.slide_title} subheading={firstSlide?.description} />
      <SeasonalNarratives cards={cards} />
      <EditorialHero imageUrl={home?.editorial_hero?.image?.url || home?.editorial_hero?.image_url} title={home?.editorial_hero?.title} description={home?.editorial_hero?.description} ctaLabel={home?.editorial_hero?.primary_cta_label} ctaUrl={home?.editorial_hero?.primary_cta_url} />
      <EditorialGrid cards={gridCards2} />
      <PromoSplit left={{ title: leftPanel?.title || 'Iconic Essentials', subtitle: leftPanel?.subtitle || 'MEN', cta: leftPanel?.cta_label || 'Shop Now', imageUrl: leftPanel?.image?.url || leftPanel?.image_url }} right={{ title: rightPanel?.title || 'Timeless Elegance', subtitle: rightPanel?.subtitle || 'WOMEN', cta: rightPanel?.cta_label || 'Discover', imageUrl: rightPanel?.image?.url || rightPanel?.image_url }} />
      <Newsletter />
      <Footer />
    </main>
  )
}
