'use client'
import { Button } from "@/components/ui/button"
import Image from 'next/image'


export default function NotFound() {
  return (
    <section className="bg-white dark:bg-background">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-primary">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Não Encontramos esta Página</h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
          Desculpe, a página que você procura não existe.</p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button onClick={() => window.history.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
              <span>Voltar a página anterior</span>
            </Button>

            <Button variant={'outline'} onClick={() => window.location.href = "/"}>
              Voltar para Home
            </Button>
          </div>

          <div className="mt-10 space-y-6">
            <div>
              <a href="#" className="inline-flex items-center text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                <span>Documentação</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Mergulhe para saber tudo sobre nosso sitema.</p>
            </div>

            <div>
              <a href="#" className="inline-flex items-center text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                <span>Nosso blog</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Leia as últimas postagens em nosso blog.</p>
            </div>

            <div>
              <a href="#" className="inline-flex items-center text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline">
                <span>Chat para suporte</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </a>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Nossa equipe está aqui para ajudar.</p>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <Image 
            src={'/not-found.svg'}
            width={500}
            height={200}
            alt='Página não encontrada'
          />
        </div>
      </div>
    </section>
  )
}
