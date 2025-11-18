"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "#DCFCE7",
          "--success-text": "#166534",
          "--success-border": "#86EFAC",
          "--error-bg": "#FEE2E2",
          "--error-text": "#991B1B",
          "--error-border": "#FCA5A5",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          success: "bg-green-50 text-green-700 border border-green-200",
          error: "bg-red-50 text-red-700 border border-red-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
