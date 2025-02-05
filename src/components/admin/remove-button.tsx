import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { frontendApi } from "@/lib/api";
import { useContext } from "react";
import { CampusTableContext } from "@/context/campus-context";

type RemoveButtonProps = {
    id: number
}

async function removeCampus(id: number) {
    try {
        const url = `/campus/${id}`
        const result = await frontendApi.delete(url)
    } catch (e) {
        console.log(e)
        alert("Erro ao remover campus")
    }
}


export default function RemoveButton({ id }: RemoveButtonProps) {
    const campusTableContext = useContext(CampusTableContext)
    return (
        <Button 
            variant={'outline'} 
            size={'icon'} 
            key={id} 
            onClick={async () => {
                await removeCampus(id)
                campusTableContext.refreshTable()
            }}
        >
                <Trash2 className="stroke-red-500"/>
        </Button>
    )
}