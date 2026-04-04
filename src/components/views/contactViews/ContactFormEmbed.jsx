export function ContactFormEmbed() {
  return (
    <div className="border border-[var(--border-default)] bg-[var(--surface)] p-4">
      <iframe
        title="Contact form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSeVBlxBueqOwQCCZFBF5LGpgKvUInBiS0S6E1UbtvuBYDh9oA/viewform?embedded=true"
        width="100%"
        height="900"
        className="min-h-[60vh] w-full border border-[var(--border-default)] bg-[var(--surface-muted)]"
      />
    </div>
  )
}
