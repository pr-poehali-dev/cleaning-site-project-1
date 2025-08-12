import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore } from "@/store/useStore";
import Icon from '@/components/ui/icon';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Корзина пуста</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Icon name="ShoppingCart" size={20} className="mr-2" />
            Корзина ({cart.length})
          </span>
          <Button variant="ghost" size="sm" onClick={clearCart}>
            <Icon name="X" size={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.type}`} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">{
                  item.type === 'product' ? 'Товар' : 
                  item.type === 'service' ? 'Услуга' : 'Аренда'
                }</Badge>
                {item.selectedDate && (
                  <Badge variant="outline">
                    {item.selectedDate}
                    {item.duration && ` (${item.duration} дн.)`}
                  </Badge>
                )}
              </div>
              <div className="text-primary font-medium mt-1">
                {item.price.toLocaleString()} ₽
                {item.type === 'rental' && '/день'}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(`${item.id}-${item.type}`, item.quantity - 1)}
              >
                <Icon name="Minus" size={12} />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleQuantityChange(`${item.id}-${item.type}`, item.quantity + 1)}
              >
                <Icon name="Plus" size={12} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => removeFromCart(`${item.id}-${item.type}`)}
              >
                <Icon name="Trash2" size={12} />
              </Button>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Итого:</span>
            <span className="text-lg font-bold text-primary">{total.toLocaleString()} ₽</span>
          </div>
          
          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Оформить заказ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Оформление заказа</DialogTitle>
              </DialogHeader>
              <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const CheckoutForm = ({ onClose }: { onClose: () => void }) => {
  const { cart, clearCart } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка заказа
    alert('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
    clearCart();
    onClose();
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>
      
      <div>
        <Label htmlFor="address">Адрес доставки/выполнения</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
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
          <span className="font-bold">Итого к оплате:</span>
          <span className="font-bold text-primary">{total.toLocaleString()} ₽</span>
        </div>
        
        <div className="flex space-x-2">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Отмена
          </Button>
          <Button type="submit" className="flex-1">
            Заказать
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Cart;