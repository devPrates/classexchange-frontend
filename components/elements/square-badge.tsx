"use client"

import { cn } from '@/lib/utils'

type Props = {
  text: string
  className?: string
}

export function SquareBadge({ text, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-none border px-2 py-0.5 font-medium w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden text-foreground tech-label",
        className,
      )}
    >
      {text}
    </span>
  )
}

