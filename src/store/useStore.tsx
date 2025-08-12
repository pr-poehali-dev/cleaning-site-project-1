import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  features: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  image?: string;
}

interface RentalItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  available: boolean;
  image?: string;
}

interface CartItem {
  id: string;
  type: 'product' | 'service' | 'rental';
  name: string;
  price: number;
  quantity: number;
  selectedDate?: string;
  duration?: number;
}

interface CalculatorField {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'number';
  options?: string[];
  multiplier: number;
}

interface StoreState {
  // Data
  services: Service[];
  products: Product[];
  rentalItems: RentalItem[];
  calculatorFields: CalculatorField[];
  
  // Cart
  cart: CartItem[];
  
  // Actions
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addRentalItem: (item: RentalItem) => void;
  updateRentalItem: (id: string, item: Partial<RentalItem>) => void;
  deleteRentalItem: (id: string) => void;
  
  updateCalculatorFields: (fields: CalculatorField[]) => void;
  
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Генеральная уборка квартиры',
    description: 'Комплексная уборка всех помещений с использованием профессиональных средств',
    price: 3500,
    category: 'Квартиры',
    rating: 4.9,
    reviews: 156,
    features: ['Мытье полов', 'Уборка санузлов', 'Протирка мебели', 'Мытье окон']
  },
  {
    id: '2',
    name: 'Поддерживающая уборка',
    description: 'Регулярная уборка для поддержания чистоты в доме',
    price: 2000,
    category: 'Квартиры',
    rating: 4.8,
    reviews: 203,
    features: ['Пылесос', 'Влажная уборка', 'Протирка поверхностей']
  },
  {
    id: '3',
    name: 'Мытье окон',
    description: 'Профессиональное мытье окон с внутренней и внешней стороны',
    price: 150,
    category: 'Дополнительные',
    rating: 4.7,
    reviews: 89,
    features: ['Внутреннее мытье', 'Наружное мытье', 'Чистка рам']
  }
];

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Средство для мытья окон Glass Clean Pro',
    description: 'Профессиональное средство для идеальной чистоты стекол',
    price: 450,
    category: 'Средства для окон',
    brand: 'CleanPro',
    rating: 4.8,
    reviews: 45,
    inStock: true
  },
  {
    id: '2',
    name: 'Универсальный пылесос PowerClean 3000',
    description: 'Мощный пылесос для профессиональной уборки',
    price: 12500,
    category: 'Техника',
    brand: 'PowerClean',
    rating: 4.9,
    reviews: 23,
    inStock: true
  },
  {
    id: '3',
    name: 'Дезинфицирующее средство SafeClean',
    description: 'Эффективное средство для дезинфекции поверхностей',
    price: 320,
    category: 'Дезинфекция',
    brand: 'SafeClean',
    rating: 4.7,
    reviews: 67,
    inStock: true
  }
];

const initialRentalItems: RentalItem[] = [
  {
    id: '1',
    name: 'Моющий пылесос Karcher Puzzi 8/1',
    description: 'Профессиональный моющий пылесос для глубокой чистки ковров',
    pricePerDay: 800,
    category: 'Пылесосы',
    brand: 'Karcher',
    rating: 4.9,
    reviews: 34,
    available: true
  },
  {
    id: '2',
    name: 'Поломоечная машина Comac Innova 55B',
    description: 'Автоматическая поломоечная машина для больших площадей',
    pricePerDay: 1200,
    category: 'Поломоечные машины',
    brand: 'Comac',
    rating: 4.8,
    reviews: 18,
    available: true
  },
  {
    id: '3',
    name: 'Генератор пара Dupray ONE™',
    description: 'Профессиональный парогенератор для дезинфекции',
    pricePerDay: 600,
    category: 'Парогенераторы',
    brand: 'Dupray',
    rating: 4.7,
    reviews: 25,
    available: true
  }
];

const initialCalculatorFields: CalculatorField[] = [
  {
    id: '1',
    label: 'Тип помещения',
    type: 'select',
    options: ['Квартира', 'Дом', 'Офис', 'Магазин'],
    multiplier: 1
  },
  {
    id: '2',
    label: 'Площадь (м²)',
    type: 'number',
    multiplier: 50
  },
  {
    id: '3',
    label: 'Дополнительные услуги',
    type: 'checkbox',
    options: ['Мытье окон (+15%)', 'Химчистка мебели (+25%)', 'Уборка балкона (+10%)'],
    multiplier: 1
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      services: initialServices,
      products: initialProducts,
      rentalItems: initialRentalItems,
      calculatorFields: initialCalculatorFields,
      cart: [],
      
      addService: (service) => 
        set((state) => ({ services: [...state.services, service] })),
      
      updateService: (id, updates) => 
        set((state) => ({
          services: state.services.map(s => s.id === id ? { ...s, ...updates } : s)
        })),
      
      deleteService: (id) => 
        set((state) => ({ services: state.services.filter(s => s.id !== id) })),
      
      addProduct: (product) => 
        set((state) => ({ products: [...state.products, product] })),
      
      updateProduct: (id, updates) => 
        set((state) => ({
          products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
        })),
      
      deleteProduct: (id) => 
        set((state) => ({ products: state.products.filter(p => p.id !== id) })),
      
      addRentalItem: (item) => 
        set((state) => ({ rentalItems: [...state.rentalItems, item] })),
      
      updateRentalItem: (id, updates) => 
        set((state) => ({
          rentalItems: state.rentalItems.map(r => r.id === id ? { ...r, ...updates } : r)
        })),
      
      deleteRentalItem: (id) => 
        set((state) => ({ rentalItems: state.rentalItems.filter(r => r.id !== id) })),
      
      updateCalculatorFields: (fields) => 
        set({ calculatorFields: fields }),
      
      addToCart: (item) => {
        const cart = get().cart;
        const existingItem = cart.find(c => c.id === item.id && c.type === item.type);
        
        if (existingItem) {
          set((state) => ({
            cart: state.cart.map(c => 
              c.id === item.id && c.type === item.type 
                ? { ...c, quantity: c.quantity + item.quantity }
                : c
            )
          }));
        } else {
          set((state) => ({ cart: [...state.cart, item] }));
        }
      },
      
      removeFromCart: (id) => 
        set((state) => ({ cart: state.cart.filter(c => c.id !== id) })),
      
      updateCartQuantity: (id, quantity) => 
        set((state) => ({
          cart: state.cart.map(c => c.id === id ? { ...c, quantity } : c)
        })),
      
      clearCart: () => set({ cart: [] })
    }),
    {
      name: 'cleaning-store'
    }
  )
);