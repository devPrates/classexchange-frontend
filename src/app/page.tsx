import About from "@/components/main/about";
import Footer from "@/components/main/footer";
import Hero from "@/components/main/hero";
import Navbar from "@/components/main/navbar";



export default function Home() {
  return (
    <main >
      <Navbar />
      <Hero />
      <About />
      <Footer />
    </main>
  );
}
