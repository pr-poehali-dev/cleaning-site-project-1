import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

const ShopAndRental = () => {
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

  return (
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
  );
};

export default ShopAndRental;