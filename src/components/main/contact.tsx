import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";

export default function Contact() {
    return (
        <div className="min-h-screen flex items-center justify-center pt-12 md:pt-16 pb-16" id="contato">
            <div className="w-full max-w-screen-xl mx-auto px-6 xl:px-0">
                <b className="">Contate-nos</b>
                <h2 className="mt-3 text-2xl md:text-4xl font-black tracking-tight">
                    Adoraríamos ouvir de você
                </h2>
                <p className="mt-4 text-base sm:text-lg">
                   Nossa equipe está sempre aqui para conversar.
                </p>
                <div className="mt-14 md:mt-24 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-secondary/10 p-6 pb-10 rounded-lg">
                        <div className="h-12 w-12 flex items-center justify-center bg-secondary rounded-full">
                            <MailIcon />
                        </div>
                        <h3 className="mt-8 font-bold text-xl">Email</h3>
                        <p className="mt-2.5 mb-4 text-muted-foreground">
                            Nossa equipe está aqui para ajudar.
                        </p>
                        <Link
                            className="font-bold  tracking-tight"
                            href=""
                        >
                            example@gmail.com
                        </Link>
                    </div>
                    <div className="bg-secondary/10 p-6 pb-10 rounded-lg">
                        <div className="h-12 w-12 flex items-center justify-center bg-secondary -foreground rounded-full">
                            <MapPinIcon />
                        </div>
                        <h3 className="mt-8 font-bold text-xl">NTI</h3>
                        <p className="mt-2.5 mb-4 text-muted-foreground">
                            Venha dizer olá em nosso núcleo.
                        </p>
                        <Link
                            className="font-bold  tracking-tight"
                            href=""
                            target="_blank"
                        >
                            Rua Exemplo, 000 - Bairro Exemplo
                        </Link>
                    </div>
                    <div className="bg-secondary/10 p-6 pb-10 rounded-lg">
                        <div className="h-12 w-12 flex items-center justify-center bg-secondary -foreground rounded-full">
                            <PhoneIcon />
                        </div>
                        <h3 className="mt-8 font-bold text-xl">Phone</h3>
                        <p className="mt-2.5 mb-4 text-muted-foreground">
                            Seg-Sex das 8am as 5pm.
                        </p>
                        <Link
                            className="font-bold  tracking-tight"
                            href="tel:akashmoradiya3444@gmail.com"
                        >
                            +15 (67) 000-0000
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}