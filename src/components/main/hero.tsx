import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Badge } from "../ui/badge"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative min-h-screen py-32">
      <div className="container mx-auto my-auto">
        <div className="magicpattern absolute inset-x-0 top-0 -z-10 flex h-full w-full items-center justify-center opacity-100" />
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 flex flex-col items-center gap-6 text-center">
            <Image 
                src='/logo-circle.svg'
                width={120}
                height={120}
                alt="icone logo"
            />
            <Badge variant="outline">ClassExchange</Badge>
            <div>
              <h1 className="mb-6 text-pretty text-2xl font-bold lg:text-5xl">
                Software de Troca e Substituição de Aulas
              </h1>
              <p className="text-muted-foreground lg:text-xl">
                Solução para reduzir e facilitar o tempo de troca e substituição de aulas através da nossa base de dados.
              </p>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <Link href='/auth/login'><Button>Fazer Login</Button></Link>
              <Button variant="outline">
                Ler Mais <ExternalLink className="ml-2 h-4" />
              </Button>
            </div>
            <div className="mt-20 flex flex-col items-center gap-4">
              <p className="text-center: text-muted-foreground lg:text-left">
                Construído com tecnologias de código aberto
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                
                  <img
                    src="https://shadcnblocks.com/images/block/logos/shadcn-ui-small.svg"
                    alt="company logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
 
                
                  <img
                    src="https://shadcnblocks.com/images/block/logos/typescript-small.svg"
                    alt="company logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
               

                
                  <img
                    src="https://shadcnblocks.com/images/block/logos/react-icon.svg"
                    alt="company logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                  />
                
                  <img
                    src="https://shadcnblocks.com/images/block/logos/tailwind-small.svg"
                    alt="company logo"
                    className="h-4 saturate-0 transition-all group-hover:saturate-100"
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

