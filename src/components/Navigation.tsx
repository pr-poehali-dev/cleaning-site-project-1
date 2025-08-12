import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from '@/components/ui/icon';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Sparkles" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-foreground">ХочуКлининг</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/services" className="text-foreground hover:text-primary transition-colors">Услуги</Link>
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">Товары</Link>
            <Link to="/rental" className="text-foreground hover:text-primary transition-colors">Аренда</Link>
            <Link to="/#calculator" className="text-foreground hover:text-primary transition-colors">Калькулятор</Link>
            <Link to="/#reviews" className="text-foreground hover:text-primary transition-colors">Отзывы</Link>
            <Link to="/#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/admin" className="text-sm text-foreground hover:text-primary transition-colors">Админ</Link>
            <Button>Личный кабинет</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;