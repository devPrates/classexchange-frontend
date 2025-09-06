import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ReactNode } from "react"

interface DeleteConfirmationDialogProps {
  /** Se o diálogo está aberto */
  isOpen: boolean
  /** Função para controlar o estado do diálogo */
  onOpenChange: (open: boolean) => void
  /** Função chamada quando a exclusão é confirmada */
  onConfirm: () => void
  /** Nome do item que será excluído */
  itemName: string
  /** Tipo do item (ex: "campus", "curso", "usuário") */
  itemType: string
  /** Se está carregando a exclusão */
  isLoading?: boolean
  /** Elemento trigger customizado (opcional) */
  trigger?: ReactNode
  /** Texto customizado para o botão de exclusão */
  deleteButtonText?: string
  /** Texto customizado para o botão de cancelar */
  cancelButtonText?: string
  /** Descrição customizada para o diálogo */
  customDescription?: string
}

export function DeleteConfirmationDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  itemName,
  itemType,
  isLoading = false,
  trigger,
  deleteButtonText = "Excluir",
  cancelButtonText = "Cancelar",
  customDescription,
}: DeleteConfirmationDialogProps) {
  const defaultTrigger = (
    <Button
      variant="outline"
      size="sm"
      className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:border-red-700"
    >
      <Trash2 className="h-4 w-4 mr-1" />
      Excluir
    </Button>
  )

  const defaultDescription = `Tem certeza que deseja excluir ${itemType} <strong>${itemName}</strong>? Esta ação não pode ser desfeita.`

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription
            dangerouslySetInnerHTML={{
              __html: customDescription || defaultDescription,
            }}
          />
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : deleteButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}