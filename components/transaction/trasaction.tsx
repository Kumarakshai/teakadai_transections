"use client";
import React, { useState, useEffect } from "react";
import { getAllTransaction } from "../../server-action/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Search,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Package,
  X,
  List,
  Grid,
} from "lucide-react";
import { TransactionsData } from "@/types";

export const Transactions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionsData[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"PAID" | "PENDING" | "">("");
  const [dateFilter, setDateFilter] = useState<
    "TODAY" | "THIS_WEEK" | "THIS_MONTH" | ""
  >("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  const getAllTransactionData = async () => {
    try {
      const data = await getAllTransaction();
      setTransactions(data.data);
      setFilteredTransactions(data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactionData();
  }, []);

  useEffect(() => {
    const filtered = transactions.filter((transaction: TransactionsData) => {
      //       const nameMatch =
      //         transaction?.user?.name
      //           ?.toLowerCase()
      //           .includes(searchTerm.toLowerCase()) ?? false;
      //       const phoneMatch =
      //         transaction?.user?.phone_no?.includes(searchTerm) ?? false;
      const statusMatch = statusFilter
        ? transaction?.status === statusFilter
        : true;

      const date = new Date(transaction?.createdAt ?? "");
      const today = new Date();
      let dateMatch = true;

      switch (dateFilter) {
        case "TODAY":
          dateMatch = date.toDateString() === today.toDateString();
          break;
        case "THIS_WEEK":
          const startOfWeek = new Date(
            today.setDate(today.getDate() - today.getDay())
          );
          dateMatch = date >= startOfWeek;
          break;
        case "THIS_MONTH":
          dateMatch =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth();
          break;
      }

      return statusMatch && dateMatch;
    });
    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, dateFilter, transactions]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDateFilter("");
  };

  //   if (isLoading) {
  //     return (
  //       <div className="flex justify-center items-center h-34">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  //       </div>
  //     );
  //   }

  const TransactionCard: React.FC<{ transaction: TransactionsData }> = ({
    transaction,
  }) => (
    <Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg font-semibold flex items-center">
          <CreditCard className="mr-2" size={20} />
          {transaction?.user?.name ?? "Guest"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 flex justify-between items-center">
            <div className="flex items-center">
              <CreditCard className="mr-2" size={20} />
              <span className="font-medium">
                ₹{transaction?.paidAmount ?? 0}
              </span>
            </div>
            <div className="flex items-center">
              <Package className="mr-2" size={20} />
              <span className="font-medium">
                {transaction?.products?.reduce(
                  (sum, p) => sum + (p.quantity ?? 0),
                  0
                ) ?? 0}{" "}
                items
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              ID: {transaction?.user?.id ?? "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Phone: {transaction?.user?.phone_no ?? "N/A"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {transaction?.createdAt
                ? new Date(transaction.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
            <p
              className={`text-sm font-semibold ${
                transaction?.status === "PAID"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {transaction?.status ?? "Unknown"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
        <div className="relative w-full sm:w-64">
          <Input
            type="text"
            placeholder="Search by name or phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant={statusFilter === "" ? "default" : "outline"}
              onClick={() => setStatusFilter("")}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "PAID" ? "default" : "outline"}
              onClick={() => setStatusFilter("PAID")}
              className="flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Paid
            </Button>
            <Button
              variant={statusFilter === "PENDING" ? "default" : "outline"}
              onClick={() => setStatusFilter("PENDING")}
              className="flex items-center gap-2"
            >
              <Clock size={16} />
              Pending
            </Button>
          </div>
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
          {(searchTerm || statusFilter || dateFilter) && (
            <Button variant="destructive" size="icon" onClick={resetFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-center text-gray-500 bg-white p-4 rounded-lg shadow">
          No transactions found.
        </p>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTransactions.map((transaction: TransactionsData) => (
            <TransactionCard
              key={transaction?.id ?? Math.random().toString()}
              transaction={transaction}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Paid Amount</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction: TransactionsData) => (
                <TableRow key={transaction?.id ?? Math.random().toString()}>
                  <TableCell>
                    <div>{transaction?.user?.name ?? "Guest"}</div>
                    <div className="text-sm text-gray-500">
                      {transaction?.user?.phone_no ?? "N/A"}
                    </div>
                  </TableCell>

                  <TableCell>
                    {transaction?.createdAt
                      ? new Date(transaction.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>₹{transaction?.totalPrice ?? 0}</TableCell>

                  <TableCell>₹{transaction?.paidAmount ?? 0}</TableCell>
                  <TableCell>
                    {transaction?.products?.reduce(
                      (sum, p) => sum + (p.quantity ?? 0),
                      0
                    ) ?? 0}{" "}
                    items
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaction?.status === "PAID"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction?.status ?? "Unknown"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
