export function CornerAccent({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/40" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/40" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/40" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/40" />
    </div>
  )
}
