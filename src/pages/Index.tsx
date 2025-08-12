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
        
        {/* Корзина - компактная в правом нижнем углу */}
        <div className="fixed right-4 bottom-20 w-72 z-40 max-h-[60vh] overflow-y-auto">
          <Cart />
        </div>
        
        <AdminToggle />
      </div>
    </AdminProvider>
  );
};

export default Index;