import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/store/useStore";
import { useAdmin } from "@/components/AdminMode";
import Icon from '@/components/ui/icon';

const CalculatorAdmin = () => {
  const { calculatorFields, updateCalculatorFields, addToCart } = useStore();
  const { isAdminMode } = useAdmin();
  const [calcValues, setCalcValues] = useState<Record<string, any>>({});
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  const calculatePrice = () => {
    let total = 0;
    let basePrice = 0;
    
    calculatorFields.forEach(field => {
      const value = calcValues[field.id];
      
      if (field.type === 'number' && value) {
        const numValue = parseFloat(value);
        if (field.label.toLowerCase().includes('площадь') || field.label.toLowerCase().includes('м²')) {
          basePrice = numValue * field.multiplier;
          total = basePrice;
        } else {
          total += numValue * field.multiplier;
        }
      } else if (field.type === 'select' && value) {
        if (field.label.toLowerCase().includes('тип')) {
          // Для типа услуги умножаем базовую цену
          total = basePrice * field.multiplier;
        } else {
          total += field.multiplier;
        }
      } else if (field.type === 'checkbox' && Array.isArray(value) && value.length > 0) {
        value.forEach(option => {
          const percentageMatch = option.match(/\+(\d+)%/);
          const fixedMatch = option.match(/\+(\d+)₽/);
          
          if (percentageMatch) {
            const percentage = parseFloat(percentageMatch[1]);
            total *= (1 + percentage / 100);
          } else if (fixedMatch) {
            const amount = parseFloat(fixedMatch[1]);
            total += amount;
          }
        });
      }
    });
    
    setCalculatedPrice(Math.round(Math.max(total, 0)));
  };

  const handleAddField = () => {
    const newField = {
      id: Date.now().toString(),
      label: 'Новое поле',
      type: 'select' as const,
      options: ['Опция 1', 'Опция 2'],
      multiplier: 1
    };
    updateCalculatorFields([...calculatorFields, newField]);
  };

  const handleUpdateField = (id: string, updates: any) => {
    const updated = calculatorFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    );
    updateCalculatorFields(updated);
  };

  const handleDeleteField = (id: string) => {
    const filtered = calculatorFields.filter(field => field.id !== id);
    updateCalculatorFields(filtered);
  };

  const handleOrderService = () => {
    if (calculatedPrice > 0) {
      addToCart({
        id: 'calc-service',
        type: 'service',
        name: 'Услуга по калькулятору',
        price: calculatedPrice,
        quantity: 1
      });
      setIsOrderOpen(false);
      alert('Услуга добавлена в корзину!');
    }
  };

  return (
    <section id="calculator" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-4xl font-bold text-foreground">Калькулятор стоимости</h2>
              {isAdminMode && (
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Icon name="Settings" size={16} className="mr-1" />
                      Настроить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Настройка калькулятора</DialogTitle>
                    </DialogHeader>
                    <CalculatorFieldsEditor 
                      fields={calculatorFields}
                      onUpdate={handleUpdateField}
                      onDelete={handleDeleteField}
                      onAdd={handleAddField}
                    />
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <p className="text-xl text-muted-foreground">
              Рассчитайте примерную стоимость уборки
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Параметры уборки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {calculatorFields.map(field => (
                <div key={field.id}>
                  <Label htmlFor={field.id}>{field.label}</Label>
                  {field.type === 'select' && (
                    <Select 
                      value={calcValues[field.id] || ''} 
                      onValueChange={(value) => setCalcValues({...calcValues, [field.id]: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите опцию" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {field.type === 'number' && (
                    <Input 
                      id={field.id}
                      type="number" 
                      value={calcValues[field.id] || ''}
                      onChange={(e) => setCalcValues({...calcValues, [field.id]: e.target.value})}
                      placeholder="Введите значение"
                    />
                  )}
                  
                  {field.type === 'checkbox' && (
                    <div className="space-y-2">
                      {field.options?.map(option => (
                        <label key={option} className="flex items-center space-x-2">
                          <input 
                            type="checkbox"
                            checked={(calcValues[field.id] || []).includes(option)}
                            onChange={(e) => {
                              const current = calcValues[field.id] || [];
                              const updated = e.target.checked 
                                ? [...current, option]
                                : current.filter((o: string) => o !== option);
                              setCalcValues({...calcValues, [field.id]: updated});
                            }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <Button onClick={calculatePrice} className="w-full" size="lg">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
              
              {calculatedPrice > 0 && (
                <div className="text-center p-6 bg-primary/10 rounded-lg">
                  <p className="text-lg text-foreground">Примерная стоимость:</p>
                  <p className="text-3xl font-bold text-primary">{calculatedPrice.toLocaleString()} ₽</p>
                  
                  <Dialog open={isOrderOpen} onOpenChange={setIsOrderOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-4">Оформить заказ</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Оформление заказа услуги</DialogTitle>
                      </DialogHeader>
                      <ServiceOrderForm 
                        price={calculatedPrice}
                        onOrder={handleOrderService}
                        onClose={() => setIsOrderOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const CalculatorFieldsEditor = ({ fields, onUpdate, onDelete, onAdd }: any) => {
  const [editingField, setEditingField] = useState<any>(null);

  return (
    <div className="space-y-4">
      {fields.map((field: any) => (
        <Card key={field.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{field.label}</span>
              <div className="space-x-2">
                <Button size="sm" variant="outline" onClick={() => setEditingField(field)}>
                  <Icon name="Edit" size={12} />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onDelete(field.id)}>
                  <Icon name="Trash2" size={12} />
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Тип: {field.type} | Множитель: {field.multiplier}
            </div>
            {field.options && (
              <div className="text-sm text-muted-foreground">
                Опции: {field.options.join(', ')}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      
      <Button onClick={onAdd} className="w-full">
        <Icon name="Plus" size={16} className="mr-2" />
        Добавить поле
      </Button>
      
      {editingField && (
        <Dialog open={!!editingField} onOpenChange={() => setEditingField(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование поля</DialogTitle>
            </DialogHeader>
            <FieldEditor 
              field={editingField}
              onSave={(updated) => {
                onUpdate(editingField.id, updated);
                setEditingField(null);
              }}
              onCancel={() => setEditingField(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const FieldEditor = ({ field, onSave, onCancel }: any) => {
  const [formData, setFormData] = useState(field);

  return (
    <div className="space-y-4">
      <div>
        <Label>Название поля</Label>
        <Input 
          value={formData.label}
          onChange={(e) => setFormData({...formData, label: e.target.value})}
        />
      </div>
      
      <div>
        <Label>Тип поля</Label>
        <Select value={formData.type} onValueChange={(type) => setFormData({...formData, type})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="select">Выпадающий список</SelectItem>
            <SelectItem value="number">Число</SelectItem>
            <SelectItem value="checkbox">Чекбоксы</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Множитель для расчета</Label>
        <Input 
          type="number"
          value={formData.multiplier}
          onChange={(e) => setFormData({...formData, multiplier: parseFloat(e.target.value) || 1})}
        />
      </div>
      
      {(formData.type === 'select' || formData.type === 'checkbox') && (
        <div>
          <Label>Опции (каждая с новой строки)</Label>
          <textarea 
            className="w-full p-2 border rounded"
            rows={4}
            value={(formData.options || []).join('\n')}
            onChange={(e) => setFormData({...formData, options: e.target.value.split('\n').filter(Boolean)})}
          />
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button onClick={() => onSave(formData)} className="flex-1">Сохранить</Button>
        <Button variant="outline" onClick={onCancel} className="flex-1">Отмена</Button>
      </div>
    </div>
  );
};

const ServiceOrderForm = ({ price, onOrder, onClose }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    comment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrder();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Имя *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Телефон *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="address">Адрес *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Дата *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Время</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({...formData, time: e.target.value})}
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="comment">Комментарий</Label>
        <Input
          id="comment"
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
        />
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Стоимость:</span>
          <span className="font-bold text-primary">{price.toLocaleString()} ₽</span>
        </div>
        
        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Отмена
          </Button>
          <Button type="submit" className="flex-1">
            Заказать услугу
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CalculatorAdmin;