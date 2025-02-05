import { Button } from "@/components/ui/button";
import { ArrowRight, BellRing, Settings2 } from "lucide-react";

export default function About() {
    return (
        <div className="min-h-screen flex items-center justify-center" id="sobre">
            <div className="w-full max-w-screen-lg mx-auto py-12 px-6">
                <h2 className="text-3xl leading-10 sm:text-4xl md:text-[40px] md:leading-[3.25rem] font-black tracking-tight">
                    Economize seu tempo: <br />
                    Troca ou Substituição em Minutos
                </h2>
                <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Media 1 Mobile */}
                        <div className="md:hidden mb-6 aspect-video w-full bg-background border rounded-xl"></div>
                        <span className="text-2xl font-bold tracking-tight">
                            Troca de Aula
                        </span>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <div className="flex items-start gap-3">
                                    <Settings2 className="shrink-0" />
                                    <p className="-mt-0.5">
                                        Realize uma troca apenas selecionado qual aula deseja trocar e o sistema procurara um professor disponível para realizar a troca.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-start gap-3">
                                    <BellRing className="shrink-0" />
                                    <p className="-mt-0.5">
                                        O sistema irá notificar o professor que você deseja realizar uma troca.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <Button className="mt-12 w-full">
                            Começar Agora <ArrowRight />
                        </Button>
                    </div>
                    {/* Media 1 Desktop */}
                    <div className="hidden md:block border border-border/80 bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2"></div>
                    {/* Media 2 Desktop */}
                    <div className="hidden md:block border border-border/80 bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2"></div>
                    {/* Card 2 */}
                    <div className="bg-muted rounded-xl pt-6 md:pt-8 pb-6 px-6 col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Media 2 Mobile */}
                        <div className="md:hidden mb-6 aspect-video w-full bg-background border rounded-xl"></div>
                        <span className="text-2xl font-bold tracking-tight">
                            Substituição de Aula
                        </span>
                        <ul className="mt-6 space-y-4">
                            <li>
                                <div className="flex items-start gap-3">
                                    <Settings2 className="shrink-0" />
                                    <p className="-mt-0.5">
                                        Realize uma substituição apenas selecionado qual aula deseja e o sistema procurara um professor disponível para realizar a substituição.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-start gap-3">
                                    <BellRing className="shrink-0" />
                                    <p className="-mt-0.5">
                                    O sistema irá notificar o professor que você deseja realizar uma substituição.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        <Button className="mt-12 w-full">
                            Começar Agora <ArrowRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}