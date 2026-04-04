const items = [
  {
    img: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png',
    title: 'UI kit for Figma',
    desc: 'Component library and documentation for product teams.',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-4.png',
    title: '3D icon system',
    desc: 'Consistent geometry and materials for interface marketing.',
  },
  {
    img: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-5.png',
    title: 'Device mockups',
    desc: 'High-resolution templates for presentation and storefronts.',
  },
]

export function HomeFeaturedProducts() {
  return (
    <section id="featured-products" className="scroll-mt-24 border-t border-[var(--border-default)] pt-16">
      <div className="border-b border-[var(--border-default)] pb-6">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Featured products</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          Curated listings illustrating storefront layout and content hierarchy.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <article key={p.title} className="flex flex-col border border-[var(--border-default)] bg-[var(--surface)]">
            <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-800">
              <img src={p.img} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{p.desc}</p>
              <span className="primary-btn mt-6 inline-flex w-fit px-4 py-2 text-xs font-medium">View listing</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
