import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-foreground">КлинПро</span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#shop" className="text-foreground hover:text-primary transition-colors">Магазин</a>
            <a href="#rental" className="text-foreground hover:text-primary transition-colors">Аренда</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition-colors">Калькулятор</a>
            <a href="#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </div>
          <Button>Личный кабинет</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;