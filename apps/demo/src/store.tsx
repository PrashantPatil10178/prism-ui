import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

/* ─── Product Data ─── */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  colors?: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Cotton Tee",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "clothing",
    rating: 4.8,
    reviews: 124,
    description:
      "Premium cotton crew-neck t-shirt with a relaxed fit. Perfect for everyday wear.",
    colors: ["#09090b", "#fafafa", "#1d4ed8", "#dc2626"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Wireless Headphones Pro",
    price: 199.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop",
    category: "electronics",
    badge: "Sale",
    rating: 4.9,
    reviews: 312,
    description:
      "Active noise cancellation with 40hr battery. Hi-Res audio certified.",
    colors: ["#09090b", "#fafafa", "#713f12"],
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop",
    category: "accessories",
    rating: 4.7,
    reviews: 86,
    description:
      "Handcrafted full-grain leather with adjustable strap. Fits all essentials.",
    colors: ["#713f12", "#09090b", "#dc2626"],
  },
  {
    id: 4,
    name: "Running Shoes Air",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
    category: "footwear",
    badge: "New",
    rating: 4.6,
    reviews: 203,
    description:
      "Lightweight mesh upper with responsive cushioning. Built for speed.",
    colors: ["#dc2626", "#09090b", "#1d4ed8"],
    sizes: ["7", "8", "9", "10", "11", "12"],
  },
  {
    id: 5,
    name: "Minimalist Watch",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
    category: "accessories",
    rating: 4.9,
    reviews: 178,
    description:
      "Japanese quartz movement with sapphire crystal glass. 5ATM water resistant.",
    colors: ["#09090b", "#713f12", "#fafafa"],
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 79.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=500&fit=crop",
    category: "clothing",
    badge: "Sale",
    rating: 4.5,
    reviews: 92,
    description:
      "Classic trucker jacket in medium-wash denim. Timeless everyday layer.",
    colors: ["#1d4ed8", "#09090b"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Smart Speaker",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=500&fit=crop",
    category: "electronics",
    rating: 4.4,
    reviews: 256,
    description:
      "Voice-controlled speaker with rich 360° sound. Works with all smart assistants.",
    colors: ["#09090b", "#fafafa", "#1d4ed8"],
  },
  {
    id: 8,
    name: "Canvas Sneakers",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=500&fit=crop",
    category: "footwear",
    rating: 4.7,
    reviews: 143,
    description: "Classic low-top canvas sneakers with vulcanized rubber sole.",
    colors: ["#fafafa", "#09090b", "#dc2626"],
    sizes: ["7", "8", "9", "10", "11"],
  },
];

export const categories = [
  "all",
  "clothing",
  "electronics",
  "accessories",
  "footwear",
];

/* ─── Cart Store ─── */
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback(
    (product: Product, color?: string, size?: string) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === product.id);
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          );
        }
        return [
          ...prev,
          {
            id: product.id,
            product,
            quantity: 1,
            color,
            size,
            selectedColor: color,
            selectedSize: size,
          },
        ];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/* ─── Theme Store ─── */
export type ThemeColor = "zinc" | "rose" | "blue" | "green" | "orange";
export type ThemeMode = "dark" | "light";

interface ThemeContextValue {
  color: ThemeColor;
  mode: ThemeMode;
  setColor: (c: ThemeColor) => void;
  setMode: (m: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<ThemeColor>("zinc");
  const [mode, setMode] = useState<ThemeMode>("dark");

  const toggleMode = useCallback(
    () => setMode((m) => (m === "dark" ? "light" : "dark")),
    [],
  );

  return (
    <ThemeContext.Provider
      value={{ color, mode, setColor, setMode, toggleMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
