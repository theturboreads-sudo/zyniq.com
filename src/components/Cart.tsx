import { useState, useEffect } from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem("zyniq-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    localStorage.setItem("zyniq-cart", JSON.stringify(items));
  }, [items]);

  // Listen for add-to-cart events
  useEffect(() => {
    const handleAddToCart = (e: CustomEvent<CartItem>) => {
      const newItem = e.detail;
      setItems((prev) => {
        const existing = prev.find((item) => item.id === newItem.id);
        if (existing) {
          return prev.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...newItem, quantity: 1 }];
      });
      setIsOpen(true);
    };

    window.addEventListener("add-to-cart" as any, handleAddToCart as any);
    return () => window.removeEventListener("add-to-cart" as any, handleAddToCart as any);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-white/10 bg-white/5 hover:bg-white/10">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-neon-green text-black font-bold">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-zinc-950 border-white/10 text-white flex flex-col">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl font-heading text-white flex items-center gap-2">
            Your Study Fuel <Badge variant="outline" className="border-neon-green text-neon-green">Cart</Badge>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {items.length === 0 ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                <ShoppingCart className="h-10 w-10 text-zinc-600" />
              </div>
              <div>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm text-zinc-500">Don't let the jitters win. Fuel up.</p>
              </div>
              <Button 
                variant="outline" 
                className="border-neon-green text-neon-green hover:bg-neon-green hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex gap-4"
                  >
                    <div className="h-24 w-24 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-heading font-medium text-lg">{item.name}</h4>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-zinc-500 hover:text-red-500 hover:bg-red-500/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {item.variant && <p className="text-xs text-zinc-500 uppercase tracking-wider">{item.variant}</p>}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border border-white/10 rounded-lg bg-black/20">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-white/5"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-white/5"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-heading font-bold text-neon-green">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="pt-6 space-y-4">
            <Separator className="bg-white/10" />
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Shipping</span>
                <span className="text-neon-green">FREE</span>
              </div>
              <div className="flex justify-between text-xl font-heading font-bold pt-2">
                <span>Total</span>
                <span className="text-neon-green">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full h-14 text-lg font-heading bg-neon-green text-black hover:bg-neon-green/90 neon-glow">
              Checkout Now
            </Button>
            <p className="text-[10px] text-center text-zinc-500 uppercase tracking-widest">
              Secure Checkout Powered by Zyniq Pay
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const event = new CustomEvent("add-to-cart", { detail: item });
  window.dispatchEvent(event);
}
