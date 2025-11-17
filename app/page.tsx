import { AboutSection } from "@/components/pages/about-section";
import { ContactSection } from "@/components/pages/contact-section";
import { FeaturesSection } from "@/components/pages/features-section";
import { Footer } from "@/components/pages/footer";
import { HeroSection } from "@/components/pages/hero-section";
import { Navigation } from "@/components/pages/navigation";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection /> 
      <ContactSection />
      <Footer />
    </main>
  )
}
