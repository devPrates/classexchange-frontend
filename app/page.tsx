import { ThemeToggleButton } from "@/components/theme/theme-toggle-button";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-1 items-center justify-around">
      
      <h1 className="text-4xl font-bold mb-8">ClassExchange</h1>
      <div className="flex space-x-2">
        <ThemeToggleButton
          variant="gif"
          url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
        />
        <Button asChild className="flex items-center">

          <Link href="/dashboard">
            Entrar
            <ArrowRight />
          </Link>
        </Button>

      </div>
    </div>
  );
}
