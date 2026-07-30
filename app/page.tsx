import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import ShowcaseSection from "@/components/public/ShowcaseSection";
import RegistrationForm from "@/components/public/RegistrationForm";
import CookieBanner from "@/components/public/CookieBanner";
import Footer from "@/components/public/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ShowcaseSection />
        <RegistrationForm />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
