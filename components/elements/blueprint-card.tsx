import { ReactNode } from 'react'
import { CornerAccent } from './corner-accent'

interface BlueprintCardProps {
  children: ReactNode
  className?: string
  showCorners?: boolean
}

export function BlueprintCard({ children, className = '', showCorners = true }: BlueprintCardProps) {
  return (
    <div className={`relative border border-primary/30 bg-background/50 backdrop-blur-sm ${className}`}>
      {showCorners && <CornerAccent />}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
