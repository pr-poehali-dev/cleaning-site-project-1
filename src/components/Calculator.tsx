import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from '@/components/ui/icon';

const Calculator = () => {
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

  return (
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
  );
};

export default Calculator;