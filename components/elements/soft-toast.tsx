import { toast } from 'sonner'

type Options = {
  description?: string
  duration?: number
}

export const SoftToast = {
  success(message: string, options?: Options) {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
    })
  },
  error(message: string, options?: Options) {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
    })
  },
}