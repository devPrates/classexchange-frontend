import About from "@/components/main/about";
import Contact from "@/components/main/contact";
import Footer from "@/components/main/footer";
import Hero from "@/components/main/hero";
import Navbar from "@/components/main/navbar";



export default function Home() {
  return (
    <main >
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
