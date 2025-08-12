import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('default');
  const [cart, setCart] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      title: "Универсальное чистящее средство CLEAN PRO",
      description: "Эффективное концентрированное средство для всех типов поверхностей. Удаляет жир, грязь и пятна.",
      price: 450,
      originalPrice: 520,
      category: "chemicals",
      brand: "CleanPro",
      volume: "1 литр",
      rating: 4.8,
      inStock: true,
      image: "🧽",
      features: ["Концентрат", "Эко-формула", "Антибактериальное", "Без запаха"]
    },
    {
      id: 2,
      title: "Средство для стекол CRYSTAL",
      description: "Профессиональное средство для мытья окон, зеркал и стеклянных поверхностей без разводов.",
      price: 320,
      originalPrice: 380,
      category: "chemicals", 
      brand: "Crystal",
      volume: "750 мл",
      rating: 4.9,
      inStock: true,
      image: "🪟",
      features: ["Без разводов", "Быстрое действие", "Приятный аромат", "Антистатик"]
    },
    {
      id: 3,
      title: "Дезинфицирующий спрей MEDIC",
      description: "Профессиональный дезинфектант, уничтожает 99.9% бактерий, вирусов и грибков.",
      price: 380,
      originalPrice: 420,
      category: "chemicals",
      brand: "Medic",
      volume: "500 мл", 
      rating: 4.7,
      inStock: true,
      image: "🦠",
      features: ["99.9% защита", "Медицинский стандарт", "Безопасно", "Сертифицировано"]
    },
    {
      id: 4,
      title: "Микрофибровые салфетки Premium (набор 10 шт)",
      description: "Высококачественные салфетки из микрофибры для влажной и сухой уборки.",
      price: 890,
      originalPrice: 1200,
      category: "accessories",
      brand: "Premium",
      volume: "30x30 см",
      rating: 4.6,
      inStock: true,
      image: "🧽",
      features: ["Впитывает воду", "Многоразовые", "Не царапают", "Долговечные"]
    },
    {
      id: 5,
      title: "Швабра с отжимом ULTRACLEAN",
      description: "Современная швабра с системой отжима и насадкой из микрофибры.",
      price: 1250,
      originalPrice: 1500,
      category: "tools",
      brand: "UltraClean", 
      volume: "120 см",
      rating: 4.5,
      inStock: true,
      image: "🧹",
      features: ["Система отжима", "Поворотная головка", "Телескопическая", "Легкая"]
    },
    {
      id: 6,
      title: "Резиновые перчатки PROTECT (размер L)",
      description: "Прочные перчатки для защиты рук при работе с чистящими средствами.",
      price: 180,
      originalPrice: 220,
      category: "accessories",
      brand: "Protect",
      volume: "1 пара",
      rating: 4.3,
      inStock: true,
      image: "🧤",
      features: ["Прочные", "Нескользящие", "Гипоаллергенные", "Удобные"]
    },
    {
      id: 7,
      title: "Средство для удаления накипи LIME-AWAY",
      description: "Мощное средство для удаления известкового налета и ржавчины в ванной и кухне.",
      price: 290,
      originalPrice: 340,
      category: "chemicals",
      brand: "LimeAway",
      volume: "500 мл",
      rating: 4.4,
      inStock: false,
      image: "⚡",
      features: ["Против накипи", "Удаляет ржавчину", "Быстрое действие", "Концентрат"]
    },
    {
      id: 8,
      title: "Ведро с отжимом PROFESSIONAL",
      description: "Профессиональное ведро с встроенной системой отжима швабры.",
      price: 1890,
      originalPrice: 2200,
      category: "tools",
      brand: "Professional",
      volume: "12 литров",
      rating: 4.7,
      inStock: true,
      image: "🪣", 
      features: ["Система отжима", "Колесики", "Прочный пластик", "Эргономичная ручка"]
    },
    {
      id: 9,
      title: "Освежитель воздуха FRESH GARDEN",
      description: "Натуральный освежитель с ароматом свежей зелени для любых помещений.",
      price: 240,
      originalPrice: 280,
      category: "accessories",
      brand: "Fresh",
      volume: "300 мл",
      rating: 4.2,
      inStock: true,
      image: "🌱",
      features: ["Натуральный состав", "Длительное действие", "Приятный аромат", "Без спирта"]
    }
  ];

  const categories = [
    { value: 'all', label: 'Все товары' },
    { value: 'chemicals', label: 'Химические средства' },
    { value: 'tools', label: 'Инструменты' },
    { value: 'accessories', label: 'Аксессуары' }
  ];

  const filteredProducts = products
    .filter(product => 
      (categoryFilter === 'all' || product.category === categoryFilter) &&
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      if (priceSort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const getCartCount = (productId: number) => {
    return cart.filter(id => id === productId).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Каталог товаров</h1>
          <p className="text-xl text-muted-foreground">
            Профессиональные средства и инструменты для уборки
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Фильтры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Поиск</label>
                  <Input
                    placeholder="Найти товар..."
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
                
                {cart.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Корзина</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Товаров: {cart.length}
                      </span>
                      <Button variant="outline" size="sm">
                        <Icon name="ShoppingCart" size={14} className="mr-1" />
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
                Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-3">{product.image}</div>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                        {product.inStock ? 'В наличии' : 'Нет в наличии'}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icon name="Star" size={14} className="text-yellow-400 fill-current mr-1" />
                        {product.rating}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight mb-2">{product.title}</CardTitle>
                    <div className="text-sm text-muted-foreground mb-2">
                      {product.brand} • {product.volume}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      {product.description}
                    </CardDescription>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold">{product.price} ₽</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice} ₽
                            </span>
                          )}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-xs text-green-600">
                            Скидка {Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getCartCount(product.id) > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {getCartCount(product.id)}
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          onClick={() => addToCart(product.id)}
                          disabled={!product.inStock}
                        >
                          <Icon name="ShoppingCart" size={14} className="mr-1" />
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
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

export default ProductsPage;