import { create } from "zustand";
import { ShopData } from "@/types";
interface cartProduct {
  product: ShopData;
  quantity: number;
}
interface CartState {
  selectedItems: cartProduct[];
  addItem: (item: ShopData) => void;
  removeItem: (itemId: string) => void;
  calculateTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  selectedItems: [],
  addItem: (item: ShopData) => {
    const { selectedItems } = get();
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.product.id === item.id
    );

    if (existingItem) {
      set({
        selectedItems: selectedItems.map((selectedItem) =>
          selectedItem.product.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        ),
      });
    } else {
      set({
        selectedItems: [...selectedItems, { product: item, quantity: 1 }],
      });
    }
  },
  removeItem: (itemId) => {
    const { selectedItems } = get();
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.product.id === itemId
    );

    if (existingItem && existingItem.quantity === 1) {
      set({
        selectedItems: selectedItems.filter(
          (selectedItem) => selectedItem.product.id !== itemId
        ),
      });
    } else if (existingItem) {
      set({
        selectedItems: selectedItems.map((selectedItem) =>
          selectedItem.product.id === itemId
            ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
            : selectedItem
        ),
      });
    }
  },
  calculateTotal: () => {
    const { selectedItems } = get();
    return selectedItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));
