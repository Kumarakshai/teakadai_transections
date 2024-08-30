"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModalStore } from "@/store/modalStore";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllProducts } from "@/server-action/page";
import { ShopData } from "@/types";

const ProductList = () => {
  const { isOpen, setOpen } = useModalStore();
  const { selectedItems, addItem, removeItem, calculateTotal } = useCartStore();
  const [productData, serProductData] = useState<ShopData[]>([]);

  const getAllProductsData = async () => {
    try {
      const data = await getAllProducts();
      serProductData(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProductsData();
  }, []);

  const uniqueproductData = Array.from(
    new Map(productData.map((item) => [item.item.name, item])).values()
  );

  interface ItemTypes {
    product: ShopData;
    quantity: number;
  }

  const Payment = async (status: string) => {
    const OrderedItmes = {
      user_id: "null",
      products: selectedItems.map((info: ItemTypes) => ({
        id: info.product.id,
        quantity: info.quantity,
      })),
      status: status,
    };
    console.log("Orders", OrderedItmes);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col h-[90vh] max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold">Products</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {uniqueproductData.map((item: ShopData) => (
              <Card
                key={item.id}
                className="overflow-hidden shadow-lg rounded-lg"
              >
                <CardHeader className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 ">
                  <CardTitle className="text-lg text-white">
                    <div className="flex flex-row gap-3">
                      <img
                        src={item.item.image}
                        alt={`${item.item.category} Image`}
                        className="object-cover w-16 h-16 rounded-lg border-2 border-white shadow-md"
                      />
                      <div className="text-black text-sm">
                        {item?.item?.name ?? "N/A"}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      $ {item.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <Minus size={16} />
                      </Button>
                      <Input
                        type="text"
                        className="w-12 text-center border-gray-300 rounded-md"
                        value={
                          selectedItems.find(
                            (selectedItem) =>
                              selectedItem.product.id === item.id
                          )?.quantity || 0
                        }
                        readOnly
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addItem(item)}
                        className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <DialogFooter className="mt-auto p-6 border-t">
          <div className="w-full flex justify-between items-center">
            <div className="text-lg font-semibold flex items-center">
              <ShoppingCart className="mr-2" />
              Total: ${calculateTotal().toFixed(2)}
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button
                disabled={selectedItems.length < 1}
                onClick={() => Payment("Account")}
                className="bg-gradient-to-r from-slate-200 to-slate-200 text-black py-2 px-4 rounded-lg shadow-lg hover:from-slate-300 hover:to-slate-300 transition-all duration-300"
              >
                Account
              </Button>
              <Button
                disabled={selectedItems.length < 1}
                onClick={() => Payment("Paid")}
              >
                Pay
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductList;
