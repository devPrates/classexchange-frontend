
import { Separator } from "@/components/ui/separator";
import {
  DribbbleIcon,
  GithubIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const footerLinks = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "Sobre",
    href: "#",
  },
  {
    title: "Contato",
    href: "#",
  }
];

export default function Footer() {
    return (
      <div className="flex flex-col border-t-[1px]">
        <div className="grow bg-muted" />
        <footer>
          <div className="max-w-screen-xl mx-auto">
            <div className="py-12 flex flex-col justify-start items-center">
              {/* Logo */}
              <Image src="/ClassExchange.svg" alt="Logo do projeto" width={250} height={100} />
              <ul className="mt-6 flex items-center gap-4 flex-wrap">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground font-medium"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
            <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
              {/* Copyright */}
              <span className="text-muted-foreground">
                &copy; {new Date().getFullYear()}{" "}
                <Link href="/" target="_blank">
                  ClassExchange
                </Link>
                . Todos os direitos reservados.
              </span>
              <div className="flex items-center gap-5 text-muted-foreground">
                <Link href="#" target="_blank">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link href="#" target="_blank">
                  <DribbbleIcon className="h-5 w-5" />
                </Link>
                <Link href="#" target="_blank">
                  <TwitchIcon className="h-5 w-5" />
                </Link>
                <Link href="#" target="_blank">
                  <GithubIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  