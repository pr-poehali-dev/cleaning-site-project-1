import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CalculatorAdmin from '@/components/CalculatorAdmin';
import ShopAndRental from '@/components/ShopAndRental';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { AdminProvider, AdminToggle } from '@/components/AdminMode';

const Index = () => {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <Services />
        <CalculatorAdmin />
        <ShopAndRental />
        <Reviews />
        <Contact />
        <Footer />
        
        {/* Корзина - фиксированная справа */}
        <div className="fixed right-4 top-20 w-80 z-40 max-h-[80vh] overflow-y-auto">
          <Cart />
        </div>
        
        <AdminToggle />
      </div>
    </AdminProvider>
  );
};

export default Index;