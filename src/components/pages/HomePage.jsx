import { HomeHero } from '../views/homeViews/HomeHero.jsx'
import { HomeMarketplaceOverview } from '../views/homeViews/HomeMarketplaceOverview.jsx'
import { HomeFeaturedProducts } from '../views/homeViews/HomeFeaturedProducts.jsx'
import { HomeProductOperations } from '../views/homeViews/HomeProductOperations.jsx'
import { HomePricing } from '../views/homeViews/HomePricing.jsx'
import { HomeClosingCta } from '../views/homeViews/HomeClosingCta.jsx'
import { HomeCounterApp } from '../views/homeViews/HomeCounterApp.jsx'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:space-y-20 lg:px-8 lg:py-24">
        <HomeMarketplaceOverview />
        <HomeFeaturedProducts />
        <HomeProductOperations />
        <HomeCounterApp />
        <HomePricing />
        <HomeClosingCta />
      </div>
    </>
  )
}
