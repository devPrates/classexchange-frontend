import { HandHelping, Users, Zap } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: <HandHelping className="h-auto w-5" />,
    title: "Flexible Support",
    description:
      "Benefit from around-the-clock assistance to keep your business running smoothly.",
  },
  {
    id: 2,
    icon: <Users className="h-auto w-5" />,
    title: "Collaborative Tools",
    description:
      "Enhance teamwork with tools designed to simplify project management and communication.",
  },
  {
    id: 3,
    icon: <Zap className="h-auto w-5" />,
    title: "Lightning Fast Speed",
    description:
      "Experience the fastest load times with our high-performance servers.",
  },
];

export default function Hero() {
  return (
    <section className="py-8">
      <div className="container mx-auto overflow-hidden">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline">ClassExchage</Badge>
          <h1 className="text-4xl font-semibold lg:text-5xl">
            Sistema de Troca e Subsitituição de Aula
          </h1>
        </div>
        <div className="relative mx-auto max-w-screen-lg">
          <div className="w-full flex justify-center">
            <Image
              src='/logo-circle.svg'
              width={250}
              height={50}
              alt="asdasd"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-screen-lg flex-col md:flex-row">
          {features.map((feature, index) => (
            <div key={feature.id} className="flex flex-row items-center">
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-6 hidden h-auto w-[2px] bg-gradient-to-b from-muted via-transparent to-muted md:block"
                />
              )}
              <div className="flex grow basis-0 flex-col rounded-md bg-background p-4">
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

