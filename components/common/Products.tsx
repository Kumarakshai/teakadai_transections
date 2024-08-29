"use client";
import React from "react";
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
import { shopDataList } from "@/config/config";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ShopData } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProductList: React.FC = () => {
  const { isOpen, setOpen } = useModalStore();
  const { selectedItems, addItem, removeItem, calculateTotal } = useCartStore();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col h-[90vh] max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-2xl font-bold">Products</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shopDataList.map((item: any) => (
              //                <Card key={item.id} className="overflow-hidden">
              //           <CardHeader className="p-4">
              //             <CardTitle className="text-lg">
              //               <div className="flex flex-row gap-3">
              //                 <img
              //                   src={item.item.image}
              //                   alt={`${item.item.category} Image`}
              //                   className="object-cover w-16 h-16"
              //                 />
              //                 <div className="mt-5">{item.item.category}</div>
              //               </div>
              //             </CardTitle>
              //           </CardHeader>
              //           <CardContent className="p-4">
              //             <div className="flex justify-between items-center">
              //               <span className="text-lg font-semibold">
              //                 ${item.price.toFixed(2)}
              //               </span>
              //               <div className="flex items-center space-x-2">
              //                 <Button
              //                   variant="outline"
              //                   size="sm"
              //                   onClick={() => removeItem(item.id)}
              //                   disabled={
              //                     !selectedItems.find(
              //                       (selectedItem) =>
              //                         selectedItem.product.id === item.id
              //                     )
              //                   }
              //                 >
              //                   <Minus size={16} />
              //                 </Button>
              //                 <Input
              //                   type="text"
              //                   className="w-12 text-center"
              //                   value={
              //                     selectedItems.find(
              //                       (selectedItem) =>
              //                         selectedItem.product.id === item.id
              //                     )?.quantity || 0
              //                   }
              //                   readOnly
              //                 />
              //                 <Button
              //                   variant="outline"
              //                   size="sm"
              //                   onClick={() => addItem(item)}
              //                 >
              //                   <Plus size={16} />
              //                 </Button>
              //               </div>
              //             </div>
              //           </CardContent>
              //         </Card>
              <Card
                key={item.id}
                className="overflow-hidden shadow-lg rounded-lg"
              >
                <CardHeader className="p-4 bg-gradient-to-r from-slate-50 to-slate-200">
                  <CardTitle className="text-lg text-white">
                    <div className="flex flex-row gap-3">
                      <img
                        src={item.item.image}
                        alt={`${item.item.category} Image`}
                        className="object-cover w-16 h-16 rounded-full border-2 border-white shadow-md"
                      />
                      <div className="mt-5 text-black">
                        {item.item.category}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">
                      ${item.price.toFixed(2)}
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
                onClick={() => {
                  console.log(selectedItems);
                }}
              >
                Proceed to Billing
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductList;
