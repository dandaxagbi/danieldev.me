import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import FeaturedVideoSection from "./components/FeaturedVideoSection";
import PhilosophySection from "./components/PhilosophySection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import EducationSection from "./components/EducationSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <PortfolioSection />
      <EducationSection />
      <CTASection />
      <Footer />
    </div>
  );
}
