import { Link } from "react-router-dom";
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Icon name="Sparkles" size={24} className="text-primary" />
              <span className="text-xl font-bold">ХочуКлининг</span>
            </Link>
            <p className="text-muted-foreground">
              Профессиональные услуги клининга в Севастополе с гарантией качества.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={16} />
                <span>+7 (978) 290-92-92</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} />
                <span>info@xochuklinning.ru</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span>г. Севастополь, ул. Правды 10/8, оф. 5</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">Все услуги</Link></li>
              <li><a href="#calculator" className="hover:text-primary transition-colors">Калькулятор стоимости</a></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Генеральная уборка</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Поддерживающая уборка</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Мытье окон</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Химчистка мебели</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Каталоги</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">Товары</Link></li>
              <li><Link to="/rental" className="hover:text-primary transition-colors">Аренда техники</Link></li>
              <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
              <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors text-xs">Администрирование</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">О компании</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Гарантии качества</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Условия работы</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Вакансии</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground">
            <p>&copy; 2024 ХочуКлининг. Все права защищены.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="MessageCircle" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Phone" size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;