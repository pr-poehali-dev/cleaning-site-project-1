import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [calcArea, setCalcArea] = useState('');
  const [calcRooms, setCalcRooms] = useState('');
  const [calcWindows, setCalcWindows] = useState('');
  const [calcService, setCalcService] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(0);

  const calculatePrice = () => {
    const area = parseInt(calcArea) || 0;
    const rooms = parseInt(calcRooms) || 0;
    const windows = parseInt(calcWindows) || 0;
    
    let basePrice = 0;
    if (calcService === 'basic') basePrice = area * 50;
    if (calcService === 'deep') basePrice = area * 80;
    if (calcService === 'premium') basePrice = area * 120;
    
    const roomsPrice = rooms * 500;
    const windowsPrice = windows * 150;
    
    setCalculatedPrice(basePrice + roomsPrice + windowsPrice);
  };

  const services = [
    {
      title: "Генеральная уборка",
      description: "Комплексная уборка всех помещений с использованием профессиональных средств",
      price: "от 80 ₽/м²",
      icon: "Sparkles"
    },
    {
      title: "Поддерживающая уборка", 
      description: "Регулярная поддерживающая уборка для поддержания чистоты",
      price: "от 50 ₽/м²",
      icon: "Broom"
    },
    {
      title: "Мытье окон",
      description: "Профессиональное мытье окон с обеих сторон",
      price: "от 150 ₽/окно",
      icon: "Wind"
    },
    {
      title: "Химчистка мебели",
      description: "Глубокая чистка мягкой мебели и ковров",
      price: "от 300 ₽/м²", 
      icon: "Sofa"
    }
  ];

  const products = [
    {
      title: "Универсальное чистящее средство",
      description: "Эффективное средство для всех поверхностей",
      price: "450 ₽",
      image: "🧽"
    },
    {
      title: "Средство для стекол",
      description: "Без разводов и запаха", 
      price: "320 ₽",
      image: "🪟"
    },
    {
      title: "Дезинфицирующий спрей",
      description: "Убивает 99.9% бактерий и вирусов",
      price: "380 ₽", 
      image: "🦠"
    }
  ];

  const equipment = [
    {
      title: "Профессиональный пылесос",
      description: "Мощный пылесос для глубокой чистки",
      price: "800 ₽/день",
      image: "🔌"
    },
    {
      title: "Парогенератор",
      description: "Паровая очистка без химии",
      price: "600 ₽/день", 
      image: "💨"
    },
    {
      title: "Поломоечная машина",
      description: "Для больших площадей",
      price: "1200 ₽/день",
      image: "🚿"
    }
  ];

  const reviews = [
    {
      name: "Анна Смирнова",
      rating: 5,
      text: "Отличная работа! Квартира сияет чистотой. Приедут снова обязательно!"
    },
    {
      name: "Михаил Петров", 
      rating: 5,
      text: "Быстро, качественно, недорого. Рекомендую всем друзьям и знакомым."
    },
    {
      name: "Елена Козлова",
      rating: 4,
      text: "Хороший сервис. Немного опоздали, но убрали очень хорошо."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр клининговых услуг для дома и офиса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <Icon name={service.icon} size={48} className="text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <Badge className="mx-auto">{service.price}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                  <Button className="w-full mt-4">Заказать</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Калькулятор стоимости</h2>
              <p className="text-xl text-muted-foreground">
                Рассчитайте примерную стоимость уборки
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Параметры уборки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Площадь (м²)</Label>
                    <Input 
                      id="area"
                      type="number" 
                      value={calcArea}
                      onChange={(e) => setCalcArea(e.target.value)}
                      placeholder="Введите площадь"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service">Тип уборки</Label>
                    <Select value={calcService} onValueChange={setCalcService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Поддерживающая (50₽/м²)</SelectItem>
                        <SelectItem value="deep">Генеральная (80₽/м²)</SelectItem>
                        <SelectItem value="premium">Премиум (120₽/м²)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rooms">Количество комнат</Label>
                    <Input 
                      id="rooms"
                      type="number" 
                      value={calcRooms}
                      onChange={(e) => setCalcRooms(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="windows">Количество окон</Label>
                    <Input 
                      id="windows"
                      type="number" 
                      value={calcWindows}
                      onChange={(e) => setCalcWindows(e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <Button onClick={calculatePrice} className="w-full" size="lg">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать стоимость
                </Button>
                
                {calculatedPrice > 0 && (
                  <div className="text-center p-6 bg-primary/10 rounded-lg">
                    <p className="text-lg text-foreground">Примерная стоимость:</p>
                    <p className="text-3xl font-bold text-primary">{calculatedPrice.toLocaleString()} ₽</p>
                    <Button className="mt-4">Оформить заказ</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shop and Rental Tabs */}
      <section id="shop" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Магазин и аренда</h2>
            <p className="text-xl text-muted-foreground">
              Товары для уборки и аренда профессионального оборудования
            </p>
          </div>
          
          <Tabs defaultValue="products" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="products" className="text-lg">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Товары для уборки
              </TabsTrigger>
              <TabsTrigger value="rental" className="text-lg">
                <Icon name="Wrench" size={20} className="mr-2" />
                Аренда техники
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="grid md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-4">{product.image}</div>
                      <CardTitle>{product.title}</CardTitle>
                      <Badge variant="secondary" className="text-lg px-3 py-1">{product.price}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center mb-4">
                        {product.description}
                      </CardDescription>
                      <Button className="w-full">
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rental">
              <div className="grid md:grid-cols-3 gap-6">
                {equipment.map((item, index) => (
                  <Card key={index}>
                    <CardHeader className="text-center">
                      <div className="text-6xl mb-4">{item.image}</div>
                      <CardTitle>{item.title}</CardTitle>
                      <Badge className="text-lg px-3 py-1">{item.price}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center mb-4">
                        {item.description}
                      </CardDescription>
                      <Button className="w-full">
                        <Icon name="Calendar" size={16} className="mr-2" />
                        Забронировать
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground">
              Что говорят о нас наши клиенты
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{review.name}</CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    "{review.text}"
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <span>info@klinpro.ru</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <span>г. Москва, ул. Примерная, д. 1</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <span>Пн-Вс: 8:00-22:00</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Написать директору</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Ваше сообщение" />
                  </div>
                  <Button className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Sparkles" size={24} className="text-primary" />
                <span className="text-xl font-bold">КлинПро</span>
              </div>
              <p className="text-muted-foreground">
                Профессиональные услуги клининга в Москве с гарантией качества.
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
            <p>&copy; 2024 КлинПро. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;