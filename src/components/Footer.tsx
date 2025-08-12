import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Sparkles" size={24} className="text-primary" />
              <span className="text-xl font-bold">ХочуКлининг</span>
            </div>
            <p className="text-muted-foreground">
              Профессиональные услуги клининга в Севастополе с гарантией качества.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Генеральная уборка</li>
              <li>Поддерживающая уборка</li>
              <li>Мытье окон</li>
              <li>Химчистка мебели</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>О нас</li>
              <li>Вакансии</li>
              <li>Отзывы</li>
              <li>Контакты</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Поддержка</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Часто задаваемые вопросы</li>
              <li>Гарантии</li>
              <li>Условия работы</li>
              <li>Политика конфиденциальности</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 ХочуКлининг. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;