import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartItem = {
  id: string;
  productId: string;
  name: string;
  name_zh?: string;

  image: string;
  quantity: number;
};

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const existingItem = get().items.find(
          (item) => item.productId === product.id,
        );

        if (existingItem) {
          get().updateQuantity(
            existingItem.id,
            existingItem.quantity + quantity,
          );
          return;
        }

        set((state) => ({
          items: [
            ...state.items,
            {
              id: crypto.randomUUID(),
              productId: product.id,
              name: product.name,
              name_zh: product.name_zh,
          
              image: product.image,
              quantity,
            },
          ],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // Unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // version: 1, // Optional version number for migrations
      // migrate: (persistedState, version) => { ... } // For future migrations
    },
  ),
);
