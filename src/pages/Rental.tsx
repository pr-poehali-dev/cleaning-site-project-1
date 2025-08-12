import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const RentalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('default');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [rentals, setRentals] = useState<Array<{id: number, startDate: Date, days: number}>>([]);

  const equipment = [
    {
      id: 1,
      title: "Профессиональный пылесос KARCHER",
      description: "Мощный пылесос для сухой и влажной уборки с системой фильтрации HEPA",
      pricePerDay: 800,
      pricePerWeek: 4500,
      category: "vacuum",
      brand: "Karcher",
      power: "1400 Вт",
      capacity: "30 л",
      rating: 4.8,
      available: true,
      image: "🔌",
      features: ["HEPA фильтр", "Сухая/влажная уборка", "Мощное всасывание", "Большой бак"],
      specifications: {
        "Мощность": "1400 Вт",
        "Объем бака": "30 литров", 
        "Вес": "12 кг",
        "Длина шнура": "10 м"
      }
    },
    {
      id: 2,
      title: "Парогенератор STEAM MASTER",
      description: "Профессиональный парогенератор для химической очистки без использования моющих средств",
      pricePerDay: 600,
      pricePerWeek: 3500,
      category: "steam",
      brand: "SteamMaster",
      power: "2000 Вт",
      capacity: "4 л",
      rating: 4.6,
      available: true,
      image: "💨",
      features: ["Без химии", "Высокое давление", "Быстрый нагрев", "Экологично"],
      specifications: {
        "Мощность": "2000 Вт",
        "Объем резервуара": "4 литра",
        "Давление": "6 бар",
        "Время нагрева": "3 минуты"
      }
    },
    {
      id: 3,
      title: "Поломоечная машина SCRUBBER PRO",
      description: "Самоходная поломоечная машина для уборки больших площадей",
      pricePerDay: 1200,
      pricePerWeek: 7000,
      category: "scrubber",
      brand: "ScrubberPro",
      power: "24В",
      capacity: "50 л",
      rating: 4.9,
      available: false,
      image: "🚿",
      features: ["Самоходная", "Два бака", "Широкая щетка", "Автоматическая"],
      specifications: {
        "Ширина уборки": "51 см",
        "Производительность": "1800 м²/ч",
        "Объем баков": "50/55 л",
        "Время работы": "3 часа"
      }
    },
    {
      id: 4,
      title: "Ковромойка CARPET CLEAN",
      description: "Профессиональная машина для глубокой чистки ковров и мягкой мебели",
      pricePerDay: 700,
      pricePerWeek: 4000,
      category: "carpet",
      brand: "CarpetClean", 
      power: "1200 Вт",
      capacity: "12 л",
      rating: 4.4,
      available: true,
      image: "🧽",
      features: ["Глубокая чистка", "Быстрая сушка", "Удаление пятен", "Насадки в комплекте"],
      specifications: {
        "Мощность": "1200 Вт",
        "Объем бака": "12 литров",
        "Давление": "3 бар",
        "Ширина чистки": "25 см"
      }
    },
    {
      id: 5,
      title: "Промышленный пылесос INDUSTRIAL",
      description: "Сверхмощный пылесос для строительного мусора и тяжелых загрязнений",
      pricePerDay: 900,
      pricePerWeek: 5500,
      category: "vacuum",
      brand: "Industrial",
      power: "3000 Вт",
      capacity: "80 л", 
      rating: 4.7,
      available: true,
      image: "⚡",
      features: ["Сверхмощный", "Строительный мусор", "Большой объем", "Автоочистка фильтра"],
      specifications: {
        "Мощность": "3000 Вт",
        "Объем бака": "80 литров",
        "Разрежение": "250 мбар",
        "Производительность": "440 м³/ч"
      }
    },
    {
      id: 6,
      title: "Роторная машина ROTARY POWER",
      description: "Универсальная роторная машина для полировки, шлифовки и кристаллизации полов",
      pricePerDay: 1000,
      pricePerWeek: 6000,
      category: "floor",
      brand: "RotaryPower",
      power: "1500 Вт",
      capacity: "-",
      rating: 4.5,
      available: true,
      image: "⚙️",
      features: ["Полировка полов", "Разные насадки", "Регулировка скорости", "Профессиональная"],
      specifications: {
        "Мощность": "1500 Вт", 
        "Диаметр щетки": "43 см",
        "Скорость": "154 об/мин",
        "Вес": "52 кг"
      }
    }
  ];

  const categories = [
    { value: 'all', label: 'Вся техника' },
    { value: 'vacuum', label: 'Пылесосы' },
    { value: 'steam', label: 'Парогенераторы' },
    { value: 'scrubber', label: 'Поломоечные машины' },
    { value: 'carpet', label: 'Ковромойки' },
    { value: 'floor', label: 'Машины для пола' }
  ];

  const filteredEquipment = equipment
    .filter(item => 
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (priceSort === 'asc') return a.pricePerDay - b.pricePerDay;
      if (priceSort === 'desc') return b.pricePerDay - a.pricePerDay;
      if (priceSort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const addToRentals = (equipmentId: number, days: number = 1) => {
    if (selectedDate) {
      setRentals([...rentals, {
        id: equipmentId,
        startDate: selectedDate,
        days
      }]);
    }
  };

  const getRentalCount = (equipmentId: number) => {
    return rentals.filter(rental => rental.id === equipmentId).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Аренда техники</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональное оборудование для клининга в аренду
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Дата аренды</CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Icon name="Calendar" size={16} className="mr-2" />
                      {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: ru }) : "Выберите дату"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <Input
                    placeholder="Найти технику..."
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
                  <label className="text-sm font-medium mb-2 block">Сортировка</label>
                  <Select value={priceSort} onValueChange={setPriceSort}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">По умолчанию</SelectItem>
                      <SelectItem value="asc">Цена: по возрастанию</SelectItem>
                      <SelectItem value="desc">Цена: по убыванию</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {rentals.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">К аренде</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Позиций: {rentals.length}
                      </span>
                      <Button variant="outline" size="sm">
                        <Icon name="Calendar" size={14} className="mr-1" />
                        Оформить
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-3/4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                Найдено позиций: <span className="font-semibold">{filteredEquipment.length}</span>
              </p>
            </div>

            <div className="grid gap-6">
              {filteredEquipment.map(item => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.image}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={item.available ? "default" : "destructive"} className="text-xs">
                              {item.available ? 'Доступно' : 'Занято'}
                            </Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Icon name="Star" size={14} className="text-yellow-400 fill-current mr-1" />
                              {item.rating}
                            </div>
                          </div>
                          <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {item.brand} • {item.power}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{item.pricePerDay} ₽</div>
                        <div className="text-sm text-muted-foreground">за день</div>
                        <div className="text-sm text-muted-foreground">
                          {item.pricePerWeek} ₽/неделя
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {item.description}
                    </CardDescription>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold mb-2">Особенности:</h4>
                        <div className="flex flex-wrap gap-1">
                          {item.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Характеристики:</h4>
                        <div className="space-y-1 text-sm">
                          {Object.entries(item.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-muted-foreground">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToRentals(item.id, 1)}
                          disabled={!item.available || !selectedDate}
                        >
                          1 день
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToRentals(item.id, 3)}
                          disabled={!item.available || !selectedDate}
                        >
                          3 дня
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToRentals(item.id, 7)}
                          disabled={!item.available || !selectedDate}
                        >
                          Неделя
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getRentalCount(item.id) > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {getRentalCount(item.id)}
                          </Badge>
                        )}
                        <Button
                          onClick={() => addToRentals(item.id)}
                          disabled={!item.available || !selectedDate}
                        >
                          <Icon name="Calendar" size={16} className="mr-2" />
                          Забронировать
                        </Button>
                      </div>
                    </div>

                    {!selectedDate && (
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        Выберите дату аренды для бронирования
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEquipment.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Техника не найдена</h3>
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

export default RentalPage;