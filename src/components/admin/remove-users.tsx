import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { frontendApi } from "@/lib/api";
import { useContext } from "react";
import { CampusTableContext } from "@/context/campus-context";
import { useToast } from "@/hooks/use-toast";

type RemoveUsersProps = {
    id: number
}

export default function RemoveUsers({ id }: RemoveUsersProps) {
    const { toast } = useToast(); // Inicializa o toast
    const campusTableContext = useContext(CampusTableContext);

    async function removeCampus(id: number) {
        try {
            const url = `/usuarios/${id}`;
            await frontendApi.delete(url);

            // Exibir mensagem de sucesso
            toast({
                title: "Removido com sucesso!",
                description: "O Usuario foi deletado do sistema.",
                variant: "default",
            });

            campusTableContext.refreshTable();
        } catch (e) {
            console.error(e);

            // Exibir mensagem de erro
            toast({
                title: "Erro ao remover",
                description: "Não foi possível remover o campus.",
                variant: "destructive",
            });
        }
    }

    return (
        <Button 
            variant="outline" 
            size="icon" 
            key={id} 
            onClick={() => removeCampus(id)}
        >
            <Trash2 className="stroke-red-500"/>
        </Button>
    );
}
