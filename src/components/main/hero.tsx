import { ArrowUpRight, Badge, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "./background-pattern";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" id="home">
      <BackgroundPattern />
      <div className="relative z-10 text-center max-w-2xl mt-[-66px]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
          Sistema de <span className="text-primary">Troca</span> e <span className="text-primary">Substituição</span> de Aulas
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          Automatize trocas e substituições de aulas com nosso sistema inteligente, reduzindo erros,
           otimizando a comunicação e garantindo eficiência acadêmica.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="text-base">
            Começar Agora 
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base shadow-none"
          >
            Saiba Mais <ArrowUpRight className="!h-5 !w-5" /> 
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Hero;