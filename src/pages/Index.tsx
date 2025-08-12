import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Calculator from '@/components/Calculator';
import ShopAndRental from '@/components/ShopAndRental';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Services />
      <Calculator />
      <ShopAndRental />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;