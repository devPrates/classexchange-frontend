import { AboutSection } from "@/components/pages/about-section";
import { HeroSection } from "@/components/pages/hero-section";
import { Navigation } from "@/components/pages/navigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
    </main>
  )
}
