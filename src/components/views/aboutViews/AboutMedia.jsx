export function AboutMedia() {
  return (
    <div className="border border-[var(--border-default)] bg-[var(--surface-muted)] p-1">
      <div className="aspect-[4/3] min-h-[240px] bg-zinc-200 dark:bg-zinc-800">
        <img
          src="/assets/images/gooomly-hero.png"
          alt=""
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>
    </div>
  )
}
