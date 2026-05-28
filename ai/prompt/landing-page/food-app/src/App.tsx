import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import SocialProof from './sections/SocialProof';
import HowItWorks from './sections/HowItWorks';
import FeatureHighlights from './sections/FeatureHighlights';
import AppPreview from './sections/AppPreview';
import PromoBanner from './sections/PromoBanner';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <HowItWorks />
        <FeatureHighlights />
        <AppPreview />
        <PromoBanner />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
