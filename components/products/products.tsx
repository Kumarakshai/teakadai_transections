"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Package,
  DollarSign,
  List,
  Grid,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { getAllProducts } from "@/server-action/page";
import { ShopData } from "@/types";

export const Products = () => {
  const [products, setProducts] = useState<ShopData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getAllProductsData = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data.data);
      setFilteredProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    getAllProductsData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const createdAt = new Date(product.createdAt);
      const today = new Date();
      let dateMatch = true;

      switch (dateFilter) {
        case "TODAY":
          dateMatch = createdAt.toDateString() === today.toDateString();
          break;
        case "THIS_WEEK":
          const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          dateMatch = createdAt >= startOfWeek;
          break;
        case "THIS_MONTH":
          dateMatch =
            createdAt.getMonth() === today.getMonth() &&
            createdAt.getFullYear() === today.getFullYear();
          break;
      }

      return dateMatch;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, dateFilter, products]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setDateFilter("");
  };

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={dateFilter === "" ? "default" : "outline"}
              onClick={() => setDateFilter("")}
            >
              All Time
            </Button>
            <Button
              variant={dateFilter === "TODAY" ? "default" : "outline"}
              onClick={() => setDateFilter("TODAY")}
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              Today
            </Button>
            <Button
              variant={dateFilter === "THIS_WEEK" ? "default" : "outline"}
              onClick={() => setDateFilter("THIS_WEEK")}
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              This Week
            </Button>
            <Button
              variant={dateFilter === "THIS_MONTH" ? "default" : "outline"}
              onClick={() => setDateFilter("THIS_MONTH")}
              className="flex items-center gap-2"
            >
              <Calendar size={16} />
              This Month
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          >
            {viewMode === "card" ? <List size={20} /> : <Grid size={20} />}
          </Button>
          {(searchTerm || categoryFilter || dateFilter) && (
            <Button variant="destructive" size="icon" onClick={resetFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 bg-white p-4 rounded-lg shadow">
          No products found.
        </p>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <Card
              key={product.id}
              className="mb-4 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="bg-gray-50 border-b rounded-tr-lg rounded-tl-lg">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Package className="mr-2" size={20} />
                  {product.item.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="mr-2" size={20} />
                      <span className="font-medium">{product.price}</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="mr-2" size={20} />
                      <span className="font-medium">
                        Qty: {product.quantity}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      Category: {product.item.category}
                    </p>
                    <p className="text-sm text-gray-500">ID: {product.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>{product.item.name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {product.id}
                    </div>
                  </TableCell>
                  <TableCell>{product.item.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow">
        <div className="text-sm text-gray-500">
          Showing{" "}
          {Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            filteredProducts.length
          )}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
