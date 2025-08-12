import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from '@/components/ui/icon';

const Reviews = () => {
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
  );
};

export default Reviews;