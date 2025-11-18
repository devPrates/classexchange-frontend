export function SkeletonCard() {
  return (
    <div className="relative border border-primary/30 rounded-lg p-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
      </div>
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-2 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-muted rounded border border-primary/30" />
      ))}
    </div>
  )
}
