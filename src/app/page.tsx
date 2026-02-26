import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Portfolio from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Portfolio />
    </main>
  );
}
