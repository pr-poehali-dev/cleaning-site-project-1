import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [stats] = useState({
    totalVisitors: 1248,
    newRequests: 23,
    conversion: 3.4,
    revenue: 89500
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Панель администратора</h1>
          <p className="text-muted-foreground">Управление сайтом ХочуКлининг</p>
        </div>

        {/* Статистика */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Посетители</p>
                  <p className="text-2xl font-bold">{stats.totalVisitors}</p>
                </div>
                <Icon name="Users" size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Заявки</p>
                  <p className="text-2xl font-bold">{stats.newRequests}</p>
                </div>
                <Icon name="MessageSquare" size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Конверсия</p>
                  <p className="text-2xl font-bold">{stats.conversion}%</p>
                </div>
                <Icon name="TrendingUp" size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Выручка</p>
                  <p className="text-2xl font-bold">{stats.revenue.toLocaleString()} ₽</p>
                </div>
                <Icon name="DollarSign" size={24} className="text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="marketing">Продвижение</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          {/* Управление контентом */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="FileText" size={20} className="mr-2" />
                    Страницы сайта
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Главная страница</span>
                    <Button size="sm" variant="outline">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Редактировать
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Услуги</span>
                    <Button size="sm" variant="outline">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Редактировать
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Товары</span>
                    <Button size="sm" variant="outline">
                      <Icon name="Edit" size={14} className="mr-1" />
                      Редактировать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Image" size={20} className="mr-2" />
                    Медиа файлы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить изображения
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Icon name="FolderOpen" size={16} className="mr-2" />
                    Управление галереей
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO инструменты */}
          <TabsContent value="seo" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Search" size={20} className="mr-2" />
                    Позиции в поиске
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>"клининг севастополь"</span>
                    <Badge variant="secondary">5 позиция</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>"уборка квартир"</span>
                    <Badge variant="secondary">12 позиция</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>"химчистка мебели"</span>
                    <Badge variant="secondary">3 позиция</Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Обновить данные
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Target" size={20} className="mr-2" />
                    Ключевые слова
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium">Основные запросы:</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      клининг, уборка, химчистка, мойка окон
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-sm font-medium">Географические:</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Севастополь, Крым, Балаклава
                    </div>
                  </div>
                  <Button size="sm" className="w-full">
                    <Icon name="Plus" size={14} className="mr-1" />
                    Добавить ключевые слова
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Аналитика */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="BarChart" size={20} className="mr-2" />
                    Источники трафика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Яндекс поиск</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Google поиск</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Прямые переходы</span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Социальные сети</span>
                    <span className="font-medium">8%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Clock" size={20} className="mr-2" />
                    Активность по часам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    Пик активности: 18:00-21:00
                  </div>
                  <Button className="w-full mt-4">
                    <Icon name="LineChart" size={16} className="mr-2" />
                    Подробная аналитика
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Продвижение */}
          <TabsContent value="marketing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Megaphone" size={20} className="mr-2" />
                    Рекламные кампании
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Яндекс.Директ</span>
                      <Badge variant="default">Активна</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Бюджет: 15,000 ₽/месяц
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Google Ads</span>
                      <Badge variant="secondary">На паузе</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Бюджет: 10,000 ₽/месяц
                    </div>
                  </div>
                  <Button className="w-full">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Создать кампанию
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Share2" size={20} className="mr-2" />
                    Социальные сети
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>ВКонтакте</span>
                    <Button size="sm" variant="outline">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Telegram</span>
                    <Button size="sm" variant="outline">Настроить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Instagram*</span>
                    <Button size="sm" variant="outline">Настроить</Button>
                  </div>
                  <Button className="w-full">
                    <Icon name="Calendar" size={16} className="mr-2" />
                    Планировщик постов
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Settings" size={20} className="mr-2" />
                    Основные настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Название компании</div>
                    <div className="text-sm text-muted-foreground">ХочуКлининг</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Телефон</div>
                    <div className="text-sm text-muted-foreground">+7 (978) 290-92-92</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="font-medium">Адрес</div>
                    <div className="text-sm text-muted-foreground">г. Севастополь, ул. Правды 10/8, оф. 5</div>
                  </div>
                  <Button className="w-full">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Shield" size={20} className="mr-2" />
                    Безопасность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Key" size={16} className="mr-2" />
                    Сменить пароль
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Download" size={16} className="mr-2" />
                    Создать бэкап
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="FileText" size={16} className="mr-2" />
                    Логи системы
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;