import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="/img/b4f5921d-1d78-4fd3-b552-bbc4d7047c58.jpg" 
          alt="Профессиональная уборка" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Профессиональная уборка
            <span className="text-primary block">в Москве</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Доверьте уборку профессионалам! Гарантия качества, современное оборудование, 
            эко-средства и индивидуальный подход к каждому клиенту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Icon name="Phone" size={20} className="mr-2" />
              Заказать уборку
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать стоимость  
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;