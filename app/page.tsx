import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
          Classexchange
        </h1>
        <Button>
          Começar
        </Button>
      </div>
    </div>
  );
}
