import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('default');

  const services = [
    {
      id: 1,
      title: "Генеральная уборка квартиры",
      description: "Комплексная уборка всех помещений квартиры с использованием профессиональных средств и оборудования",
      price: "от 80 ₽/м²",
      minPrice: 80,
      category: "cleaning",
      duration: "3-6 часов",
      included: ["Влажная уборка всех поверхностей", "Мытье окон", "Уборка санузлов", "Пылесос ковров"],
      icon: "Home"
    },
    {
      id: 2,
      title: "Генеральная уборка офиса",
      description: "Профессиональная уборка офисных помещений в удобное время",
      price: "от 60 ₽/м²", 
      minPrice: 60,
      category: "office",
      duration: "2-4 часа",
      included: ["Уборка рабочих мест", "Мытье стекол", "Дезинфекция поверхностей", "Вынос мусора"],
      icon: "Building"
    },
    {
      id: 3,
      title: "Поддерживающая уборка",
      description: "Регулярная уборка для поддержания чистоты в доме или офисе",
      price: "от 50 ₽/м²",
      minPrice: 50,
      category: "cleaning", 
      duration: "1-3 часа",
      included: ["Влажная уборка", "Пылесос", "Мытье полов", "Уборка кухни и санузла"],
      icon: "Sparkles"
    },
    {
      id: 4,
      title: "Мытье окон (квартира)",
      description: "Профессиональное мытье окон с обеих сторон без разводов",
      price: "от 150 ₽/окно",
      minPrice: 150,
      category: "windows",
      duration: "30 мин/окно", 
      included: ["Мытье с двух сторон", "Чистка подоконников", "Уборка рам", "Без разводов"],
      icon: "Wind"
    },
    {
      id: 5,
      title: "Мытье окон (офис)",
      description: "Мытье больших офисных окон и витрин",
      price: "от 120 ₽/м²",
      minPrice: 120,
      category: "windows",
      duration: "20 мин/м²",
      included: ["Мытье витрин", "Высотные работы", "Профессиональные средства", "Быстрое выполнение"],
      icon: "Building2"
    },
    {
      id: 6,
      title: "Химчистка мягкой мебели",
      description: "Глубокая чистка диванов, кресел и матрасов",
      price: "от 300 ₽/м²",
      minPrice: 300,
      category: "furniture",
      duration: "1 час/предмет",
      included: ["Удаление пятен", "Антибактериальная обработка", "Устранение запахов", "Быстрое высыхание"],
      icon: "Sofa"
    },
    {
      id: 7,
      title: "Химчистка ковров",
      description: "Профессиональная чистка ковров и ковровых покрытий",
      price: "от 200 ₽/м²", 
      minPrice: 200,
      category: "furniture",
      duration: "30 мин/м²",
      included: ["Глубокая чистка", "Удаление запахов", "Антиаллергенная обработка", "Быстрая сушка"],
      icon: "Square"
    },
    {
      id: 8,
      title: "Уборка после ремонта",
      description: "Специализированная уборка помещений после строительных работ",
      price: "от 120 ₽/м²",
      minPrice: 120,
      category: "special",
      duration: "4-8 часов",
      included: ["Удаление строительной пыли", "Мытье всех поверхностей", "Уборка мусора", "Полировка"],
      icon: "Hammer"
    },
    {
      id: 9,
      title: "Дезинфекция помещений",
      description: "Профессиональная дезинфекция для безопасности",
      price: "от 40 ₽/м²",
      minPrice: 40,
      category: "special",
      duration: "1-2 часа",
      included: ["Антибактериальная обработка", "Устранение вирусов", "Безопасные средства", "Сертификат"],
      icon: "Shield"
    }
  ];

  const categories = [
    { value: 'all', label: 'Все услуги' },
    { value: 'cleaning', label: 'Уборка помещений' },
    { value: 'office', label: 'Офисная уборка' },
    { value: 'windows', label: 'Мытье окон' },
    { value: 'furniture', label: 'Химчистка' },
    { value: 'special', label: 'Специальные услуги' }
  ];

  const filteredServices = services
    .filter(service => 
      (categoryFilter === 'all' || service.category === categoryFilter) &&
      (service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       service.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (priceSort === 'asc') return a.minPrice - b.minPrice;
      if (priceSort === 'desc') return b.minPrice - a.minPrice;
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Каталог услуг</h1>
          <p className="text-xl text-muted-foreground">
            Полный перечень услуг клининга с подробным описанием и ценами
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/5">
            <Card>
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <Input
                    placeholder="Найти услугу..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Категория</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сортировка по цене</label>
                  <Select value={priceSort} onValueChange={setPriceSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">По умолчанию</SelectItem>
                      <SelectItem value="asc">По возрастанию</SelectItem>
                      <SelectItem value="desc">По убыванию</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-4/5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Найдено услуг: <span className="font-semibold">{filteredServices.length}</span>
              </p>
            </div>

            <div className="grid gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Icon name={service.icon} size={32} className="text-primary" />
                        <div>
                          <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                          <Badge className="mb-2">{service.price}</Badge>
                          <p className="text-sm text-muted-foreground">
                            <Icon name="Clock" size={14} className="inline mr-1" />
                            {service.duration}
                          </p>
                        </div>
                      </div>
                      <Button>Заказать</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base">
                      {service.description}
                    </CardDescription>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Что входит:</h4>
                      <ul className="grid md:grid-cols-2 gap-1 text-sm text-muted-foreground">
                        {service.included.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Icon name="Check" size={14} className="text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Услуги не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServicesPage;