"use client";

import { cn } from "@/lib/utils";
import DotPattern from "./dot-pattern";
import Particles from "./particles";
export const BackgroundPattern = () => {
  return (
    <>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]",
          "dark:fill-slate-700"
        )}
      />
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={"#000"}
        refresh
      />
    </>
  );
};
