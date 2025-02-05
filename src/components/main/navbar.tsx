'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

const SECTIONS = ["home", "sobre",  "contato"];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Atualiza o estado quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);

      let currentSection = activeSection;
      SECTIONS.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <header className={`sticky inset-x-0 top-0 z-50 ${isScrolled ? 'bg-white shadow-md dark:bg-background dark:border-b dark:text-white' : 'bg-transparent'}`}>
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Logo />
        <MobileMenuButton onOpen={() => setMobileMenuOpen(true)} />
        <DesktopMenu activeSection={activeSection} />
        <LoginButton />
      </nav>
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
      />
    </header>
  );
}

const Logo = () => (
  <div className="flex lg:flex-1">
    <Image src="/ClassExchange.svg" alt="Logo do projeto" width={200} height={100} />
  </div>
);

const MobileMenuButton = ({ onOpen }: { onOpen: () => void }) => (
  <div className="flex lg:hidden">
    <button
      type="button"
      onClick={onOpen}
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white"
    >
      <span className="sr-only">Abrir menu</span>
      <Bars3Icon className="h-6 w-6" />
    </button>
  </div>
);

const DesktopMenu = ({ activeSection }: { activeSection: string }) => (
  <div className="hidden lg:flex lg:gap-x-12">
    {SECTIONS.map((section) => (
      <button
        key={section}
        onClick={() => scrollToSection(section)}
        className={`${activeSection === section ? 'text-green-500' : ''
          } font-medium hover:text-green-500`}
      >
        {capitalize(section)}
      </button>
    ))}
  </div>
);

const LoginButton = () => (
  <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-2 lg:items-center">
    <Link href="/auth/login">
      <Button size="sm" variant="outline">
        Login
      </Button>
    </Link>
  </div>
);

const MobileMenu = ({
  isOpen,
  onClose,
  activeSection,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}) => (
  <Dialog open={isOpen} onClose={onClose} className="lg:hidden">
    <div className="fixed inset-0 z-50" />
    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-black dark:text-white">
      <div className="flex items-center justify-between">
        <Logo />
        <button
          type="button"
          onClick={onClose}
          className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
        >
          <span className="sr-only">Fechar menu</span>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="flex flex-col items-start space-y-2 py-6">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollToSection(section);
                  onClose();
                }}
                className={`${activeSection === section ? 'text-green-500' : ''
                  } hover:underline`}
              >
                {capitalize(section)}
              </button>
            ))}
          </div>
          <div className="py-6">
            <div className='flex gap-2'>
              <Link href="/dashboard" className="">
                <Button size={'sm'} variant={'outline'}>
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DialogPanel>
  </Dialog>
);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);