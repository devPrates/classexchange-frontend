import { ReactNode } from 'react'
import { CornerAccent } from './corner-accent'

interface BlueprintCardProps {
  children: ReactNode
  className?: string
  showCorners?: boolean
  overlayImageSrc?: string
  overlayClassName?: string
}

export function BlueprintCard({ children, className = '', showCorners = true, overlayImageSrc, overlayClassName }: BlueprintCardProps) {
  return (
    <div className={`relative border border-primary/30 bg-background/50 backdrop-blur-sm ${overlayImageSrc ? 'overflow-hidden' : ''} ${className}`}>
      {showCorners && <CornerAccent />}
      {overlayImageSrc && (
        <img
          src={overlayImageSrc}
          alt=""
          className={overlayClassName ?? 'absolute bottom-0 right-0 w-1/3 opacity-30 pointer-events-none select-none'}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
