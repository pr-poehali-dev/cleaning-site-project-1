import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

const Services = () => {
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

  return (
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
  );
};

export default Services;