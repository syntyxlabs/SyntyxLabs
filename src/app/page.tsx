import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <main className="relative z-10 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  );
}
